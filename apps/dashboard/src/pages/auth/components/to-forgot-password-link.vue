<script lang="ts" setup>
</script>

<template>
  <UiButton
    class="text-muted-foreground"
    variant="link"
    @click="$router.push('/auth/forgot-password')"
  >
    {{ $t('forgotPassword') }}
  </UiButton>
</template>
