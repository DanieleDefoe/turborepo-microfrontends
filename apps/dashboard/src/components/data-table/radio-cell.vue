<script lang="ts" setup>
  import { CircleIcon } from "@lucide/vue";

  import { cn } from "@/lib/utils";

  defineProps<{
    checked: boolean;
  }>();

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();
</script>

<template>
  <button
    role="radio"
    type="button"
    :aria-checked="checked"
    :class="
      cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-ring cursor-pointer',
      )
    "
    @click="emit('click', $event)"
  >
    <span class="relative flex items-center justify-center" v-if="checked">
      <CircleIcon
        class="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"
      />
    </span>
  </button>
</template>
