import { computed, reactive } from "vue";

export interface AuthUser {
  username: string;
}

// ponytail: mock auth — swap internals to BFF endpoints (user ← GET /api/me,
// login → redirect to BFF login, logout → BFF logout); callers unchanged.
// Tokens must never live in JS — see the design spec (BFF pattern).
const state = reactive<{ user: AuthUser | null }>({
  user: JSON.parse(
    localStorage.getItem("shell.user") ?? "null"
  ) as AuthUser | null,
});

export function useAuth() {
  return {
    login(username: string, password: string): boolean {
      if (!(username && password)) {
        return false;
      }
      state.user = { username };
      localStorage.setItem("shell.user", JSON.stringify(state.user));
      return true;
    },
    logout() {
      state.user = null;
      localStorage.removeItem("shell.user");
    },
    user: computed(() => state.user),
  };
}
