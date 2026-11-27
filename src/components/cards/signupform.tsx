import type { ComponentProps } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <FieldGroup className="gap-6">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </Field>

              <Button type="submit" className="w-full cursor-pointer">
                Create Account
              </Button>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  Sign in
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="hidden bg-muted md:block" aria-hidden="true" />
        </CardContent>
      </Card>

      <p className="px-4 text-center text-xs leading-relaxed text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <span className="underline underline-offset-4">Terms of Service</span>{" "}
        and <span className="underline underline-offset-4">Privacy Policy</span>
        .
      </p>
    </div>
  );
}
