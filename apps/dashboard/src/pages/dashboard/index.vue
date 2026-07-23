<script lang="ts" setup>
  import { toast } from "vue-sonner";

  import { BasicPage } from "@/components/global-layout";
  import { Button } from "@/components/ui/button";

  import OverviewContent from "./components/overview-content.vue";

  const tabs = [
    { name: "Overview", value: "overview" },
    { disabled: true, name: "Analytics", value: "analytics" },
    { disabled: true, name: "Reports", value: "reports" },
    { disabled: true, name: "Notifications", value: "notifications" },
  ];

  const defaultTab = tabs[0].value;
</script>

<template>
  <BasicPage description="workspace description" sticky title="workspace">
    <template #actions>
      <Button
        @click="() => toast('hello', {
          position: 'top-center',
        })"
      >
        {{ $t('download') }}
      </Button>
    </template>

    <UiTabs class="w-full" :default-value="defaultTab">
      <UiTabsList>
        <UiTabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :disabled="tab.disabled"
          :value="tab.value"
        >
          {{ tab.name }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent class="space-y-4" value="overview">
        <OverviewContent />
      </UiTabsContent>
    </UiTabs>
  </BasicPage>
</template>
