<script lang="ts" setup>
  import { buttonVariants } from "@ap/ui/components/button";
  import { cn } from "@ap/ui/lib/utils";
  import { ChevronRightIcon } from "@lucide/vue";
  import { reactiveOmit } from "@vueuse/core";
  import type { CalendarNextProps } from "reka-ui";
  import { CalendarNext, useForwardProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    CalendarNextProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = reactiveOmit(props, "class");

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarNext
    data-slot="calendar-next-button"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRightIcon class="cn-rtl-flip size-4" />
    </slot>
  </CalendarNext>
</template>
