<script lang="ts" setup>
  import Error from "@/components/custom-error.vue";
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Error
      error="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      subtitle="Page Not Found"
      :code="404"
    />
  </div>
</template>

<route lang="yaml"> meta: layout: blank </route>
