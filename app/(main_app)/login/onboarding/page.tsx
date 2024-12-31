"use client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

export const username_validator = z
  .string()
  .min(3)
  .max(20)
  .toLowerCase()
  .trim()
  .regex(
    /^[a-zA-Z0-9]+$/,
    "Username may only contain alphanumeric characters."
  );

export default function Page() {
  const user = useQuery(api.user.getCurrentUser, {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const completeOnboarding = useMutation(api.user.completeOnboarding);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      username: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      await completeOnboarding({
        username: value.username,
      });

      toast({
        title: "Welcome!",
        description: "Your account has been created.",
      });
      setIsSubmitting(false);
    },
  });

  useEffect(() => {
    if (user?.username) {
      router.push("/dashboard");
    }
  }, [user?.username]);

  return (
    <div className="mx-auto flex h-screen w-full max-w-96 flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="mb-2 select-none text-6xl">👋</span>
        <h3 className="text-center text-2xl font-medium text-primary">
          Welcome!
        </h3>
        <p className="text-center text-base font-normal text-primary/60">
          Let's get started by choosing a username.
        </p>
      </div>
      <form
        className="flex w-full flex-col items-start gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <form.Field
            name="username"
            validators={{
              onSubmit: username_validator,
            }}
            children={(field) => (
              <Input
                placeholder="Username"
                autoComplete="off"
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`bg-transparent ${
                  field.state.meta?.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive"
                }`}
              />
            )}
          />
        </div>

        <div className="flex flex-col">
          {form.state.fieldMeta.username?.errors.length > 0 && (
            <span className="mb-2 text-sm text-destructive dark:text-destructive-foreground">
              {form.state.fieldMeta.username?.errors.join(" ")}
            </span>
          )}
        </div>

        <Button type="submit" size="sm" className="w-full">
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button>
      </form>

      <p className="px-6 text-center text-sm font-normal leading-normal text-primary/60">
        You can update your username at any time from your account settings.
      </p>
    </div>
  );
}
