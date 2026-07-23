<script lang="ts" setup>
  import {
    NativeSelect,
    NativeSelectOption,
  } from "@ap/ui/components/native-select";
  import { Switch } from "@ap/ui/components/switch";
  import { ref } from "vue";

  const notifications = ref(true);
  const language = ref("en");
</script>

<template>
  <section class="max-w-md space-y-4">
    <h1 class="font-semibold text-lg">Settings</h1>
    <label class="flex items-center gap-3 font-medium text-sm">
      <Switch v-model="notifications" />
      Email notifications
    </label>
    <label class="grid gap-1.5 font-medium text-sm">
      Language
      <NativeSelect v-model="language">
        <NativeSelectOption value="en">English</NativeSelectOption>
        <NativeSelectOption value="ru">Русский</NativeSelectOption>
      </NativeSelect>
    </label>
  </section>
</template>
