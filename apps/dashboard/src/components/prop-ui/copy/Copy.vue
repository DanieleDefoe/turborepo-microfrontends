<script lang="ts" setup>
  import { CopyCheckIcon, CopyIcon } from "@lucide/vue";
  import { useClipboard } from "@vueuse/core";
  import type { HTMLAttributes } from "vue";

  import type { ButtonVariants } from "@/components/ui/button";

  import { Button } from "@/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { cn } from "@/lib/utils";

  import { copyVariants } from ".";

  interface Props {
    class?: HTMLAttributes["class"];
    content: string;
    copiedTooltipText?: string;
    copyTooltipText?: string;
    size?: "sm" | "default";
    variant?: ButtonVariants["variant"];
  }

  const props = withDefaults(defineProps<Props>(), {
    copiedTooltipText: "Copied",
    copyTooltipText: "Copy",
    size: "default",
    variant: "outline",
  });

  const iconSize = computed(() => (props.size === "sm" ? "sm" : "default"));

  const size = computed(() => (props.size === "sm" ? "sm" : "icon"));

  const source = computed(() => props.content);

  const { copy, copied, isSupported } = useClipboard({ source });
</script>

<template>
  <span v-if="isSupported">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            :class="cn(props.class)"
            :size="size"
            :variant="props.variant"
            @click="copy(source)"
          >
            <CopyIcon v-if="!copied" :class="cn(copyVariants({ iconSize }))" />
            <CopyCheckIcon v-else :class="cn(copyVariants({ iconSize }))" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p v-if="!copied">{{ props.copyTooltipText }}: {{ props.content }}</p>
          <p v-else>{{ props.copiedTooltipText }}: {{ props.content }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </span>
  <span v-else>Your browser does not support Clipboard API</span>
</template>
