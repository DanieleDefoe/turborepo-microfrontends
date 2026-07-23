<script lang="ts" setup>
  import { ArrowUpIcon, PaperclipIcon } from "@lucide/vue";

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
  } from "@/components/ui/input-group";
  import { Separator } from "@/components/ui/separator";

  import type { TalkMode } from "../types";

  import TalkType from "./talk-type.vue";

  const emit = defineEmits<{
    submit: [content: string];
    typeChange: [type: TalkMode];
  }>();

  const text = shallowRef("");
  const talkType = shallowRef<TalkMode>("deep-think");

  function handleTypeChange(type: TalkMode) {
    emit("typeChange", type);
  }

  function handleSubmit() {
    emit("submit", text.value);
    nextTick(() => (text.value = ""));
  }
</script>

<template>
  <InputGroup>
    <InputGroupTextarea placeholder="Ask, Search or Chat..." v-model="text" />
    <InputGroupAddon align="block-end">
      <TalkType v-model:type="talkType" @update:type="handleTypeChange" />

      <InputGroupButton class="rounded-full" size="icon-xs" variant="ghost">
        <PaperclipIcon class="size-4" />
        <span class="sr-only">Add File</span>
      </InputGroupButton>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <InputGroupButton variant="ghost"> Auto </InputGroupButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          class="[--radius:0.95rem]"
          side="top"
        >
          <DropdownMenuItem>Auto</DropdownMenuItem>
          <DropdownMenuItem>Agent</DropdownMenuItem>
          <DropdownMenuItem>Manual</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <InputGroupText class="ml-auto"> 52% used </InputGroupText>
      <Separator class="h-4!" orientation="vertical" />

      <InputGroupButton
        class="rounded-full"
        size="icon-xs"
        variant="default"
        :disabled="!text"
        @click="handleSubmit"
      >
        <ArrowUpIcon class="size-4" />
        <span class="sr-only">Add File</span>
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
