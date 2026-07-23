<script lang="ts" setup>
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@ap/ui/components/table";

  const documents = [
    { id: 1, title: "Quarterly report", updated: "2026-07-20" },
    { id: 2, title: "Design notes", updated: "2026-07-18" },
    { id: 3, title: "Meeting minutes", updated: "2026-07-12" },
  ];
</script>

<template>
  <section class="max-w-2xl space-y-4">
    <h1 class="font-semibold text-lg">Documents</h1>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="doc in documents" :key="doc.id">
          <TableCell>{{ doc.title }}</TableCell>
          <TableCell>{{ doc.updated }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>
</template>
