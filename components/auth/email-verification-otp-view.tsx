"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authViewClassNames } from "@/lib/auth/auth-view-styles";
import { authClient } from "@/lib/auth/client";
import { clearPendingVerifyEmail } from "@/lib/auth/pending-email-verification";
import { patientAuthCopy } from "@/lib/copy/patient/auth";
import { POST_AUTH_REDIRECT } from "@/lib/routes/auth";
import { cn } from "@/lib/utils";

function normalizeEmail(value: string | null | undefined): string | null {
  const email = value?.trim().toLowerCase();
  if (!email || !email.includes("@")) return null;
  return email;
}

export function EmailVerificationOtpView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = useMemo(
    () => normalizeEmail(searchParams.get("email")),
    [searchParams],
  );

  const [code, setCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (email) return;
    router.replace("/auth/sign-up");
  }, [email, router]);

  const formClasses = authViewClassNames.form;
  const inputClassName = cn("h-11 rounded-xl", formClasses?.input);
  const primaryButtonClassName = cn("h-11 w-full rounded-xl", formClasses?.primaryButton);
  const outlineButtonClassName = cn("h-11 w-full rounded-xl", formClasses?.outlineButton);

  if (!email) {
    return null;
  }

  async function resendCode() {
    setIsSending(true);
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
        fetchOptions: { throw: true },
      });
      toast.success(patientAuthCopy.emailOtp.codeSent);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : patientAuthCopy.emailOtp.sendFailed;
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  }

  async function verifyCode() {
    const otp = code.trim();

    if (otp.length < 6) {
      toast.error(patientAuthCopy.emailOtp.invalidCode);
      return;
    }

    setIsVerifying(true);
    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      const apiError =
        result &&
        typeof result === "object" &&
        "error" in result &&
        result.error &&
        typeof result.error === "object"
          ? (result.error as { message?: string })
          : null;

      if (apiError) {
        throw new Error(apiError.message ?? patientAuthCopy.emailOtp.verifyFailed);
      }

      const session = await authClient.getSession();
      const hasSession = Boolean(session?.data?.session);

      clearPendingVerifyEmail();

      if (hasSession) {
        toast.success(patientAuthCopy.emailOtp.verified);
        router.push(POST_AUTH_REDIRECT);
        router.refresh();
        return;
      }

      toast.success(patientAuthCopy.emailOtp.verifiedSignIn);
      router.push(`/auth/sign-in?email=${encodeURIComponent(email)}&verified=1`);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : patientAuthCopy.emailOtp.verifyFailed;
      toast.error(message);
      setCode("");
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <form
      className="grid w-full gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        void verifyCode();
      }}
    >
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-[1.75rem]">
          {patientAuthCopy.emailOtp.enterCodeTitle}
        </h1>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
          {patientAuthCopy.emailOtp.enterCodeDescription(email)}
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="verify-code" className={formClasses?.label}>
          {patientAuthCopy.emailOtp.codeLabel}
        </Label>
        <Input
          id="verify-code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={6}
          value={code}
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, "").slice(0, 6);
            setCode(next);
          }}
          placeholder={patientAuthCopy.emailOtp.codePlaceholder}
          className={cn(inputClassName, "text-center text-lg tracking-[0.3em]")}
          disabled={isVerifying}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isVerifying || code.length < 6}
        className={primaryButtonClassName}
      >
        {isVerifying ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          patientAuthCopy.emailOtp.verifyCode
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        disabled={isSending || isVerifying}
        className={outlineButtonClassName}
        onClick={() => void resendCode()}
      >
        {isSending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          patientAuthCopy.emailOtp.resendCode
        )}
      </Button>
    </form>
  );
}
