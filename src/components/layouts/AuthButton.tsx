import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

type AuthButtonProps = {
  isAuthenticated: boolean;
  onClick?: () => void;
};

export default function AuthButton({
  isAuthenticated,
  onClick,
}: AuthButtonProps) {
  return isAuthenticated ? (
    <Button
      variant="ghost"
      aria-label="Logout"
      className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-destructive lg:size-8 lg:p-0 lg:text-foreground dark:hover:bg-transparent"
      onClick={onClick}
    >
      <LogOut size={18} />
      <span className="pl-2 lg:hidden">Logout</span>
    </Button>
  ) : (
    <Button
      nativeButton={false}
      render={<Link to="/login" />}
      onClick={onClick}
    >
      Sign in
    </Button>
  );
}
