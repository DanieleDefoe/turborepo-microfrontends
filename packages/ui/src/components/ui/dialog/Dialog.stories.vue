<script setup lang="ts">
import { Button } from '../button'
import { Input } from '../input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '.'
</script>

<template>
  <Stories title="UI/Dialog" :component="Dialog">
    <Story title="Default">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Edit profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-3">
            <label class="grid gap-1.5 text-sm font-medium">
              Name
              <Input default-value="Pedro Duarte" />
            </label>
            <label class="grid gap-1.5 text-sm font-medium">
              Username
              <Input default-value="@peduarte" />
            </label>
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Story>
  </Stories>
</template>
