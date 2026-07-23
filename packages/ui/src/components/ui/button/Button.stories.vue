<script lang="ts" setup>
  import { Button } from ".";

  const variants = [
    "default",
    "outline",
    "secondary",
    "ghost",
    "destructive",
    "link",
  ] as const;
  const sizes = ["xs", "sm", "default", "lg"] as const;
</script>

<template>
  <Stories title="UI/Button" :component="Button">
    <Story title="Default">
      <Button>Button</Button>
    </Story>

    <Story title="Variants">
      <div class="flex flex-wrap items-center gap-3">
        <Button v-for="v in variants" :key="v" :variant="v">{{ v }}</Button>
      </div>
    </Story>

    <Story title="Sizes">
      <div class="flex flex-wrap items-center gap-3">
        <Button v-for="s in sizes" :key="s" :size="s">{{ s }}</Button>
      </div>
    </Story>

    <Story title="Disabled">
      <Button disabled>Disabled</Button>
    </Story>
  </Stories>
</template>
