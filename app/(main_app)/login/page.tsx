"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useConvexAuth, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function Login() {
  const [step, setStep] = useState<
    "signIn" | { email: string } | "forgot" | "success"
  >("signIn");
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  const user = useQuery(api.user.getCurrentUser);

  useEffect(() => {
    if ((isLoading && !isAuthenticated) || !user) {
      return;
    }
    if (!isLoading && isAuthenticated && !user.username) {
      router.push("/login/onboarding");
      return;
    }
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
      return;
    }
  }, [user]);

  if (step === "signIn") {
    return (
      <LoginForm
        onSubmit={(email) => setStep({ email })}
        handlePasswordReset={() => setStep("forgot")}
        provider="password-code"
        success={() => setStep("success")}
      />
    );
  }

  if (step === "forgot") {
    return (
      <PasswordResetForm
        provider="password-code"
        handleCancel={() => setStep("signIn")}
      />
    );
  }

  return step === "success" ? (
    <div className="flex h-screen justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <VerifyForm email={step.email} />
  );
}

function LoginForm({
  onSubmit,
  handlePasswordReset,
  provider,
  success,
}: {
  onSubmit: (email: string) => void;
  handlePasswordReset: () => void;
  provider: string;
  success: () => void;
}) {
  const { signIn } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);
        // await signIn("resend-otp", value);
        console.log("value", value);

        await signIn(provider ?? "password", {
          email: value.email,
          password: value.password,
          flow: flow,
        });
        onSubmit(value.email);
        if (flow === "signIn") {
          success();
        }
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        console.error(error);
        alert("Invalid email or password."); // TODO: Show error message.
      }
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8">
        <h1 className="text-center text-2xl font-extrabold mb-8">HACKGLOBE</h1>

        <Card className="border rounded-lg shadow-sm">
          <CardContent className="p-6">
            {flow === "signUp" ? (
              <h2 className="text-xl font-semibold mb-6">Create Account</h2>
            ) : (
              <h2 className="text-xl font-semibold mb-6">Sign in</h2>
            )}

            <form
              className="flex w-full flex-col items-start gap-1"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div className="flex w-full flex-col gap-1.5">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <form.Field
                  name="email"
                  validators={{
                    onSubmit: z
                      .string()
                      .max(256)
                      .email("Email address is not valid."),
                  }}
                  children={(field) => (
                    <Input
                      placeholder="Email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`bg-transparent ${
                        field.state.meta?.errors.length > 0 &&
                        "border-destructive focus-visible:ring-destructive"
                      }`}
                      autoComplete="email"
                    />
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-1.5">
                <label htmlFor="email" className="sr-only">
                  Password
                </label>
                <form.Field
                  name="password"
                  validators={{
                    onSubmit: z
                      .string()
                      .min(8, "Password must be at least 8 characters."),
                  }}
                  children={(field) => (
                    <Input
                      placeholder="Password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`bg-transparent ${
                        field.state.meta?.errors.length > 0 &&
                        "border-destructive focus-visible:ring-destructive"
                      }`}
                      type="password"
                      autoComplete={
                        flow === "signIn" ? "current-password" : "new-password"
                      }
                      name="password"
                      id="password"
                    />
                  )}
                />
                {/* @ts-ignore */}
                {handlePasswordReset && flow === "signIn" ? (
                  <Button
                    className="p-0 text-sm text-primary/60 hover:text-primary"
                    type="button"
                    variant="link"
                    onClick={handlePasswordReset}
                  >
                    Forgot your password?
                  </Button>
                ) : null}
              </div>

              <div className="flex flex-col">
                {form.state.fieldMeta.email?.errors.length > 0 && (
                  <span className="mb-2 text-sm text-destructive dark:text-destructive-foreground">
                    {form.state.fieldMeta.email?.errors.join(" ")}
                  </span>
                )}
                {/*
          {!authEmail && authError && (
            <span className="mb-2 text-sm text-destructive dark:text-destructive-foreground">
              {authError.message}
            </span>
          )}
          */}
              </div>

              <Button type="submit" className="w-full">
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : flow === "signIn" ? (
                  "Sign in"
                ) : (
                  "Sign up"
                )}
              </Button>
              <Button
                variant="link"
                type="button"
                onClick={() => {
                  setFlow(flow === "signIn" ? "signUp" : "signIn");
                }}
                className="w-full"
              >
                {flow === "signIn"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Button>
            </form>

            {/* <div className="relative flex w-full items-center justify-center">
        <span className="absolute w-full border-b border-border" />
        <span className="z-10 bg-card px-2 text-xs font-medium uppercase text-primary/60">
          Or continue with
        </span>
      </div>

      <div className="w-full">
        <Button
          variant="outline"
          className="w-full gap-2 bg-transparent"
          onClick={() => signIn("google", { redirectTo: "/login" })}
        >
          <GoogleLogo />
          Google
        </Button>
      </div>

      <p className="px-12 text-center text-sm font-normal leading-normal text-primary/60">
        By clicking continue, you agree to our{" "}
        <a className="underline hover:text-primary">Terms of Service</a> and{" "}
        <a className="underline hover:text-primary">Privacy Policy.</a>
      </p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function VerifyForm({ email }: { email: string }) {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8">
        <h1 className="text-center text-2xl font-bold mb-8">HACKGLOBE</h1>

        <Card className="border rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Verify Email</CardTitle>
            <CardDescription>
              Enter the 8-digit code we sent to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto flex h-full w-full max-w-96 flex-col justify-center gap-6">
              <form
                className="flex flex-col"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitting(true);
                  const formData = new FormData(event.currentTarget);
                  signIn("password-code", formData).catch((error) => {
                    console.error(error);
                    setSubmitting(false);
                  });
                }}
              >
                <label htmlFor="email">Code</label>
                <CodeInput />
                <input type="hidden" name="flow" value="email-verification" />
                <input type="hidden" name="email" value={email} />

                <Button type="submit" disabled={submitting}>
                  Continue
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PasswordResetForm({
  handleCancel,
  provider,
}: {
  handleCancel: () => void;
  provider: string;
}) {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
  const [submitting, setSubmitting] = useState(false);

  if (step !== "forgot") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md p-8">
          <h1 className="text-center text-2xl font-bold mb-8">HACKGLOBE</h1>

          <Card className="border rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Enter the 8-digit code we sent to your email address and choose
                a new password.
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="mx-auto flex h-full w-full max-w-96 flex-col  justify-center gap-6">
                <form
                  className="flex flex-col"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitting(true);
                    const formData = new FormData(event.currentTarget);
                    signIn(provider, formData).catch((error) => {
                      console.error(error);
                      setSubmitting(false);
                    });
                  }}
                >
                  <label htmlFor="email">Code</label>
                  <CodeInput />
                  <label htmlFor="newPassword">New Password</label>
                  <Input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="mb-4 "
                    autoComplete="new-password"
                  />
                  <input type="hidden" name="flow" value="reset-verification" />
                  <input type="hidden" name="email" value={step.email} />
                  <Button type="submit" disabled={submitting}>
                    Continue
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setStep("forgot")}
                  >
                    Cancel
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignInWithEmailCode
        handleCodeSent={(email) => setStep({ email })}
        provider={provider}
        handleCancel={handleCancel}
      >
        <input name="flow" type="hidden" value="reset" />
      </SignInWithEmailCode>
    </>
  );
}

function SignInWithEmailCode({
  handleCodeSent,
  provider,
  children,
  handleCancel,
}: {
  handleCodeSent: (email: string) => void;
  provider?: string;
  children?: React.ReactNode;
  handleCancel?: () => void;
}) {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8">
        <h1 className="text-center text-2xl font-bold mb-8">HACKGLOBE</h1>

        <Card className="border rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle> Forgot your password?</CardTitle>
            <CardDescription>
              Enter your email address to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
              <form
                className="flex w-full flex-col items-start gap-1"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitting(true);
                  const formData = new FormData(event.currentTarget);
                  signIn(provider ?? "resend-otp", formData)
                    .then(() => handleCodeSent(formData.get("email") as string))
                    .catch((error) => {
                      console.error(error);
                      setSubmitting(false);
                    });
                }}
              >
                <label htmlFor="email">Email</label>
                <Input
                  name="email"
                  id="email"
                  className="mb-4"
                  autoComplete="email"
                />
                {children}
                <Button type="submit" className="w-full" disabled={submitting}>
                  Send code
                </Button>
              </form>
              <Button type="button" variant="link" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const GoogleLogo = () => (
  <svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

function CodeInput({ length = 8 }: { length?: number }) {
  return (
    <div className="mb-4">
      <InputOTP maxLength={8} name="code" id="code">
        <InputOTPGroup>
          {Array(length)
            .fill(null)
            .map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
