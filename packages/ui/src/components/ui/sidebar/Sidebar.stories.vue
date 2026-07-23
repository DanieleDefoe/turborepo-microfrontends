<script setup lang="ts">
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
} from '.'
</script>

<template>
  <Stories title="UI/Sidebar" :component="Sidebar">
    <Story title="Default">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader class="p-2 text-sm font-semibold">Acme Inc</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Home</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Inbox</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Settings</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter class="text-muted-foreground p-2 text-xs">v1.0.0</SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header class="flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <span class="text-sm font-medium">Dashboard</span>
          </header>
          <main class="p-4 text-sm">Content area</main>
        </SidebarInset>
      </SidebarProvider>
    </Story>
  </Stories>
</template>
