<script lang="ts" setup>
  import type { PrimitiveProps } from "reka-ui";
  import { Primitive } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";

  interface Props extends PrimitiveProps {
    align?: "start" | "end";
    class?: HTMLAttributes["class"];
  }
  const props = withDefaults(defineProps<Props>(), {
    align: "start",
    as: "div",
  });
</script>

<template>
  <Primitive
    data-slot="message"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'text-sm gap-2 group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse',
      props.class,
    )"
    :data-align="align"
  >
    <slot />
  </Primitive>
</template>
