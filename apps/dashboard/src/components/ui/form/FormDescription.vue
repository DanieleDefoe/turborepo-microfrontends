<script lang="ts" setup>
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";
  import { useFormField } from "./useFormField";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const { formDescriptionId } = useFormField();
</script>

<template>
  <p
    data-slot="form-description"
    :class="cn('text-muted-foreground text-sm', props.class)"
    :id="formDescriptionId"
  >
    <slot />
  </p>
</template>
