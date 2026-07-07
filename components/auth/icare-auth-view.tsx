"use client";

import { AuthView } from "@neondatabase/auth-ui";

import { authViewClassNames } from "@/lib/auth/auth-view-styles";

type ICareAuthViewProps = {
  path: string;
};

export function ICareAuthView({ path }: ICareAuthViewProps) {
  return (
    <AuthView
      path={path}
      redirectTo="/"
      socialLayout="vertical"
      className="w-full"
      classNames={authViewClassNames}
    />
  );
}
