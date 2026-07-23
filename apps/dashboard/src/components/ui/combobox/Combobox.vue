<script lang="ts" setup>
  import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui";
  import { ComboboxRoot, useForwardPropsEmits } from "reka-ui";

  const props = defineProps<ComboboxRootProps>();
  const emits = defineEmits<ComboboxRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot data-slot="combobox" v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
