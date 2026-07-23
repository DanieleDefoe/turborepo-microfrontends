<script lang="ts" setup>
  import { toast } from "vue-sonner";
  import { Button } from "../button";
  import { Toaster } from ".";

  function notify() {
    toast.success("Event created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    });
  }
</script>

<template>
  <Stories title="UI/Sonner" :component="Toaster">
    <Story title="Default">
      <Button variant="outline" @click="notify">Show toast</Button>
      <Toaster />
    </Story>

    <Story title="Variants">
      <div class="flex flex-wrap gap-3">
        <Button
          variant="outline"
          @click="() => toast.success('Saved successfully')"
          >Success</Button
        >
        <Button
          variant="outline"
          @click="() => toast.error('Something went wrong')"
          >Error</Button
        >
        <Button variant="outline" @click="() => toast.info('Heads up')"
          >Info</Button
        >
        <Button
          variant="outline"
          @click="() => toast.warning('Careful with that')"
          >Warning</Button
        >
        <Toaster />
      </div>
    </Story>
  </Stories>
</template>
