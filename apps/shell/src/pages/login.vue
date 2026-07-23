<script lang="ts" setup>
  import { Button } from "@ap/ui/components/button";
  import { Input } from "@ap/ui/components/input";
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useAuth } from "../auth";

  const auth = useAuth();
  const route = useRoute();
  const router = useRouter();
  const username = ref("");
  const password = ref("");
  const failed = ref(false);

  function submit() {
    failed.value = !auth.login(username.value, password.value);
    if (!failed.value) {
      router.push(String(route.query.redirect ?? "/"));
    }
  }
</script>

<template>
  <main class="grid min-h-svh place-items-center">
    <form class="w-80 space-y-4 rounded-xl border p-6" @submit.prevent="submit">
      <h1 class="font-semibold text-lg">Sign in</h1>
      <label class="grid gap-1.5 font-medium text-sm">
        Username<Input autocomplete="username" v-model="username" />
      </label>
      <label class="grid gap-1.5 font-medium text-sm">
        Password<Input
          autocomplete="current-password"
          type="password"
          v-model="password"
        />
      </label>
      <p class="text-destructive text-sm" v-if="failed">
        Enter any username and password.
      </p>
      <Button class="w-full" type="submit">Sign in</Button>
    </form>
  </main>
</template>
