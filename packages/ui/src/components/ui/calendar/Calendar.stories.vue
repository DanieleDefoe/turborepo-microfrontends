<script setup lang="ts">
import { Calendar } from '.'
</script>

<template>
  <Stories title="UI/Calendar" :component="Calendar">
    <Story title="Default">
      <Calendar class="w-fit rounded-lg border" />
    </Story>

    <Story title="Month And Year Dropdowns">
      <Calendar layout="month-and-year" class="w-fit rounded-lg border" />
    </Story>
  </Stories>
</template>
