<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import type { VariantProps } from "class-variance-authority";
  import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui";
  import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { provide } from "vue";
  import type { toggleVariants } from "@/components/ui/toggle";
  import { cn } from "@/lib/utils";

  type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

  const props = withDefaults(
    defineProps<
      ToggleGroupRootProps & {
        class?: HTMLAttributes["class"];
        variant?: ToggleGroupVariants["variant"];
        size?: ToggleGroupVariants["size"];
        spacing?: number;
      }
    >(),
    {
      spacing: 0,
    }
  );

  const emits = defineEmits<ToggleGroupRootEmits>();

  provide("toggleGroup", {
    size: props.size,
    spacing: props.spacing,
    variant: props.variant,
  });

  const delegatedProps = reactiveOmit(props, "class", "size", "variant");
  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ToggleGroupRoot
    data-slot="toggle-group"
    v-slot="slotProps"
    :data-size="size"
    :data-spacing="spacing"
    :data-variant="variant"
    :style="{
      '--gap': spacing,
    }"
    v-bind="forwarded"
    :class="cn('group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs', props.class)"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupRoot>
</template>
