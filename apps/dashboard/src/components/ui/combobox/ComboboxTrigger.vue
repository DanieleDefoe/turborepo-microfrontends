<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import type { ComboboxTriggerProps } from "reka-ui";
  import { ComboboxTrigger, useForwardProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";

  const props = defineProps<
    ComboboxTriggerProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = reactiveOmit(props, "class");

  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxTrigger
    data-slot="combobox-trigger"
    v-bind="forwarded"
    tabindex="0"
    :class="cn('', props.class)"
  >
    <slot />
  </ComboboxTrigger>
</template>
