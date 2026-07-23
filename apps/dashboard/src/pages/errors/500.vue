<script lang="ts" setup>
  import Error from "@/components/custom-error.vue";
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Error
      error="The server encountered an unexpected condition which prevented it from fulfilling the request."
      subtitle="Internal Server Error"
      :code="500"
    />
  </div>
</template>

<route lang="yaml"> meta: layout: blank </route>
