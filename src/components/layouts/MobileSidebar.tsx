import { ModeToggle } from "@/components/ModeToggle.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Bell, House, LogOut, Menu, UserRound } from "lucide-react";
import { Link, NavLink, type NavLinkRenderProps } from "react-router";

type MobileSidebarProps = {
  isAuthenticated: boolean;
  navLinkClass:(props:NavLinkRenderProps) => string ;
}
const MobileSidebar = ({isAuthenticated,navLinkClass}:MobileSidebarProps) => {
  const [open,setOpen] =useState(false);
  return (
    <div className="flex items-center gap-4 lg:hidden">
      <ModeToggle />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button size="icon" />} aria-label="Open menu">
          <Menu size={18} />
        </SheetTrigger>

        <SheetContent side="right" className="w-3/4">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="pa-5 flex flex-col items-center gap-4 py-4">
            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              <House size={18} />
              Home
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/notifications"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  <Bell size={18} />
                  Notifications
                </NavLink>

                <NavLink
                  to="/profile/:username"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;