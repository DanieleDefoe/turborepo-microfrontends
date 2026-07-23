import type { Component } from "vue";

export interface IApp {
  connected: boolean;
  desc: string;
  logo: Component;
  name: string;
}
