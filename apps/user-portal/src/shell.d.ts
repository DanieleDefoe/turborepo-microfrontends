declare module "shell/auth" {
  import type { ComputedRef } from "vue";

  export interface AuthUser {
    username: string;
  }

  export function useAuth(): {
    user: ComputedRef<AuthUser | null>;
    login: (username: string, password: string) => boolean;
    logout: () => void;
  };
}
