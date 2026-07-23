<script lang="ts" setup>
  import { ErrorMessage } from "vee-validate";
  import type { HTMLAttributes } from "vue";
  import { toValue } from "vue";
  import { cn } from "@/lib/utils";
  import { useFormField } from "./useFormField";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();

  const { name, formMessageId } = useFormField();
</script>

<template>
  <ErrorMessage
    as="p"
    data-slot="form-message"
    :class="cn('text-destructive text-sm', props.class)"
    :id="formMessageId"
    :name="toValue(name)"
  />
</template>
