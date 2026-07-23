<script lang="ts" setup>
  import { SendIcon } from "@lucide/vue";
  import { useForm } from "@tanstack/vue-form";
  import { toast } from "vue-sonner";

  import Button from "@/components/ui/button/Button.vue";
  import { FieldError } from "@/components/ui/field";
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
  import { Textarea } from "@/components/ui/textarea";

  import type { UserInviteValidator } from "../validators/user-invite.validator";

  import { userInviteValidator } from "../validators/user-invite.validator";

  const roles = ["superadmin", "admin", "cashier", "manager"] as const;

  const defaultValues: UserInviteValidator = {
    description: "",
    email: "",
    role: "cashier",
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
      onBlur: userInviteValidator,
      onSubmit: userInviteValidator,
    },
  });
</script>

<template>
  <form class="space-y-8" @submit.prevent="form.handleSubmit">
    <form.Field name="email">
      <template #default="{ field, state }">
        <FormItem>
          <Label
            class="data-[error=true]:text-destructive"
            :data-error="!!state.meta.errors?.length"
          >
            Email address
          </Label>
          <Input
            type="text"
            :model-value="field.state.value"
            @blur="field.handleBlur"
            @input="field.handleChange($event.target.value)"
          />
          <FieldError :errors="state.meta.errors" />
        </FormItem>
      </template>
    </form.Field>

    <form.Field name="role">
      <template #default="{ field, state }">
        <FormItem>
          <Label
            class="data-[error=true]:text-destructive"
            :data-error="!!state.meta.errors?.length"
          >
            Role
            <span class="text-destructive"> *</span>
          </Label>
          <Select
            :model-value="field.state.value"
            @update:model-value="(v: any) => {
              field.handleChange(v)
              field.handleBlur()
            }"
          >
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="role in roles" :key="role" :value="role">
                  {{ role }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError :errors="state.meta.errors" />
        </FormItem>
      </template>
    </form.Field>

    <form.Field name="description">
      <template #default="{ field, state }">
        <FormItem>
          <Label
            class="data-[error=true]:text-destructive"
            :data-error="!!state.meta.errors?.length"
          >
            Description(Optional)
          </Label>
          <Textarea
            :model-value="field.state.value"
            @blur="field.handleBlur"
            @input="field.handleChange($event.target.value)"
          />
          <FieldError :errors="state.meta.errors" />
        </FormItem>
      </template>
    </form.Field>

    <Button class="w-full" type="submit">
      Invite
      <SendIcon />
    </Button>
  </form>
</template>
