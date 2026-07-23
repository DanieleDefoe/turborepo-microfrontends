<script lang="ts" setup>
  import { useAuth } from "@/composables/use-auth";

  import GitHubButton from "./github-button.vue";
  import GoogleButton from "./google-button.vue";
  import PrivacyPolicyButton from "./privacy-policy-button.vue";
  import TermsOfServiceButton from "./terms-of-service-button.vue";
  import ToForgotPasswordLink from "./to-forgot-password-link.vue";

  const { login, loading } = useAuth();
</script>

<template>
  <UiCard class="w-full max-w-sm">
    <UiCardHeader>
      <UiCardTitle class="text-2xl"> Login </UiCardTitle>
      <UiCardDescription>
        Enter your email and password below to log into your account. Not have
        an account?
        <UiButton
          class="px-0 text-muted-foreground"
          variant="link"
          @click="$router.push('/auth/sign-up')"
        >
          Sign Up
        </UiButton>
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="grid gap-4">
      <div class="grid gap-2">
        <UiLabel for="email">
          {{ $t('email') }}
        </UiLabel>
        <UiInput id="email" placeholder="m@example.com" required type="email" />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center justify-between">
          <UiLabel for="password">
            {{ $t('password') }}
          </UiLabel>
          <ToForgotPasswordLink />
        </div>
        <UiInput
          id="password"
          placeholder="*********"
          required
          type="password"
        />
      </div>

      <UiButton class="w-full" @click="login">
        <UiSpinner class="mr-2" v-if="loading" />
        {{ $t('login') }}
      </UiButton>

      <UiSeparator label="Or continue with" />

      <div class="flex flex-col items-center justify-between gap-4">
        <GitHubButton />
        <GoogleButton />
      </div>

      <UiCardDescription>
        By clicking login, you agree to our
        <TermsOfServiceButton />
        and
        <PrivacyPolicyButton />
      </UiCardDescription>
    </UiCardContent>
  </UiCard>
</template>
