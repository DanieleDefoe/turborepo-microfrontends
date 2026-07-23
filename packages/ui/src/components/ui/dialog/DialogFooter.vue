<script lang="ts" setup>
  import { Button } from "@ap/ui/components/button";
  import { cn } from "@ap/ui/lib/utils";
  import { DialogClose } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<{
      class?: HTMLAttributes["class"];
      showCloseButton?: boolean;
    }>(),
    {
      showCloseButton: false,
    }
  );
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
  >
    <slot />
    <DialogClose as-child v-if="showCloseButton">
      <Button variant="outline"> Close </Button>
    </DialogClose>
  </div>
</template>
