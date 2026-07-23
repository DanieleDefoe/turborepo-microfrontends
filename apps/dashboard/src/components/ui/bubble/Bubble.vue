<script lang="ts" setup>
  import type { PrimitiveProps } from "reka-ui";
  import { Primitive } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";
  import type { BubbleVariants } from ".";
  import { bubbleVariants } from ".";

  interface Props extends PrimitiveProps {
    align?: "start" | "end";
    class?: HTMLAttributes["class"];
    variant?: BubbleVariants["variant"];
  }

  const props = withDefaults(defineProps<Props>(), {
    align: "start",
    as: "div",
    variant: "default",
  });
</script>

<template>
  <Primitive
    data-slot="bubble"
    :as="as"
    :as-child="asChild"
    :class="cn(bubbleVariants({ variant }), props.class)"
    :data-align="align"
    :data-variant="variant"
  >
    <slot />
  </Primitive>
</template>
