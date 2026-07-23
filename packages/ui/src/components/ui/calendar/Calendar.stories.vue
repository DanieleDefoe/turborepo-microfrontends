<script lang="ts" setup>
  import { Calendar } from ".";
</script>

<template>
  <Stories title="UI/Calendar" :component="Calendar">
    <Story title="Default">
      <Calendar class="w-fit rounded-lg border" />
    </Story>

    <Story title="Month And Year Dropdowns">
      <Calendar class="w-fit rounded-lg border" layout="month-and-year" />
    </Story>
  </Stories>
</template>
