<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import type { PrimitiveProps } from "reka-ui";
  import { Primitive } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        size?: "sm" | "md";
        isActive?: boolean;
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      as: "a",
      size: "md",
    }
  );
</script>

<template>
  <Primitive
    data-sidebar="menu-sub-button"
    data-slot="sidebar-menu-sub-button"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground h-7 gap-2 rounded-md px-2 focus-visible:ring-2 data-[size=md]:text-sm data-[size=sm]:text-xs [&>svg]:size-4 flex min-w-0 -translate-x-px items-center overflow-hidden outline-hidden group-data-[collapsible=icon]:hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0',
      props.class,
    )"
    :data-active="isActive || undefined"
    :data-size="size"
  >
    <slot />
  </Primitive>
</template>
