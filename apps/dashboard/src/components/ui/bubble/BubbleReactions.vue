<script lang="ts" setup>
  import type { PrimitiveProps } from "reka-ui";
  import { Primitive } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";
  import type { BubbleReactionsVariants } from ".";
  import { bubbleReactionsVariants } from ".";

  interface Props extends PrimitiveProps {
    align?: BubbleReactionsVariants["align"];
    class?: HTMLAttributes["class"];
    side?: BubbleReactionsVariants["side"];
  }

  const props = withDefaults(defineProps<Props>(), {
    align: "end",
    as: "div",
    side: "bottom",
  });
</script>

<template>
  <Primitive
    data-slot="bubble-reactions"
    :as="as"
    :as-child="asChild"
    :class="cn(bubbleReactionsVariants({ side, align }), props.class)"
    :data-align="align"
    :data-side="side"
  >
    <slot />
  </Primitive>
</template>
