<script lang="ts" setup>
  import {
    BasicPage,
    TwoColAside,
    TwoColLayout,
  } from "@/components/global-layout";
  import { settingsNavItems } from "@/constants/sidebar-data";
</script>

<template>
  <BasicPage description="Manage your store settings." title="Settings">
    <TwoColLayout>
      <template #aside>
        <TwoColAside :nav="settingsNavItems" />
      </template>

      <slot />
    </TwoColLayout>
  </BasicPage>
</template>
