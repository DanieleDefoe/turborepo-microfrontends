<script lang="ts" setup>
  import { Button } from "@ap/ui/components/button";
  import { Input } from "@ap/ui/components/input";
  import { onMounted, ref } from "vue";

  const name = ref("Ada Lovelace");
  const email = ref("ada@example.com");
  const username = ref<string | null>(null);

  onMounted(async () => {
    try {
      // Federated import, resolved by the shell at runtime. Guarded so the
      // standalone harness (no shell running) still renders.
      const { useAuth } = await import("shell/auth");
      username.value = useAuth().user.value?.username ?? null;
    } catch {
      username.value = null;
    }
  });
</script>

<template>
  <section class="max-w-md space-y-4">
    <h1 class="font-semibold text-lg">Profile</h1>
    <p class="text-muted-foreground text-sm" v-if="username">
      Signed in as {{ username }} (via shell/auth)
    </p>
    <label class="grid gap-1.5 font-medium text-sm"
      >Name<Input v-model="name" /></label
    >
    <label class="grid gap-1.5 font-medium text-sm"
      >Email<Input type="email" v-model="email" /></label
    >
    <Button>Save</Button>
  </section>
</template>
