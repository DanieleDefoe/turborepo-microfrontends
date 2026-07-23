<script lang="ts" setup>
  import { BadgeCheckIcon } from "@lucide/vue";

  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  interface Props {
    active?: boolean;

    billingCycle?: string;
    billingPeriod?: string;
    buttonLabel: string;
    description: string;
    discount?: number;

    features: string[];

    price: number;
    title: string;
  }
  defineProps<Props>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        <h2>{{ title }}</h2>
      </CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div class="flex items-center gap-1 mb-2 text-xs">
        <span class="text-xl line-through text-muted-foreground" v-if="discount"
          >${{ discount }}</span
        >
        <span class="text-3xl font-bold text-primary">${{ price }}</span>
        <div class="text-muted-foreground">
          <span>/</span>
          <span>{{ billingCycle }}</span>
        </div>
      </div>
      <div
        class="flex items-center gap-3 mb-2 text-muted-foreground"
        v-for="(feature, index) in features"
        :key="feature + index"
      >
        <BadgeCheckIcon class="size-5 text-primary" />
        {{ feature }}
      </div>
    </CardContent>

    <CardFooter>
      <Button class="w-full" :variant="!active ? 'default' : 'secondary'">
        {{ buttonLabel }}
      </Button>
    </CardFooter>
  </Card>
</template>
