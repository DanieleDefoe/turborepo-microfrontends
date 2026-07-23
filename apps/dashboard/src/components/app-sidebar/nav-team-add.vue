<script lang="ts" setup>
  import { useForm } from "@tanstack/vue-form";
  import { toast } from "vue-sonner";

  import { FieldDescription, FieldError } from "@/components/ui/field";
  import { FormItem } from "@/components/ui/form";
  import { Label } from "@/components/ui/label";

  import type { TeamAddValidator } from "./validators/team.validator";

  import { teamAddValidator } from "./validators/team.validator";

  const emits = defineEmits<{
    close: [];
  }>();

  const defaultValues: TeamAddValidator = {
    logo: "",
    name: "",
    slug: "",
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
        position: "top-center",
      });

      emits("close");
    },
    validators: {
      onBlur: teamAddValidator,
      onSubmit: teamAddValidator,
    },
  });
</script>

<template>
  <div>
    <UiDialogHeader>
      <UiDialogTitle> Add New Team </UiDialogTitle>
      <UiDialogDescription> Add a new team by your self. </UiDialogDescription>
    </UiDialogHeader>

    <form class="space-y-4" @submit.prevent="form.handleSubmit">
      <form.Field name="name">
        <template #default="{ field, state }">
          <FormItem>
            <Label
              class="data-[error=true]:text-destructive text-base"
              :data-error="!!state.meta.errors?.length"
            >
              Name
            </Label>
            <UiInput
              :model-value="field.state.value"
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
            <FieldDescription> Set the name for the team. </FieldDescription>
            <FieldError :errors="state.meta.errors" />
          </FormItem>
        </template>
      </form.Field>
      <form.Field name="slug">
        <template #default="{ field, state }">
          <FormItem>
            <Label
              class="data-[error=true]:text-destructive text-base"
              :data-error="!!state.meta.errors?.length"
            >
              Slug
            </Label>
            <UiInput
              :model-value="field.state.value"
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
            <FieldDescription> Set the slug for the team. </FieldDescription>
            <FieldError :errors="state.meta.errors" />
          </FormItem>
        </template>
      </form.Field>
      <form.Field name="logo">
        <template #default="{ field, state }">
          <FormItem>
            <Label
              class="data-[error=true]:text-destructive text-base"
              :data-error="!!state.meta.errors?.length"
            >
              Logo
            </Label>
            <UiInput
              :model-value="field.state.value"
              @blur="field.handleBlur"
              @input="field.handleChange($event.target.value)"
            />
            <FieldDescription> Set the logo of the team. </FieldDescription>
            <FieldError :errors="state.meta.errors" />
          </FormItem>
        </template>
      </form.Field>

      <div class="flex justify-start mt-4">
        <UiButton type="submit"> Add team </UiButton>
      </div>
    </form>
  </div>
</template>
