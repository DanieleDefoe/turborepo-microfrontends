<script lang="ts" setup>
  import { BasicPage } from "@/components/global-layout";
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

  interface ISocialMediaAccount {
    desc: string;
    title: string;
    url: string;
  }

  const socialMediaAccounts = ref<ISocialMediaAccount[]>([
    {
      desc: " The source code of Shadcn UI is publicly available on GitHub.",
      title: "GitHub",
      url: "https://github.com/Whbbit1999/shadcn-vue-admin",
    },
    {
      desc: "Join our Discord server to ask questions, share your projects, and get involved in the community.",
      title: "Discord",
      url: "",
    },
    {
      desc: "在哔哩哔哩上找到我们",
      title: "Bilibili",
      url: "https://space.bilibili.com/104376935",
    },
  ]);
</script>

<template>
  <BasicPage description="Help Center description" title="Help Center">
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can find answers to your questions in our help center.
      </AlertDescription>
    </Alert>

    <ul class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="account in socialMediaAccounts" :key="account.title">
        <a
          class="block p-4 border rounded-lg shadow-sm bg-background border-border"
          rel="noopener noreferrer"
          target="_blank"
          :href="account.url || '#'"
        >
          <h2 class="mb-2 text-lg font-bold">
            {{ account.title }}
          </h2>
          <p class="text-sm text-stone-500">
            {{ account.desc }}
          </p>
        </a>
      </li>
    </ul>
  </BasicPage>
</template>
