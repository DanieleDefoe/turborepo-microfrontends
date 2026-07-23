<script lang="ts" setup>
  import type { HTMLAttributes } from "vue";
  import { onBeforeUnmount, onMounted, useTemplateRef, watch } from "vue";
  import { cn } from "@/lib/utils";
  import { SCROLL_KEYS, useMessageScrollerContext } from "./useMessageScroller";

  const props = withDefaults(
    defineProps<{
      class?: HTMLAttributes["class"];
      preserveScrollOnPrepend?: boolean;
    }>(),
    {
      preserveScrollOnPrepend: true,
    }
  );

  const {
    autoscrolling,
    handleResize,
    scrollableAttr,
    setPreserveScrollOnPrepend,
    setViewportElement,
    syncAfterScroll,
    userScrollIntent,
  } = useMessageScrollerContext();

  const viewportEl = useTemplateRef<HTMLElement>("viewport");

  watch(() => props.preserveScrollOnPrepend, setPreserveScrollOnPrepend, {
    immediate: true,
  });

  function onKeyDown(event: KeyboardEvent) {
    if (SCROLL_KEYS.has(event.key)) {
      userScrollIntent();
    }
  }

  let resizeObserver: ResizeObserver | null = null;
  let resizeFrame = 0;

  onMounted(() => {
    const viewport = viewportEl.value;
    setViewportElement(viewport);
    if (!viewport || typeof ResizeObserver === "undefined") {
      return;
    }
    resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(handleResize);
    });
    resizeObserver.observe(viewport);
  });

  onBeforeUnmount(() => {
    window.cancelAnimationFrame(resizeFrame);
    resizeObserver?.disconnect();
    resizeObserver = null;
    setViewportElement(null);
  });
</script>

<template>
  <div
    aria-label="Messages"
    data-slot="message-scroller-viewport"
    role="region"
    ref="viewport"
    :class="cn(
      'size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-none',
      props.class,
    )"
    :data-autoscrolling="autoscrolling ? '' : undefined"
    :data-scrollable="scrollableAttr"
    :tabindex="0"
    @keydown="onKeyDown"
    @scroll="syncAfterScroll()"
    @touchmove="userScrollIntent()"
    @wheel="userScrollIntent()"
  >
    <slot />
  </div>
</template>
