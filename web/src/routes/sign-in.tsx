import { createFileRoute } from "@tanstack/react-router";

import { SignInForm } from "@/components/features";

export const Route = createFileRoute("/sign-in")({
  component: SignInForm,
});
