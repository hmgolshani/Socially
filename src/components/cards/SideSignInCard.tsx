import { Button } from "@/components/ui/button";
import { Link } from "react-router";

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
        <Button
          nativeButton={false}
          render={<Link to="/login" />}
          className="w-full"
        >
          Log In
        </Button>

        <Button
          variant="secondary"
          nativeButton={false}
          render={<Link to="/register" />}
          className="w-full"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SideSignInCard;