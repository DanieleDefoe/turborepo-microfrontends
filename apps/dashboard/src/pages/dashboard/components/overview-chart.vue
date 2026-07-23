<script lang="ts" setup>
  import { VisArea, VisAxis, VisLine, VisXYContainer } from "@unovis/vue";

  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    ChartContainer,
    ChartCrosshair,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    componentToString,
  } from "@/components/ui/chart";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  import type { OverviewChartData } from "./overview-chart.data";

  import {
    chartConfig,
    chartData,
    overviewChartSvgDefs,
  } from "./overview-chart.data";

  const timeRange = shallowRef("90d");
  const filterRange = computed(() =>
    chartData.filter((item) => {
      const date = new Date(item.date);
      const referenceDate = new Date("2024-06-30");
      let daysToSubtract = 90;
      if (timeRange.value === "30d") {
        daysToSubtract = 30;
      } else if (timeRange.value === "7d") {
        daysToSubtract = 7;
      }
      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);
      return date >= startDate;
    })
  );
</script>

<template>
  <Card class="pt-0">
    <CardHeader
      class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row"
    >
      <div class="grid flex-1 gap-1">
        <CardTitle>Area Chart - Interactive</CardTitle>
        <CardDescription>
          Showing total visitors for the last 3 months
        </CardDescription>
      </div>
      <Select v-model="timeRange">
        <SelectTrigger
          aria-label="Select a value"
          class="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent class="rounded-xl">
          <SelectItem class="rounded-lg" value="90d">
            Last 3 months
          </SelectItem>
          <SelectItem class="rounded-lg" value="30d"> Last 30 days </SelectItem>
          <SelectItem class="rounded-lg" value="7d"> Last 7 days </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6 pb-4">
      <ChartContainer
        class="aspect-auto h-[250px] w-full"
        :config="chartConfig"
        :cursor="false"
      >
        <VisXYContainer
          :data="filterRange"
          :margin="{ left: -40 }"
          :svg-defs="overviewChartSvgDefs"
          :y-domain="[0, 1200]"
        >
          <VisArea
            :color="(_d: OverviewChartData, i: number) => ['url(#fillMobile)', 'url(#fillDesktop)'][i]"
            :opacity="0.6"
            :x="(d: OverviewChartData) => d.date"
            :y="[(d: OverviewChartData) => d.mobile, (d: OverviewChartData) => d.desktop]"
          />
          <VisLine
            :color="(_d: OverviewChartData, i: number) => [chartConfig.mobile.color, chartConfig.desktop.color][i]"
            :line-width="1"
            :x="(d: OverviewChartData) => d.date"
            :y="[(d: OverviewChartData) => d.mobile, (d: OverviewChartData) => d.mobile + d.desktop]"
          />
          <VisAxis
            type="x"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="(d: number, _index: number) => {
              const date = new Date(d)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            }"
            :tick-line="false"
            :x="(d: OverviewChartData) => d.date"
          />
          <VisAxis
            type="y"
            :domain-line="false"
            :num-ticks="3"
            :tick-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair
            :color="(_d: OverviewChartData, i: number) => [chartConfig.mobile.color, chartConfig.desktop.color][i % 2]"
            :template="componentToString(chartConfig, ChartTooltipContent, {
              labelFormatter: (d) => {
                return new Date(d).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              },
            })"
          />
        </VisXYContainer>

        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
