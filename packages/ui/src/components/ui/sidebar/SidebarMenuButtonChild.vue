<script lang="ts" setup>
  import { cn } from "@ap/ui/lib/utils";
  import type { PrimitiveProps } from "reka-ui";
  import { Primitive } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import type { SidebarMenuButtonVariants } from ".";
  import { sidebarMenuButtonVariants } from ".";

  export interface SidebarMenuButtonProps extends PrimitiveProps {
    class?: HTMLAttributes["class"];
    isActive?: boolean;
    size?: SidebarMenuButtonVariants["size"];
    variant?: SidebarMenuButtonVariants["variant"];
  }

  const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
    as: "button",
    size: "default",
    variant: "default",
  });
</script>

<template>
  <Primitive
    data-sidebar="menu-button"
    data-slot="sidebar-menu-button"
    :as="as"
    :as-child="asChild"
    :class="cn(sidebarMenuButtonVariants({ variant, size }), props.class)"
    :data-active="isActive || undefined"
    :data-size="size"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>
