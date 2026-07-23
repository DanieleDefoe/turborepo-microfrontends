<script lang="ts" setup>
  import { Button } from "@ap/ui/components/button";
  import { Separator } from "@ap/ui/components/separator";
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
  } from "@ap/ui/components/sidebar";
  import { useRoute, useRouter } from "vue-router";
  import { useAuth } from "./auth";

  const route = useRoute();
  const router = useRouter();
  const auth = useAuth();

  const nav = [
    { title: "Home", to: "/" },
    { title: "User Portal", to: "/portal" },
    { title: "Portal Settings", to: "/portal/settings" },
    { title: "Web Editor", to: "/editor" },
    { title: "Documents", to: "/editor/documents" },
  ];

  async function signOut() {
    auth.logout();
    await router.push("/login");
  }
</script>

<template>
  <router-view v-if="route.meta.public" />
  <SidebarProvider v-else>
    <Sidebar>
      <SidebarHeader class="p-2 font-semibold text-sm"
        >AP Console</SidebarHeader
      >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in nav" :key="item.to">
                <SidebarMenuButton as-child :is-active="route.path === item.to">
                  <router-link :to="item.to">{{ item.title }}</router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter class="p-2 text-muted-foreground text-xs">
        {{ auth.user.value?.username }}
      </SidebarFooter>
    </Sidebar>
    <SidebarInset>
      <header class="flex h-12 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator class="h-4" orientation="vertical" />
        <span class="font-medium text-sm">Microfrontends Example</span>
        <Button class="ml-auto" size="sm" variant="ghost" @click="signOut">
          Sign out
        </Button>
      </header>
      <main class="flex-1 p-4">
        <router-view />
      </main>
      <footer class="border-t px-4 py-2 text-muted-foreground text-xs">
        shell · user-portal · web-editor — powered by @module-federation/vite
      </footer>
    </SidebarInset>
  </SidebarProvider>
</template>
