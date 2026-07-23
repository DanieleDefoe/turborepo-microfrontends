<script lang="ts" setup>
  import { Button } from "@ap/ui/components/button";
  import { Input } from "@ap/ui/components/input";
  import { ref } from "vue";

  const name = ref("Ada Lovelace");
  const email = ref("ada@example.com");
</script>

<template>
  <section class="max-w-md space-y-4">
    <h1 class="font-semibold text-lg">Profile</h1>
    <label class="grid gap-1.5 font-medium text-sm"
      >Name<Input v-model="name" /></label
    >
    <label class="grid gap-1.5 font-medium text-sm"
      >Email<Input type="email" v-model="email" /></label
    >
    <Button>Save</Button>
  </section>
</template>
