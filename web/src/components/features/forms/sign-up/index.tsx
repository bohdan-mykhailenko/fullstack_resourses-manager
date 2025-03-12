import {
  Box,
  Button,
  Fieldset,
  Field as FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { Link, redirect } from "@tanstack/react-router";

import { useMutation } from "@/api/hooks/useMutation";
import { FormFieldError } from "@/components/ui";
import { type AuthenticatedUser, authService } from "@/services/auth";
import { useAuthActions } from "@/store/current-user";

import { SignUpFormData, signUpSchema } from "./validation";

export const SignUpForm = () => {
  const { loginUser } = useAuthActions();

  const { mutate: signUp, isPending } = useMutation<
    AuthenticatedUser,
    SignUpFormData
  >({
    mutationFn: (credentials) => authService.signUp(credentials),
    onSuccess: (user) => {
      loginUser(user);
      redirect({ to: "/" });
    },
    successMessage: "Successfully logged in!",
  });

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: ({ value }) => {
      signUp(value);
    },
    validators: {
      onChange: signUpSchema,
    },
  });

  return (
    <Box w="full" minW={320}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Fieldset.Root spaceY={4}>
          <Field
            name="firstName"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  First Name:
                </FormControl.Label>

                <Input
                  id={field.name}
                  type="text"
                  colorPalette="orange"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter your first name"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="lastName"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Last Name:
                </FormControl.Label>

                <Input
                  id={field.name}
                  type="text"
                  colorPalette="orange"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter your last name"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="email"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Email:
                </FormControl.Label>

                <Input
                  id={field.name}
                  type="email"
                  colorPalette="orange"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter your email"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="password"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Password:
                </FormControl.Label>

                <Input
                  id={field.name}
                  type="password"
                  colorPalette="orange"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter your password"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="passwordConfirmation"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Password Confirmation:
                </FormControl.Label>

                <Input
                  id={field.name}
                  type="password"
                  colorPalette="orange"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Confirm your password"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <VStack spaceY={4} mt={6}>
            <Button
              w="full"
              type="submit"
              colorPalette="orange"
              loading={isPending}
              loadingText="SignUpg in..."
              color="white"
            >
              Sign up
            </Button>

            <HStack
              align="center"
              justify="center"
              css={{
                "& a": {
                  textDecoration: "none",
                  color: "blue.600",
                  fontWeight: "bold",
                  fontSize: "sm",
                },
              }}
            >
              <Text>Already have an account?</Text>

              <Link to="/sign-in">Sign in</Link>
            </HStack>
          </VStack>
        </Fieldset.Root>
      </form>
    </Box>
  );
};
