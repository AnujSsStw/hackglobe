import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP, ResendOTPPasswordReset } from "./otp/ResendOTP";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    ResendOTP,
    Password({
      id: "password-code",
      reset: ResendOTPPasswordReset,
      verify: ResendOTP,
    }),
  ],
});
