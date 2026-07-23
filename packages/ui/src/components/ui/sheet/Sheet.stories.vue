<script lang="ts" setup>
  import { Button } from "../button";
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from ".";
</script>

<template>
  <Stories title="UI/Sheet" :component="Sheet">
    <Story title="Default">
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button>Save changes</Button>
            <SheetClose as-child>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Story>
  </Stories>
</template>
