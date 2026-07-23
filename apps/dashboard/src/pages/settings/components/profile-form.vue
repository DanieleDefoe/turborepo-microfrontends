<script lang="ts" setup>
  import { XIcon } from "@lucide/vue";
  import { useForm } from "@tanstack/vue-form";
  import { toast } from "vue-sonner";

  import { Button } from "@/components/ui/button";
  import { FieldDescription, FieldError } from "@/components/ui/field";
  import { FormItem } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Separator } from "@/components/ui/separator";
  import { Textarea } from "@/components/ui/textarea";
  import { cn } from "@/lib/utils";

  import type { ProfileValidator } from "../validators/profile.validator";

  import { profileValidator } from "../validators/profile.validator";

  const verifiedEmails = ["m@example.com", "m@google.com", "m@support.com"];

  const defaultValues: ProfileValidator = {
    bio: "I own a computer.",
    email: "",
    urls: [
      { value: "https://shadcn.com" },
      { value: "http://twitter.com/shadcn" },
    ],
    username: "",
  };

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      toast("You submitted the following values:", {
        description: h(
          "pre",
          { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
          h("code", { class: "text-white" }, JSON.stringify(value, null, 2))
        ),
      });
    },
    validators: {
      onBlur: profileValidator,
      onSubmit: profileValidator,
    },
  });
  function isInvalid(field: any) {
    return field.state.meta.isTouched && !field.state.meta.isValid;
  }
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">Profile</h3>
    <p class="text-sm text-muted-foreground">
      This is how others will see you on the site.
    </p>
  </div>
  <Separator class="my-4" orientation="horizontal" />
  <form class="space-y-8" @submit.prevent="form.handleSubmit">
    <form.Field name="username">
      <template #default="{ field, state }">
        <FormItem>
          <Label
            class="data-[error=true]:text-destructive"
            :data-error="!!state.meta.errors?.length"
          >
            Username
          </Label>
          <Input
            placeholder="shadcn"
            type="text"
            :model-value="field.state.value"
            @blur="field.handleBlur"
            @input="field.handleChange($event.target.value)"
          />
          <FieldDescription>
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </FieldDescription>
          <FieldError :errors="state.meta.errors" />
        </FormItem>
      </template>
    </form.Field>

    <form.Field name="email">
      <template #default="{ field, state }">
        <FormItem :data-invalid="isInvalid(field)">
          <Label
            class="data-[error=true]:text-destructive"
            :data-error="!!state.meta.errors?.length"
          >
            Email
          </Label>

          <Select
            :model-value="field.state.value"
            :name="field.name"
            @update:model-value="($event) => {
              field.handleChange($event as string),
              field.handleBlur()
            }"
          >
            <SelectTrigger :aria-invalid="isInvalid(field)">
              <SelectValue placeholder="Select an email" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="email in verifiedEmails"
                  :key="email"
                  :value="email"
                >
                  {{ email }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>
            You can manage verified email addresses in your email settings.
          </FieldDescription>
          <FieldError
            :data-invalid="isInvalid(field)"
            :errors="state.meta.errors"
          />
        </FormItem>
      </template>
    </form.Field>

    <form.Field name="bio">
      <template #default="{ field, state }">
        <FormItem>
          <Label
            class="data-[error=true]:text-destructive"
            :data-error="!!state.meta.errors?.length"
          >
            Bio
          </Label>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            :model-value="field.state.value"
            @blur="field.handleBlur"
            @input="field.handleChange($event.target.value)"
          />
          <FieldDescription>
            You can <span>@mention</span> other users and organizations to link
            to them.
          </FieldDescription>
          <FieldError :errors="state.meta.errors" />
        </FormItem>
      </template>
    </form.Field>

    <div>
      <form.Field mode="array" name="urls">
        <template #default="{ field, state }">
          <div
            class="mb-2"
            v-for="(_, index) in field.state.value"
            :key="`urls-${index}`"
          >
            <form.Field :name="`urls[${index}].value`">
              <template #default="{ field: subField, state: subState }">
                <FormItem>
                  <Label
                    class="data-[error=true]:text-destructive"
                    :class="cn(index !== 0 && 'sr-only')"
                    :data-error="!!subState.meta.errors?.length"
                  >
                    URLs
                  </Label>
                  <p
                    class="text-muted-foreground text-sm"
                    :class="cn(index !== 0 && 'sr-only')"
                  >
                    Add links to your website, blog, or social media profiles.
                  </p>
                  <div class="relative flex items-center">
                    <Input
                      type="url"
                      :model-value="subField.state.value"
                      @blur="subField.handleBlur"
                      @input="subField.handleChange($event.target.value)"
                    />
                    <button
                      class="absolute py-2 pe-3 end-0 text-muted-foreground"
                      type="button"
                      @click="field.removeValue(index)"
                    >
                      <XIcon class="w-3" />
                    </button>
                  </div>
                  <FieldError :errors="state.meta.errors" />
                </FormItem>
              </template>
            </form.Field>
          </div>

          <Button
            class="w-20 mt-2 text-xs"
            size="sm"
            type="button"
            variant="outline"
            @click="field.pushValue({ value: '' })"
          >
            Add URL
          </Button>
        </template>
      </form.Field>
    </div>

    <div class="flex justify-start gap-2">
      <Button type="submit"> Update profile </Button>

      <Button type="button" variant="outline" @click="form.reset()">
        Reset form
      </Button>
    </div>
  </form>
</template>
