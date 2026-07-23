<script lang="ts" setup>
  import { Input } from ".";
</script>

<template>
  <Stories title="UI/Input" :component="Input">
    <Story title="Default">
      <Input class="w-64" placeholder="Email" />
    </Story>

    <Story title="With Value">
      <Input class="w-64" default-value="hello@ap.dev" />
    </Story>

    <Story title="Disabled">
      <Input class="w-64" disabled placeholder="Disabled" />
    </Story>

    <Story title="Invalid">
      <Input aria-invalid class="w-64" placeholder="Invalid" />
    </Story>
  </Stories>
</template>
