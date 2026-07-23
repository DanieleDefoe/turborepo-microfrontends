import type { LucideProps } from "@lucide/vue";
import type { FunctionalComponent } from "vue";

type NavIcon = FunctionalComponent<
  LucideProps,
  Record<any, any>,
  any,
  Record<any, any>
>;

interface BaseNavItem {
  icon?: NavIcon;
  title: string;
}

export type NavItem =
  | (BaseNavItem & {
      items: (BaseNavItem & { url?: string })[];
      url?: never;
      isActive?: boolean;
    })
  | (BaseNavItem & {
      url: string;
      items?: never;
    });

export interface NavGroup {
  items: NavItem[];
  title: string;
}

export interface User {
  avatar: string;
  email: string;
  name: string;
}

export interface Team {
  logo: NavIcon;
  name: string;
  plan: string;
}

export interface SidebarData {
  navMain: NavGroup[];
  teams: Team[];
  user: User;
}
