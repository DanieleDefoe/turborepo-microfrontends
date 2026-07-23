<script lang="ts" setup>
  import Error from "@/components/custom-error.vue";
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Error
      error="You are not authorized to access this page."
      subtitle="Unauthorized"
      :code="401"
    />
  </div>
</template>

<route lang="yaml"> meta: layout: blank </route>
