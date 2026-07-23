<script lang="ts" setup>
  import { LoaderIcon } from "@lucide/vue";

  import { BasicPage } from "@/components/global-layout";

  import { columns } from "./components/columns";
  import DataTable from "./components/data-table.vue";
  import UserCreate from "./components/user-create.vue";
  import UserInvite from "./components/user-invite.vue";
  import { users } from "./data/users";

  const loading = shallowRef(false);

  function mockLoading() {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }
</script>

<template>
  <BasicPage description="Users description" sticky title="Users">
    <template #actions>
      <UserInvite />
      <UserCreate />
      <UiButton variant="outline" @click="mockLoading">
        <LoaderIcon />Mock Loading
      </UiButton>
    </template>
    <div class="overflow-x-auto">
      <DataTable :columns="columns" :data="users" :loading />
    </div>
  </BasicPage>
</template>
