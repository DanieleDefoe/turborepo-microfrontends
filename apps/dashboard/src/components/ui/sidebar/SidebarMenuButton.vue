<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import type { Component } from "vue";
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import type { SidebarMenuButtonProps } from "./SidebarMenuButtonChild.vue";
  import SidebarMenuButtonChild from "./SidebarMenuButtonChild.vue";
  import { useSidebar } from "./utils";

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(
    defineProps<
      SidebarMenuButtonProps & {
        tooltip?: string | Component;
      }
    >(),
    {
      as: "button",
      size: "default",
      variant: "default",
    }
  );

  const { isMobile, state } = useSidebar();

  const delegatedProps = reactiveOmit(props, "tooltip");
</script>

<template>
  <SidebarMenuButtonChild
    v-if="!tooltip"
    v-bind="{ ...delegatedProps, ...$attrs }"
  >
    <slot />
  </SidebarMenuButtonChild>

  <Tooltip v-else>
    <TooltipTrigger as-child>
      <SidebarMenuButtonChild v-bind="{ ...delegatedProps, ...$attrs }">
        <slot />
      </SidebarMenuButtonChild>
    </TooltipTrigger>
    <TooltipContent
      align="center"
      side="right"
      :hidden="state !== 'collapsed' || isMobile"
    >
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component :is="tooltip" v-else />
    </TooltipContent>
  </Tooltip>
</template>
