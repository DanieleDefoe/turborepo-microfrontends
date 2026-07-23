<script setup lang="ts">
import { Input } from '.'
</script>

<template>
  <Stories title="UI/Input" :component="Input">
    <Story title="Default">
      <Input placeholder="Email" class="w-64" />
    </Story>

    <Story title="With Value">
      <Input default-value="hello@ap.dev" class="w-64" />
    </Story>

    <Story title="Disabled">
      <Input placeholder="Disabled" disabled class="w-64" />
    </Story>

    <Story title="Invalid">
      <Input placeholder="Invalid" aria-invalid class="w-64" />
    </Story>
  </Stories>
</template>
