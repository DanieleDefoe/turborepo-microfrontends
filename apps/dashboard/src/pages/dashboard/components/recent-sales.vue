<script lang="ts" setup>
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

  interface User {
    amount: string;
    avatar: string;
    email: string;
    name: string;
  }

  const list = ref<User[]>([
    {
      amount: "$1,999.00",
      avatar: "",
      email: "olivia.martin@email.com",
      name: "Olivia Martin",
    },
    {
      amount: "$39.00",
      avatar: "",
      email: "jackson.lee@email.com",
      name: "Jackson Lee",
    },
    {
      amount: "$299.00",
      avatar: "",
      email: "isabella.nguyen@email.com",
      name: "Isabella Nguyen",
    },
    {
      amount: "$99.00",
      avatar: "",
      email: "will@email.com",
      name: "William Kim",
    },
    {
      amount: "$39.00",
      avatar: "",
      email: "sofia.davis@email.com",
      name: "Sofia Davis",
    },
  ]);
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center gap-4" v-for="item in list" :key="item.name">
      <Avatar class-name="h-9 w-9">
        <AvatarImage alt="Avatar" :src="item.avatar" />
        <AvatarFallback>{{ item.name[0].toUpperCase() }}</AvatarFallback>
      </Avatar>
      <div class="flex flex-wrap items-center justify-between flex-1">
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ item.name }}
          </p>
          <p class="text-sm text-muted-foreground">
            {{ item.email }}
          </p>
        </div>
        <div class="font-medium">
          {{ item.amount }}
        </div>
      </div>
    </div>
  </div>
</template>
