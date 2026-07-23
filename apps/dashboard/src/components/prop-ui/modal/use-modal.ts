import { createSharedComposable, useMediaQuery } from "@vueuse/core";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const useSharedModal = createSharedComposable(() => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Modal = computed(() => ({
    Close: isDesktop.value ? DialogClose : DrawerClose,
    Content: isDesktop.value ? DialogContent : DrawerContent,
    Description: isDesktop.value ? DialogDescription : DrawerDescription,
    Footer: isDesktop.value ? DialogFooter : DrawerFooter,
    Header: isDesktop.value ? DialogHeader : DrawerHeader,
    Root: isDesktop.value ? Dialog : Drawer,
    Title: isDesktop.value ? DialogTitle : DrawerTitle,
    Trigger: isDesktop.value ? DialogTrigger : DrawerTrigger,
  }));

  const contentClass = computed(() =>
    isDesktop.value ? "" : "px-2 pb-8 *:px-4"
  );

  return {
    contentClass,
    isDesktop,
    Modal,
  };
});

export function useModal() {
  return useSharedModal();
}
