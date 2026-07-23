<script lang="ts" setup>
  import AuthTitle from "./components/auth-title.vue";
  import GitHubButton from "./components/github-button.vue";
  import GoogleButton from "./components/google-button.vue";
  import PrivacyPolicyButton from "./components/privacy-policy-button.vue";
  import TermsOfServiceButton from "./components/terms-of-service-button.vue";
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4 min-w-screen">
    <main class="flex flex-col gap-4">
      <AuthTitle />
      <UiCard class="max-w-sm mx-auto">
        <UiCardHeader>
          <UiCardTitle class="text-xl"> Sign Up </UiCardTitle>
          <UiCardDescription>
            Enter your email and password to create an account. Already have an
            account?
            <UiButton
              class="px-0 text-muted-foreground"
              variant="link"
              @click="$router.push('/auth/sign-in')"
            >
              Sign In
            </UiButton>
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <UiLabel for="first-name"> First name </UiLabel>
                <UiInput id="first-name" placeholder="Max" required />
              </div>
              <div class="grid gap-2">
                <UiLabel for="last-name"> Last name </UiLabel>
                <UiInput id="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div class="grid gap-2">
              <UiLabel for="email"> Email </UiLabel>
              <UiInput
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div class="grid gap-2">
              <UiLabel for="password"> Password </UiLabel>
              <UiInput id="password" placeholder="******" type="password" />
            </div>
            <div class="grid gap-2">
              <UiLabel for="password"> Confirm Password </UiLabel>
              <UiInput id="password" placeholder="******" type="password" />
            </div>
            <UiButton class="w-full" type="submit"> Create Account </UiButton>

            <UiSeparator label="Or continue with" />

            <div class="flex flex-col items-center justify-between gap-4">
              <GitHubButton />
              <GoogleButton />
            </div>

            <UiCardDescription>
              By creating an account, you agree to our
              <TermsOfServiceButton />
              and
              <PrivacyPolicyButton />
            </UiCardDescription>
          </div>
        </UiCardContent>
      </UiCard>
    </main>
  </div>
</template>
