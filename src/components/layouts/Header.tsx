import { Link, NavLink, type NavLinkRenderProps } from "react-router";
import { Bell, House, LogOut, UserRound } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import MobileSidebar from "@/components/layouts/MobileSidebar.tsx";

const Header = () => {
  const navLinkClass = ({ isActive }: NavLinkRenderProps) =>
    cn(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive && isAuthenticated
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    );
  const isAuthenticated = true;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-layout-header backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-314 items-center justify-between px-4">
        <Link to="/" className="font-mono text-xl font-bold">
          Socially
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <ModeToggle />
          <NavLink to="/" className={navLinkClass}>
            <House size={18} />
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/notifications" className={navLinkClass}>
                <Bell size={18} />
                Notifications
              </NavLink>
              <NavLink to={"/profile/u"} className={navLinkClass}>
                <UserRound size={18} />
                Profile
              </NavLink>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Logout"
                className="bg-transparent transition-colors hover:text-destructive"
              >
                <LogOut size={18} />
              </Button>
            </>
          ) : (
            <Button nativeButton={false} render={<Link to="/login"></Link>}>
              Sign in
            </Button>
          )}
        </nav>
        <MobileSidebar
          isAuthenticated={isAuthenticated}
          navLinkClass={navLinkClass}
        />
      </div>
    </header>
  );
};

export default Header;
