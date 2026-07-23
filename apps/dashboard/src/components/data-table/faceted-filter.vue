<script generic="T" lang="ts" setup>
  import { CheckIcon, CirclePlusIcon } from "@lucide/vue";
  import type { Column } from "@tanstack/vue-table";

  import { cn } from "@/lib/utils";

  import type { FacetedFilterOption } from "./types";

  interface DataTableFacetedFilter {
    column?: Column<T, any>;
    options: FacetedFilterOption[];
    title?: string;
  }

  const props = defineProps<DataTableFacetedFilter>();

  const facets = computed(() => props.column?.getFacetedUniqueValues());
  const selectedValues = computed(
    () => new Set(props.column?.getFilterValue() as string[])
  );
  const filterFunction = (
    list: DataTableFacetedFilter["options"],
    term: string
  ) => list.filter((i) => i.label.toLowerCase()?.includes(term));
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton class="h-8 border-dashed" size="sm" variant="outline">
        <CirclePlusIcon class="size-4 mr-2" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <UiSeparator class="h-4 mx-2" orientation="vertical" />
          <UiBadge
            class="px-1 font-normal rounded-sm lg:hidden"
            variant="secondary"
          >
            {{ selectedValues.size }}
          </UiBadge>
          <div class="hidden space-x-1 lg:flex">
            <UiBadge
              class="px-1 font-normal rounded-sm"
              variant="secondary"
              v-if="selectedValues.size > 2"
            >
              {{ selectedValues.size }}
              selected
            </UiBadge>

            <template v-else>
              <UiBadge
                class="px-1 font-normal rounded-sm"
                variant="secondary"
                v-for="option in options
                  .filter((option) => selectedValues.has(option.value))"
                :key="option.value"
              >
                {{ option.label }}
              </UiBadge>
            </template>
          </div>
        </template>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent align="start" class="w-[200px] p-0">
      <UiCommand :filter-function="filterFunction as unknown as any">
        <UiCommandInput :placeholder="title" />
        <UiCommandList>
          <UiCommandEmpty>No results found.</UiCommandEmpty>
          <UiCommandGroup>
            <UiCommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="(_e) => {
                const isSelected = selectedValues.has(option.value)
                if (isSelected) {
                  selectedValues.delete(option.value)
                }
                else {
                  selectedValues.add(option.value)
                }
                const filterValues = Array.from(selectedValues)
                column?.setFilterValue(
                  filterValues.length ? filterValues : undefined,
                )
              }"
            >
              <div
                :class="cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  selectedValues.has(option.value)
                    ? 'bg-primary'
                    : 'opacity-50 [&_svg]:invisible',
                )"
              >
                <CheckIcon
                  :class="cn('h-4 w-4', selectedValues.has(option.value) ? 'text-primary-foreground' : '')"
                />
              </div>
              <component
                class="size-4 mr-2 text-muted-foreground"
                :is="option.icon"
                v-if="option.icon"
              />
              <span>{{ option.label }}</span>
              <span
                class="flex items-center justify-center size-4 ml-auto font-mono text-xs"
                v-if="facets?.get(option.value)"
              >
                {{ facets.get(option.value) }}
              </span>
            </UiCommandItem>
          </UiCommandGroup>

          <template v-if="selectedValues.size > 0">
            <UiCommandSeparator />
            <UiCommandGroup>
              <UiCommandItem
                class="justify-center text-center"
                :value="{ label: 'Clear filters' }"
                @select="column?.setFilterValue(undefined)"
              >
                Clear filters
              </UiCommandItem>
            </UiCommandGroup>
          </template>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>
