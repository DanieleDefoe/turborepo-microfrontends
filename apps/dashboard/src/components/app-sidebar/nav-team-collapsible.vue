<script lang="ts" setup>
  import { ChevronRightIcon, ExternalLinkIcon } from "@lucide/vue";

  import { useSidebar } from "@/components/ui/sidebar";
  import { isExternalUrl } from "@/utils/is-external-url";
  import MenuButton from "./menu-button.vue";
  import type { NavGroup, NavItem } from "./types";

  const { navMain } = defineProps<{
    navMain: NavGroup[];
  }>();

  const route = useRoute();
  const initialPath = route.path;

  const { state, isMobile } = useSidebar();

  function isCollapsed(menu: NavItem): boolean {
    if (menu.url === initialPath) {
      return true;
    }
    return !!menu.items?.some((item) => item.url === initialPath);
  }

  function isActive(menu: NavItem): boolean {
    const pathname = route.path;
    if (menu.url) {
      return pathname === menu.url;
    }
    return !!menu.items?.some((item) => item.url === pathname);
  }
</script>

<template>
  <UiSidebarGroup v-for="group in navMain" :key="group.title">
    <UiSidebarGroupLabel>{{ group.title }}</UiSidebarGroupLabel>
    <UiSidebarMenu>
      <template v-for="menu in group.items" :key="menu.title">
        <UiSidebarMenuItem v-if="!menu.items">
          <MenuButton
            :is-active="isActive(menu)"
            :is-external-url="isExternalUrl(menu.url)"
            :menu="menu as NavItem"
            :tooltip="menu.title"
          />
        </UiSidebarMenuItem>

        <UiSidebarMenuItem v-else>
          <!-- sidebar expanded -->
          <UiCollapsible
            as-child
            class="group/collapsible"
            v-if="state !== 'collapsed' || isMobile"
            :default-open="isCollapsed(menu)"
          >
            <UiSidebarMenuItem>
              <UiCollapsibleTrigger as-child>
                <UiSidebarMenuButton :tooltip="menu.title">
                  <component :is="menu.icon" v-if="menu.icon" />
                  <span>{{ menu.title }}</span>
                  <ChevronRightIcon
                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </UiSidebarMenuButton>
              </UiCollapsibleTrigger>
            </UiSidebarMenuItem>
            <UiCollapsibleContent>
              <UiSidebarMenuSub>
                <UiSidebarMenuSubItem
                  v-for="subItem in menu.items"
                  :key="subItem.title"
                >
                  <UiSidebarMenuSubButton
                    as-child
                    :is-active="isActive(subItem as NavItem)"
                  >
                    <a
                      class="flex items-center gap-2"
                      rel="noopener noreferrer"
                      target="_blank"
                      v-if="isExternalUrl(subItem?.url)"
                      :href="subItem?.url"
                    >
                      <component :is="subItem.icon" v-if="subItem.icon" />
                      <span>{{ subItem.title }}</span>
                      <ExternalLinkIcon class="w-4 h-4 ml-auto" />
                    </a>
                    <router-link v-else :to="subItem?.url || '/'">
                      <component :is="subItem.icon" v-if="subItem.icon" />
                      <span>{{ subItem.title }}</span>
                    </router-link>
                  </UiSidebarMenuSubButton>
                </UiSidebarMenuSubItem>
              </UiSidebarMenuSub>
            </UiCollapsibleContent>
          </UiCollapsible>

          <!-- sidebar collapsed -->
          <UiDropdownMenu v-else>
            <UiDropdownMenuTrigger as-child>
              <UiSidebarMenuButton :tooltip="menu.title">
                <component :is="menu.icon" v-if="menu.icon" />
                <span>{{ menu.title }}</span>
              </UiSidebarMenuButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start" side="right">
              <UiDropdownMenuLabel>{{ menu.title }}</UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                as-child
                v-for="subItem in menu.items"
                :key="subItem.title"
              >
                <MenuButton
                  :is-active="isActive(subItem as NavItem)"
                  :is-external-url="isExternalUrl(subItem?.url)"
                  :menu="subItem as NavItem"
                  :tooltip="subItem.title"
                />
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </UiSidebarMenuItem>
      </template>
    </UiSidebarMenu>
  </UiSidebarGroup>
</template>
