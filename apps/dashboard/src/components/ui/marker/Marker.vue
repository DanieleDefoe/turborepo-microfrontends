<script lang="ts" setup>
  import type { PrimitiveProps } from "reka-ui";
  import { Primitive } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";
  import type { MarkerVariants } from ".";
  import { markerVariants } from ".";

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes["class"];
    variant?: MarkerVariants["variant"];
  }

  const props = withDefaults(defineProps<Props>(), {
    as: "div",
  });
</script>

<template>
  <Primitive
    data-slot="marker"
    :as="as"
    :as-child="asChild"
    :class="cn(markerVariants({ variant }), props.class)"
    :data-variant="variant"
  >
    <slot />
  </Primitive>
</template>
