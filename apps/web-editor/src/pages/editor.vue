<script lang="ts" setup>
  import { Button } from "@ap/ui/components/button";
  import { ref } from "vue";

  const content = ref("# Hello\n\nStart typing…");
  const saved = ref(false);
  const SAVED_FLASH_MS = 1500;

  function save() {
    saved.value = true;
    setTimeout(() => {
      saved.value = false;
    }, SAVED_FLASH_MS);
  }
</script>

<template>
  <section class="flex h-full flex-col gap-3">
    <div class="flex items-center gap-2">
      <h1 class="font-semibold text-lg">Editor</h1>
      <Button size="sm" @click="save">Save</Button>
      <span class="text-muted-foreground text-sm" v-if="saved">Saved ✓</span>
    </div>
    <textarea
      aria-label="Document content"
      class="min-h-64 w-full flex-1 rounded-lg border border-input bg-transparent p-3 font-mono text-sm outline-none focus-visible:ring-2"
      v-model="content"
    />
  </section>
</template>
