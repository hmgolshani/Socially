import { Button } from "@/components/ui/button";

const SideSignInCard = () => {
  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-4">
      <h2 className="text-center text-base font-semibold text-content-primary">
        Welcome Back!
      </h2>

      <p className="mt-5 text-center text-xs leading-5 text-content-secondary">
        Login to access your profile and connect with others.
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <Button className="w-full bg-button-primary-normal text-content-opposite hover:bg-button-primary-hover">
          Log In
        </Button>

        <Button
          variant="secondary"
          className="w-full bg-muted text-content-primary hover:bg-button-tertiary-hover"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SideSignInCard;