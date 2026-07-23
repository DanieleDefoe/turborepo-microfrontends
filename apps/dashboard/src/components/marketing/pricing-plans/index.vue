<script lang="ts" setup>
  import { Icon } from "@iconify/vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();

  interface Plan {
    badge?: string;
    billing?: {
      cycle: string;
      period: string;
    };
    description: string;
    discount: string;
    features: string[];
    id: string | number;
    price: string;
    recommendation?: boolean;
    title: string;
    unit: string;
  }

  const plans = computed<Plan[]>(() => [
    {
      billing: {
        cycle: t("marketing.pricingPlans.hobby.billing.cycle"),
        period: t("marketing.pricingPlans.hobby.billing.period"),
      },
      description: t("marketing.pricingPlans.hobby.description"),
      discount: t("marketing.pricingPlans.hobby.discount"),
      features: [
        t("marketing.pricingPlans.hobby.features.feature1"),
        t("marketing.pricingPlans.hobby.features.feature2"),
        t("marketing.pricingPlans.hobby.features.feature3"),
        t("marketing.pricingPlans.hobby.features.feature4"),
      ],
      id: 1,
      price: t("marketing.pricingPlans.hobby.price"),
      title: t("marketing.pricingPlans.hobby.title"),
      unit: t("marketing.pricingPlans.hobby.unit"),
    },
    {
      billing: {
        cycle: t("marketing.pricingPlans.starter.billing.cycle"),
        period: t("marketing.pricingPlans.starter.billing.period"),
      },
      description: t("marketing.pricingPlans.starter.description"),
      discount: t("marketing.pricingPlans.starter.discount"),
      features: [
        t("marketing.pricingPlans.starter.features.feature1"),
        t("marketing.pricingPlans.starter.features.feature2"),
        t("marketing.pricingPlans.starter.features.feature3"),
        t("marketing.pricingPlans.starter.features.feature4"),
        t("marketing.pricingPlans.starter.features.feature5"),
      ],
      id: 2,
      price: t("marketing.pricingPlans.starter.price"),
      recommendation: true,
      title: t("marketing.pricingPlans.starter.title"),
      unit: t("marketing.pricingPlans.starter.unit"),
    },
    {
      billing: {
        cycle: t("marketing.pricingPlans.business.billing.cycle"),
        period: t("marketing.pricingPlans.business.billing.period"),
      },
      description: t("marketing.pricingPlans.business.description"),
      discount: t("marketing.pricingPlans.business.discount"),
      features: [
        t("marketing.pricingPlans.business.features.feature1"),
        t("marketing.pricingPlans.business.features.feature2"),
        t("marketing.pricingPlans.business.features.feature3"),
        t("marketing.pricingPlans.business.features.feature4"),
        t("marketing.pricingPlans.business.features.feature5"),
        t("marketing.pricingPlans.business.features.feature6"),
      ],
      id: 3,
      price: t("marketing.pricingPlans.business.price"),
      title: t("marketing.pricingPlans.business.title"),
      unit: t("marketing.pricingPlans.business.unit"),
    },
  ]);
</script>

<template>
  <div id="pricing-plans">
    <h2 class="text-center font-black my-4 text-4xl">
      {{ $t('marketing.pricingPlans.title') }}
    </h2>
    <h4 class="text-center text-xl">
      {{ $t('marketing.pricingPlans.subtitle') }}
    </h4>
    <div
      class="flex flex-col lg:flex-row lg:items-start items-center justify-center gap-4 mt-8"
    >
      <UiCard
        class="w-full lg:w-1/5"
        v-for="plan in plans"
        :key="plan.id"
        :class="{
          'border-2 border-primary bg-primary/10':
            plan.recommendation,
        }"
      >
        <h3 class="text-xl font-black text-center">
          {{ plan.title }}
        </h3>
        <div class="text-sm text-center text-neutral-400">
          {{ plan.description }}
        </div>

        <div class="flex items-top my-2 justify-center">
          <div class="text-2xl font-black">
            {{ plan.unit }}
            <span class="text-4xl">{{ plan.price }}</span>
          </div>
          <div
            class="text-sm font-bold line-through text-neutral-400"
            v-if="plan.discount"
          >
            {{ plan.unit }}{{ plan.discount }}
          </div>
        </div>

        <div class="text-sm mb-4 text-center">
          <ul>
            <li class="mb-1" v-for="feature in plan.features" :key="feature">
              <Icon class="inline-block" icon="carbon:checkmark" />
              {{ feature }}
            </li>
          </ul>
        </div>
        <div class="flex justify-center mx-8">
          <UiButton block>
            {{ $t('marketing.pricingPlans.buy') }}
          </UiButton>
        </div>
      </UiCard>
    </div>
  </div>
</template>
