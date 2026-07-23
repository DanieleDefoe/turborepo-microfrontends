<script lang="ts" setup>
  import { cn } from "@/lib/utils";
  import type { WithClassAsProps } from "./interface";
  import { useCarousel } from "./useCarousel";

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<WithClassAsProps>();

  const { orientation } = useCarousel();
</script>

<template>
  <div class="overflow-hidden" data-slot="carousel-content" ref="carouselRef">
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class,
        )"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
