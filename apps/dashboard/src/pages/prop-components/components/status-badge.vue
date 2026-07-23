<script lang="ts" setup>
  import { Status, StatusBadge } from "@/components/prop-ui/status-badge";
</script>

<template>
  <section>
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
      StatusBadge
    </h4>
    <blockquote class="my-2 border-l-2 pl-6 italic">
      Source code in
      <code
        class="relative rounded bg-muted px-1 py-1 font-mono text-sm font-semibold"
      >
        src/components/prop-ui/status-badge
      </code>
    </blockquote>

    <h5 class="scroll-m-20 font-semibold tracking-tight my-1">
      Use Status only
    </h5>
    <div class="flex flex-col gap-2 flex-wrap">
      <div class="flex items-center gap-2">
        <Status rounded="xs" />
        <Status color="red" rounded="xs" />
        <Status color="blue" rounded="xs" />
        <Status color="gray" rounded="xs" />
        <Status color="orange" rounded="xs" />
        <Status color="purple" rounded="xs" />
      </div>

      <h5 class="scroll-m-20 font-semibold tracking-tight my-1">
        Use StatusBadge
      </h5>
      <div class="flex items-center gap-2 flex-wrap">
        <StatusBadge rounded="xs" variant="outline"> Green </StatusBadge>
        <StatusBadge color="red" rounded="xs" variant="outline">
          Red
        </StatusBadge>
        <StatusBadge color="blue" rounded="xs" variant="outline">
          Blue
        </StatusBadge>
        <StatusBadge color="gray" rounded="xs" variant="outline">
          Gray
        </StatusBadge>
        <StatusBadge color="orange" rounded="xs" variant="outline">
          Orange
        </StatusBadge>
        <StatusBadge color="purple" rounded="xs" variant="outline">
          Purple
        </StatusBadge>
      </div>
    </div>
  </section>
</template>
