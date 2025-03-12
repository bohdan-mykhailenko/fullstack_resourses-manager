import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@/components/features";

export const Route = createFileRoute("/sign-up")({
  component: SignUpForm,
});
