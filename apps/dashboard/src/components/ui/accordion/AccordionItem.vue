<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import type { AccordionItemProps } from "reka-ui";
  import { AccordionItem, useForwardProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";

  const props = defineProps<
    AccordionItemProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = reactiveOmit(props, "class");

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionItem
    data-slot="accordion-item"
    v-slot="slotProps"
    v-bind="forwardedProps"
    :class="cn('border-b last:border-b-0', props.class)"
  >
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
