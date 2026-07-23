<script lang="ts" setup>
  import { useForm } from "@tanstack/vue-form";
  import { toast } from "vue-sonner";

  import { Button } from "@/components/ui/button";
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

  import type { User } from "../data/schema";
  import type { UserValidator } from "../validators/user.validator";

  import { userValidator } from "../validators/user.validator";

  const props = defineProps<{
    user?: User;
  }>();

  const emits = defineEmits<{
    close: [];
  }>();

  const roles = ["superadmin", "admin", "cashier", "manager"] as const;
  const status = ["active", "inactive", "invited", "suspended"] as const;

  function getInitialValues(user?: User): UserValidator {
    return {
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role || "cashier",
      status: user?.status || "active",
      username: user?.username || "",
    };
  }

  const form = useForm({
    defaultValues: getInitialValues(props.user),
    onSubmit: ({ value }) => {
      const submitUser = props.user ? { ...value, id: props.user.id } : value;
      toast("You submitted the following values:", {
        description: h(
          "pre",
          { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
          h(
            "code",
            { class: "text-white" },
            JSON.stringify(submitUser, null, 2)
          )
        ),
      });

      emits("close");
    },
    validators: {
      onBlur: userValidator,
      onSubmit: userValidator,
    },
  });

  watch(
    () => props.user,
    (user) => {
      form.reset(getInitialValues(user), { keepDefaultValues: true });
    }
  );
</script>

<template>
  <div class="max-h-[500px] overflow-y-auto">
    <form class="space-y-8" @submit.prevent="form.handleSubmit">
      <form.Field name="firstName">
        <template #default="{ field, state }">
          <FormItem>
            <Label
              class="data-[error=true]:text-destructive"
              :data-error="!!state.meta.errors?.length"
            >
              First Name
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
      <form.Field name="lastName">
        <template #default="{ field, state }">
          <FormItem>
            <Label
              class="data-[error=true]:text-destructive"
              :data-error="!!state.meta.errors?.length"
            >
              Last Name
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
      <form.Field name="username">
        <template #default="{ field, state }">
          <FormItem>
            <Label
              class="data-[error=true]:text-destructive"
              :data-error="!!state.meta.errors?.length"
            >
              User Name
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

      <form.Field name="phoneNumber">
        <template #default="{ field, state }">
          <FormItem>
            <Label
              class="data-[error=true]:text-destructive"
              :data-error="!!state.meta.errors?.length"
            >
              Phone Number
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

      <form.Field name="status">
        <template #default="{ field, state }">
          <FormItem>
            <Label
              class="data-[error=true]:text-destructive"
              :data-error="!!state.meta.errors?.length"
            >
              Status
            </Label>
            <Select
              :model-value="field.state.value"
              @update:model-value="(v:any) => {
                field.handleChange(v)
                field.handleBlur()
              }"
            >
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="st in status" :key="st" :value="st">
                    {{ st }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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

      <Button class="w-full" type="submit"> SaveChanges </Button>
    </form>
  </div>
</template>
