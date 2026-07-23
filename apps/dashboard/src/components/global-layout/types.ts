import type { Component } from "vue";

export interface LayoutHeaderProps {
  description: string;
  sticky?: boolean;
  title: string;
}

export interface TwoColAsideNavItem {
  icon?: Component;
  title: string;
  url: string;
}
