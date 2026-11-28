import { Bell, House, UserRound } from "lucide-react";

export const navItems = [
  {
    to: "/",
    label: "Home",
    icon: House,
    requiresAuth: false,
  },
  {
    to: "/notifications",
    label: "Notifications",
    icon: Bell,
    requiresAuth: true,
  },
  {
    to: "/profile/test",
    label: "Profile",
    icon: UserRound,
    requiresAuth: true,
  },
];