import { ModeToggle } from "@/components/ModeToggle.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Menu} from "lucide-react";
import { NavLink, type NavLinkRenderProps } from "react-router";
import { navItems } from "@/components/layouts/navItems.ts";
import AuthButton from "@/components/layouts/AuthButton.tsx";

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
          <nav className="px-5 flex flex-col items-center gap-4 py-4">
            {navItems
              .filter((item) => !item.requiresAuth || isAuthenticated)
              .map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}

            <AuthButton
              isAuthenticated={isAuthenticated}
              onClick={() => setOpen(false)}
            />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;