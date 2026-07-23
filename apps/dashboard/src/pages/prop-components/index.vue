<script lang="ts" setup>
  import {
    ArrowUpRightIcon,
    BadgeCheckIcon,
    ChevronRightIcon,
  } from "@lucide/vue";

  import { BasicPage } from "@/components/global-layout";
  import { Button } from "@/components/ui/button";
  import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
  } from "@/components/ui/item";

  const components = [
    {
      description:
        "Copy button component, supports custom styles and tooltip text.",
      link: "https://kit.prop.show/en/components/copy",
      title: "Copy",
    },
    {
      description: "",
      link: "https://kit.prop.show/en/components/full-screen-dialog",
      title: "Full Screen Dialog",
    },
    {
      description:
        "Inline tip component, used to display different types of tip information.",
      link: "https://kit.prop.show/en/components/inline-tip",
      title: "Inline Tip",
    },
    {
      description: "",
      link: "https://kit.prop.show/en/components/status-badge",
      title: "Status Badge",
    },
  ];
</script>

<template>
  <BasicPage
    description="A collection of extended components for shadcn-vue."
    sticky
    title="Prop Components"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
      <Item
        variant="outline"
        v-for="component in components"
        :key="component.title"
      >
        <ItemContent>
          <ItemTitle>{{ component.title }}</ItemTitle>
          <ItemDescription>
            {{ component.description }}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button as-child size="sm" variant="outline">
            <a
              class="flex items-center gap-2"
              rel="noopener noreferrer"
              target="_blank"
              :href="component.link"
            >
              Docs
              <ArrowUpRightIcon />
            </a>
          </Button>
        </ItemActions>
      </Item>

      <Item as-child size="sm" variant="outline">
        <a
          href="https://kit.prop.show/en"
          rel="noopener noreferrer"
          target="_blank"
        >
          <ItemMedia>
            <BadgeCheckIcon class="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>More components from kit.prop.show</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon class="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  </BasicPage>
</template>
