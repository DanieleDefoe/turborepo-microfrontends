import {
  AudioWaveformIcon,
  CommandIcon,
  GalleryVerticalEndIcon,
} from "@lucide/vue";

import { navData } from "@/constants/sidebar-data";

import type { SidebarData, Team, User } from "../types";

const user: User = {
  avatar: "/avatars/shadcn.jpg",
  email: "m@example.com",
  name: "shadcn",
};

const teams: Team[] = [
  {
    logo: GalleryVerticalEndIcon,
    name: "Acme Inc",
    plan: "Enterprise",
  },
  {
    logo: AudioWaveformIcon,
    name: "Acme Corp.",
    plan: "Startup",
  },
  {
    logo: CommandIcon,
    name: "Evil Corp.",
    plan: "Free",
  },
];

export const sidebarData: SidebarData = {
  navMain: navData,
  teams,
  user,
};
