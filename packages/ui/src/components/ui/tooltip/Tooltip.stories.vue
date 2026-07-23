<script lang="ts" setup>
  import { Button } from "../button";
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from ".";
</script>

<template>
  <Stories title="UI/Tooltip" :component="Tooltip">
    <Story title="Default">
      <TooltipProvider :delay-duration="0">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Story>
  </Stories>
</template>
