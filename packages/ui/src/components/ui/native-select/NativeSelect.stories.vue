<script setup lang="ts">
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '.'
</script>

<template>
  <Stories title="UI/NativeSelect" :component="NativeSelect">
    <Story title="Default">
      <NativeSelect>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelect>
    </Story>

    <Story title="With Groups">
      <NativeSelect>
        <NativeSelectOptGroup label="Fruits">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Vegetables">
          <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
          <NativeSelectOption value="potato">Potato</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </Story>

    <Story title="Small">
      <NativeSelect size="sm">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
    </Story>

    <Story title="Disabled">
      <NativeSelect disabled>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
      </NativeSelect>
    </Story>
  </Stories>
</template>
