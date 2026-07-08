"use client";

import { useEffect, type RefObject } from "react";
import { toast } from "sonner";

type SignUpPasswordMatchFeedbackProps = {
  containerRef: RefObject<HTMLElement | null>;
  message: string;
};

function getPasswordFields(container: HTMLElement) {
  return {
    password: container.querySelector<HTMLInputElement>('input[name="password"]'),
    confirm: container.querySelector<HTMLInputElement>(
      'input[name="confirmPassword"]',
    ),
  };
}

export function SignUpPasswordMatchFeedback({
  containerRef,
  message,
}: SignUpPasswordMatchFeedbackProps) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const notifyIfMismatch = () => {
      const { password, confirm } = getPasswordFields(container);
      if (!password || !confirm) return false;

      const passwordValue = password.value;
      const confirmValue = confirm.value;

      if (confirmValue.length === 0) return false;

      if (passwordValue !== confirmValue) {
        toast.error(message);
        confirm.focus();
        return true;
      }

      return false;
    };

    const handleBlur = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.name !== "confirmPassword") return;

      notifyIfMismatch();
    };

    container.addEventListener("blur", handleBlur, true);

    return () => {
      container.removeEventListener("blur", handleBlur, true);
    };
  }, [containerRef, message]);

  return null;
}
