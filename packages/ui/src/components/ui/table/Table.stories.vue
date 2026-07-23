<script lang="ts" setup>
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from ".";

  const invoices = [
    {
      amount: "$250.00",
      invoice: "INV001",
      method: "Credit Card",
      status: "Paid",
    },
    {
      amount: "$150.00",
      invoice: "INV002",
      method: "PayPal",
      status: "Pending",
    },
    {
      amount: "$350.00",
      invoice: "INV003",
      method: "Bank Transfer",
      status: "Unpaid",
    },
  ];
</script>

<template>
  <Stories title="UI/Table" :component="Table">
    <Story title="Default">
      <Table class="max-w-2xl">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead class="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in invoices" :key="row.invoice">
            <TableCell class="font-medium">{{ row.invoice }}</TableCell>
            <TableCell>{{ row.status }}</TableCell>
            <TableCell>{{ row.method }}</TableCell>
            <TableCell class="text-right">{{ row.amount }}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell :colspan="3">Total</TableCell>
            <TableCell class="text-right">$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Story>
  </Stories>
</template>
