import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    // if true, need user login
    auth?: boolean;
  }
}
