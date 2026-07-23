<script lang="ts" setup>
  import { useForm } from "@tanstack/vue-form";
  import { toast } from "vue-sonner";

  import { FieldError } from "@/components/ui/field";
  import { FormItem } from "@/components/ui/form";
  import { Label } from "@/components/ui/label";
  import { labels, priorities, statuses } from "../data/data";
  import type { Task } from "../data/schema";
  import type { TaskValidator } from "../validators/task.validator";
  import { taskValidator } from "../validators/task.validator";

  const props = defineProps<{
    task: Task | null;
  }>();
  const emits = defineEmits<{
    close: [];
  }>();

  function getInitialValues(task: Task | null): TaskValidator {
    return {
      label: task ? task.label : "feature",
      priority: task ? task.priority : "medium",
      status: task ? task.status : "backlog",
      title: task ? task.title : "",
    };
  }

  const form = useForm({
    defaultValues: getInitialValues(props.task),
    onSubmit: ({ value }) => {
      toast("You submitted the following values:", {
        description: h(
          "pre",
          { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
          h("code", { class: "text-white" }, JSON.stringify(value, null, 2))
        ),
      });
      emits("close");
    },
    validators: {
      onBlur: taskValidator,
      onSubmit: taskValidator,
    },
  });

  watch(
    () => props.task,
    (task) => {
      form.reset(getInitialValues(task), { keepDefaultValues: true });
    }
  );
</script>

<template>
  <div>
    <form class="w-2/3 space-y-6" @submit.prevent="form.handleSubmit">
      <form.Field name="title">
        <template #default="{ field, state }">
          <FormItem>
            <Label>Title</Label>
            <UiInput
              placeholder="shadcn"
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
            <Label>status</Label>
            <UiSelect
              :model-value="field.state.value"
              @update:model-value="(v) => field.handleChange(v as string)"
            >
              <UiSelectTrigger class="w-[180px]">
                <UiSelectValue placeholder="Select a status" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem
                    v-for="status in statuses"
                    :key="status.value"
                    :value="status.value"
                  >
                    <div class="flex items-center gap-2">
                      <component class="size-4 shrink-0" :is="status.icon" />
                      {{ status.label }}
                    </div>
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
            <FieldError :errors="state.meta.errors" />
          </FormItem>
        </template>
      </form.Field>

      <form.Field name="label">
        <template #default="{ field, state }">
          <FormItem>
            <Label>label</Label>
            <UiRadioGroup
              class="flex flex-col space-y-1"
              :model-value="field.state.value"
              @update:model-value="(v) => field.handleChange(v as string)"
            >
              <FormItem
                class="flex items-center space-y-0 gap-x-3"
                v-for="label in labels"
                :key="label.value"
              >
                <UiRadioGroupItem :value="label.value" />
                <Label class="font-normal">
                  {{ label.label }}
                </Label>
              </FormItem>
            </UiRadioGroup>
            <FieldError :errors="state.meta.errors" />
          </FormItem>
        </template>
      </form.Field>
      <form.Field name="priority">
        <template #default="{ field, state }">
          <FormItem>
            <Label>priority</Label>
            <UiRadioGroup
              class="flex flex-col space-y-1"
              :model-value="field.state.value"
              @update:model-value="(v) => field.handleChange(v as string)"
            >
              <FormItem
                class="flex items-center space-y-0 gap-x-3"
                v-for="priority in priorities"
                :key="priority.value"
              >
                <UiRadioGroupItem :value="priority.value" />
                <Label class="font-normal">
                  {{ priority.label }}
                </Label>
              </FormItem>
            </UiRadioGroup>
            <FieldError :errors="state.meta.errors" />
          </FormItem>
        </template>
      </form.Field>

      <UiButton type="submit"> Submit </UiButton>
    </form>
  </div>
</template>
