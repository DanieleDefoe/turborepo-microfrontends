import { Icon } from "@iconify/vue";

import type { IApp } from "../type";

const apps: IApp[] = [
  {
    connected: false,
    desc: "Connect with Telegram for real-time communication.",
    logo: h(Icon, { icon: "simple-icons:telegram" }),
    name: "Telegram",
  },
  {
    connected: true,
    desc: "Effortlessly sync Notion pages for seamless collaboration.",
    logo: h(Icon, { icon: "simple-icons:notion" }),
    name: "Notion",
  },
  {
    connected: true,
    desc: "View and collaborate on Figma designs in one place.",
    logo: h(Icon, { icon: "simple-icons:figma" }),
    name: "Figma",
  },
  {
    connected: false,
    desc: "Sync Trello cards for streamlined project management.",
    logo: h(Icon, { icon: "simple-icons:trello" }),
    name: "Trello",
  },
  {
    connected: false,
    desc: "Integrate Slack for efficient team communication",
    logo: h(Icon, { icon: "simple-icons:slack" }),
    name: "Slack",
  },
  {
    connected: true,
    desc: "Host Zoom meetings directly from the dashboard.",
    logo: h(Icon, { icon: "simple-icons:zoom" }),
    name: "Zoom",
  },
  {
    connected: false,
    desc: "Easily manage Stripe transactions and payments.",
    logo: h(Icon, { icon: "simple-icons:stripe" }),
    name: "Stripe",
  },
  {
    connected: true,
    desc: "Access and manage Gmail messages effortlessly.",
    logo: h(Icon, { icon: "simple-icons:gmail" }),
    name: "Gmail",
  },
  {
    connected: false,
    desc: "Explore and share Medium stories on your dashboard.",
    logo: h(Icon, { icon: "simple-icons:medium" }),
    name: "Medium",
  },
  {
    connected: false,
    desc: "Connect with Skype contacts seamlessly.",
    logo: h(Icon, { icon: "simple-icons:skype" }),
    name: "Skype",
  },
  {
    connected: false,
    desc: "Effortlessly manage Docker containers on your dashboard.",
    logo: h(Icon, { icon: "simple-icons:docker" }),
    name: "Docker",
  },
  {
    connected: false,
    desc: "Streamline code management with GitHub integration.",
    logo: h(Icon, { icon: "simple-icons:github" }),
    name: "GitHub",
  },
  {
    connected: false,
    desc: "Efficiently manage code projects with GitLab integration.",
    logo: h(Icon, { icon: "simple-icons:gitlab" }),
    name: "GitLab",
  },
  {
    connected: false,
    desc: "Connect with Discord for seamless team communication.",
    logo: h(Icon, { icon: "simple-icons:discord" }),
    name: "Discord",
  },
  {
    connected: false,
    desc: "Easily integrate WhatsApp for direct messaging.",
    logo: h(Icon, { icon: "simple-icons:whatsapp" }),
    name: "WhatsApp",
  },
];

export default apps;
