<script lang="ts" setup>
  import { useForwardPropsEmits } from "reka-ui";
  import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";
  import { DrawerRoot } from "vaul-vue";

  const props = withDefaults(defineProps<DrawerRootProps>(), {
    shouldScaleBackground: true,
  });

  const emits = defineEmits<DrawerRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits) as any;
</script>

<template>
  <DrawerRoot data-slot="drawer" v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DrawerRoot>
</template>
