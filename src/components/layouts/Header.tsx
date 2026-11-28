import { Link, NavLink, type NavLinkRenderProps } from "react-router";
import { cn } from "@/lib/utils.ts";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import MobileSidebar from "@/components/layouts/MobileSidebar.tsx";
import { navItems } from "@/components/layouts/navItems.ts";
import AuthButton from "@/components/layouts/AuthButton.tsx";

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
          {navItems
            .filter((item) => !item.requiresAuth || isAuthenticated)
            .map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={navLinkClass}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          <AuthButton isAuthenticated={isAuthenticated}/>
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
