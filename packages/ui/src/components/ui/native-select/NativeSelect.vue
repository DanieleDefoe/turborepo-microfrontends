<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import { ChevronDownIcon } from "@lucide/vue";
  import { reactiveOmit, useVModel } from "@vueuse/core";
  import type { AcceptableValue } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<{
    modelValue?: AcceptableValue | AcceptableValue[];
    class?: HTMLAttributes["class"];
    size?: "sm" | "default";
  }>();

  const emit = defineEmits<{
    "update:modelValue": AcceptableValue;
  }>();

  const model = useVModel(props, "modelValue", emit, {
    defaultValue: "",
    passive: true,
  });

  const delegatedProps = reactiveOmit(props, "class", "size");
</script>

<template>
  <div
    class="group/native-select relative w-fit has-[select:disabled]:opacity-50"
    data-slot="native-select-wrapper"
    :data-size="props.size ?? 'default'"
  >
    <select
      v-bind="{ ...$attrs, ...delegatedProps }"
      data-slot="native-select"
      v-model="model"
      :class="cn(
        'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-8 w-full min-w-0 appearance-none rounded-lg border bg-transparent py-1 pr-8 pl-2.5 text-sm transition-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
        props.class,
      )"
      :data-size="props.size ?? 'default'"
    >
      <slot />
    </select>
    <ChevronDownIcon
      aria-hidden="true"
      class="text-muted-foreground top-1/2 right-2.5 size-4 -translate-y-1/2 pointer-events-none absolute select-none"
      data-slot="native-select-icon"
    />
  </div>
</template>
