import {
  BadgeHelpIcon,
  BellDotIcon,
  BirdIcon,
  BoxesIcon,
  BugIcon,
  ComponentIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  PaletteIcon,
  PictureInPicture2Icon,
  PodcastIcon,
  SettingsIcon,
  SquareUserRoundIcon,
  UserIcon,
  UsersIcon,
  WrenchIcon,
} from "@lucide/vue";

import type { NavGroup, NavItem } from "@/components/app-sidebar/types";

type SidebarLink = Extract<NavItem, { url: string }>;

export const settingsNavItems: SidebarLink[] = [
  { icon: UserIcon, title: "Profile", url: "/settings/" },
  { icon: WrenchIcon, title: "Account", url: "/settings/account" },
  { icon: PaletteIcon, title: "Appearance", url: "/settings/appearance" },
  { icon: BellDotIcon, title: "Notifications", url: "/settings/notifications" },
  { icon: PictureInPicture2Icon, title: "Display", url: "/settings/display" },
];

export const navData: NavGroup[] = [
  {
    items: [
      { icon: LayoutDashboardIcon, title: "Dashboard", url: "/dashboard" },
      { icon: ListTodoIcon, title: "Tasks", url: "/tasks" },
      { icon: BoxesIcon, title: "Apps", url: "/apps" },
      { icon: UsersIcon, title: "Users", url: "/users" },
      { icon: PodcastIcon, title: "Ai Talk Example", url: "/ai-talk" },
    ],
    title: "General",
  },
  {
    items: [
      {
        icon: SquareUserRoundIcon,
        items: [
          { title: "Sign In", url: "/auth/sign-in" },
          { title: "Sign In(2 Col)", url: "/auth/sign-in-2" },
          { title: "Sign Up", url: "/auth/sign-up" },
          { title: "Forgot Password", url: "/auth/forgot-password" },
          { title: "OTP", url: "/auth/otp" },
        ],
        title: "Auth",
      },
      {
        icon: BugIcon,
        items: [
          { title: "401 | Unauthorized", url: "/errors/401" },
          { title: "403 | Forbidden", url: "/errors/403" },
          { title: "404 | Not Found", url: "/errors/404" },
          { title: "500 | Internal Server Error", url: "/errors/500" },
          { title: "503 | Maintenance Error", url: "/errors/503" },
        ],
        title: "Errors",
      },
    ],
    title: "Pages",
  },
  {
    items: [
      { icon: SettingsIcon, items: settingsNavItems, title: "Settings" },
      {
        icon: ComponentIcon,
        title: "Prop Components",
        url: "/prop-components",
      },
      { icon: BadgeHelpIcon, title: "Help Center", url: "/help-center" },
      {
        icon: BirdIcon,
        title: "Outside Page(GitHub)",
        url: "https://www.github.com/Whbbit1999/shadcn-vue-admin",
      },
    ],
    title: "Other",
  },
];

export const otherPages: NavGroup[] = [
  {
    items: [
      { icon: CreditCardIcon, title: "Plans & Pricing", url: "/billing" },
    ],
    title: "Other",
  },
];
