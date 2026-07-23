<script lang="ts" setup>
  import { ref } from "vue";
  import { Switch } from ".";

  const on = ref(true);
</script>

<template>
  <Stories title="UI/Switch" :component="Switch">
    <Story title="Default">
      <Switch />
    </Story>

    <Story title="Checked">
      <Switch v-model="on" />
    </Story>

    <Story title="Small">
      <Switch size="sm" />
    </Story>

    <Story title="Disabled">
      <Switch disabled />
    </Story>

    <Story title="With Label">
      <label class="flex items-center gap-2 text-sm">
        <Switch /> Airplane mode
      </label>
    </Story>
  </Stories>
</template>
