<script lang="ts" setup>
  import { cn } from "@/lib/utils";

  interface Props {
    animationDelay?: number;
    borderStyle?: string;
    class?: string;
    opacity?: number;
    size?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    opacity: 0.24,
    size: 210,
  });
</script>

<template>
  <div
    :class="cn('absolute shadow-xl', 'animate-ripple-circle', props.class)"
  />
</template>

<style scoped>
  .animate-ripple-circle {
    top: 50%;
    left: 50%;
    width: v-bind("`${props.size}px`");
    height: v-bind("`${props.size}px`");
    border-style: v-bind("props.borderStyle");
    border-width: 1px;
    opacity: v-bind("props.opacity");
    transform: translate(-50%, -50%) scale(1);
    animation: ripple-effect var(--duration, 2s) ease-in-out
      calc(var(--i, 0) * 0.2s) infinite;
    animation-delay: v-bind("`${props.animationDelay}ms`");
  }

  @keyframes ripple-effect {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }

    50% {
      transform: translate(-50%, -50%) scale(0.9);
    }
  }
</style>
