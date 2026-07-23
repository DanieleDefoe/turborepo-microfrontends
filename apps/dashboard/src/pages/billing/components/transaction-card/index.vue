<script lang="ts" setup>
  import { Icon } from "@iconify/vue";
  import { useClipboard } from "@vueuse/core";

  import FlickeringGrid from "@/components/inspira-ui/flickering-grid.vue";

  import type { PayState } from "../billing-history/data/data";

  import { statuses } from "../billing-history/data/data";

  interface Props {
    cardNo: number;
    currency: string;
    description?: string;
    invoiceNo: string;
    orderId: string;
    price: number;
    state: PayState;
    updatedAt: string;
  }
  const props = defineProps<Props>();

  const orderId = computed(() => props.orderId || "");
  const cardNo = computed(() => `**${props.cardNo.toString().slice(2)}`);
  const { copy, copied } = useClipboard({ source: orderId });

  const state = computed(() => props.state);
  const currentState = computed(() =>
    statuses.find((item) => item.value === state.value)
  );
</script>

<template>
  <div class="w-full font-mono rounded-lg shadow-sm bg-background">
    <header class="relative p-5">
      <h1 class="text-lg">Billing Card {{ cardNo }}</h1>
      <div class="flex items-center gap-2 mt-1">
        <p class="text-stone-600">
          {{ orderId }}
        </p>
        <button @click="copy(orderId)">
          <Icon
            class="duration-300 hover:scale-105"
            icon="carbon:copy"
            v-if="!copied"
          />
          <Icon
            class="text-green-500 duration-300"
            icon="carbon:checkmark"
            v-else
          />
        </button>
      </div>

      <div class="mt-6 text-4xl">
        <span class="ml-1 text-stone-500">{{ currency }}</span>
        <span class="font-medium">{{ price }}</span>
      </div>
    </header>
    <div class="p-6 border-t ">
      <div class="">
        <h2 class="mb-2 text-xl font-extralight">Last update</h2>
        <div class="text-xl">
          {{ updatedAt }}
        </div>
      </div>
      <div class="w-[1px] bg-stone-200" />
    </div>

    <main class="main relative border-t p-6 flex flex-col gap-8 bg-center">
      <FlickeringGrid
        class="absolute top-0 left-0 w-full h-full [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        color="#60A5FA"
        :grid-gap="2"
        :square-size="4"
      />
      <div class="step grid grid-cols-[50px_1fr]">
        <component
          class="size-8"
          :is="currentState?.icon"
          :style="{ color: currentState?.color }"
        />
        <div>
          <h2 class="text-xl">
            {{ currentState?.label }}
          </h2>
          <p>{{ updatedAt }}</p>
        </div>
      </div>
    </main>
    <div class="p-6 border-t">
      <div class="text-stone-500 ">
        <h2 class="mt-6 text-xl font-extralight">Notes</h2>
        <p class="text-sm">Invoice #{{ invoiceNo }}</p>
        <p class="text-sm">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
