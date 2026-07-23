<script lang="ts" setup>
  import { VisuallyHidden } from "reka-ui";

  import {
    ModalDescription,
    ModalHeader,
    ModalTitle,
  } from "@/components/prop-ui/modal";
  import TransactionCard from "../transaction-card/index.vue";
  import type { Billing } from "./data/schema";

  defineProps<{
    billing: Billing;
  }>();
</script>

<template>
  <div>
    <ModalHeader>
      <VisuallyHidden as-child>
        <ModalTitle />
      </VisuallyHidden>
      <VisuallyHidden as-child>
        <ModalDescription :aria-describedby="undefined" />
      </VisuallyHidden>
    </ModalHeader>

    <TransactionCard
      currency="$"
      :card-no="billing.id"
      :description="billing.description"
      :invoice-no="`${billing.id}`"
      :order-id="billing.orderId || ''"
      :price="billing.amount"
      :state="billing.status"
      :updated-at="billing.date"
    />
  </div>
</template>
