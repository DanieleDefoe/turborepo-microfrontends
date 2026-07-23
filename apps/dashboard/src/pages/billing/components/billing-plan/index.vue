<script lang="ts" setup>
  import PlanCard from "./plan-card.vue";

  const plans = [
    {
      active: true,
      billingCycle: "month",
      buttonLabel: "Current Plan",
      description:
        "Get started with the free plan and explore all the features.",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      price: 0,
      title: "Free",
    },
    {
      billingCycle: "month",
      buttonLabel: "Switch to this plan",
      description: "Start growing your business with our small business plan.",
      discount: 49.99,
      features: ["Every free plan feature", "10 users", "10G storage"],
      price: 19.99,
      title: "Small Business",
    },
    {
      billingCycle: "month",
      buttonLabel: "Switch to this plan",
      description: "Get the best of everything with our enterprise plan.",
      discount: 499.99,
      features: [
        "Every small business plan feature",
        "Unlimited users",
        "Unlimited storage",
      ],
      price: 199.99,
      title: "Enterprise",
    },
  ];
</script>

<template>
  <div class="p-2 rounded-md bg-secondary">
    <div class="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
      <PlanCard
        v-for="(plan, index) in plans"
        :key="index"
        :active="plan.active"
        :billing-cycle="plan.billingCycle"
        :button-label="plan.buttonLabel"
        :description="plan.description"
        :discount="plan.discount"
        :features="plan.features"
        :price="plan.price"
        :title="plan.title"
      />
    </div>
  </div>
</template>
