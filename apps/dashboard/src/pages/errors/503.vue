<script lang="ts" setup>
  import Error from "@/components/custom-error.vue";
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Error
      error="The server is currently unable to handle the request due to a temporary overloading or maintenance of the server."
      subtitle="Service Unavailable"
      :code="503"
    />
  </div>
</template>

<route lang="yaml"> meta: layout: blank </route>
