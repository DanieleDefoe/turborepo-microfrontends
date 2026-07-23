<script lang="ts" setup>
  import RippleCircle from "./circle.vue";

  interface Props {
    baseCircleOpacity?: number;
    baseCircleSize?: number;
    circleClass?: string;
    circleOpacityDowngradeRatio?: number;
    numberOfCircles?: number;
    spaceBetweenCircle?: number;
    waveSpeed?: number;
  }

  withDefaults(defineProps<Props>(), {
    baseCircleOpacity: 0.24,
    baseCircleSize: 210,
    circleOpacityDowngradeRatio: 0.03,
    numberOfCircles: 7,
    spaceBetweenCircle: 70,
    waveSpeed: 80,
  });
</script>

<template>
  <div class="absolute inset-0">
    <RippleCircle
      v-for="index in numberOfCircles"
      :key="index"
      :animation-delay="index * waveSpeed"
      :border-style="index === numberOfCircles - 1 ? 'dashed' : 'solid'"
      :class="circleClass"
      :opacity="baseCircleOpacity - index * circleOpacityDowngradeRatio"
      :size="baseCircleSize + index * spaceBetweenCircle"
    />
  </div>
</template>
