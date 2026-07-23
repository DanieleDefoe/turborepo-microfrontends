<script lang="ts" setup>
  import { sidebarData } from "./data/sidebar-data";
  import NavFooter from "./nav-footer.vue";
  import NavTeam from "./nav-team.vue";
  import TeamSwitcher from "./team-switcher.vue";
</script>

<template>
  <UiSidebar class="z-50" collapsible="icon">
    <UiSidebarHeader>
      <TeamSwitcher :teams="sidebarData.teams" />
    </UiSidebarHeader>

    <UiSidebarContent>
      <NavTeam :nav-main="sidebarData.navMain" />
    </UiSidebarContent>

    <UiSidebarFooter>
      <NavFooter :user="sidebarData.user" />
    </UiSidebarFooter>

    <UiSidebarRail />
  </UiSidebar>
</template>
