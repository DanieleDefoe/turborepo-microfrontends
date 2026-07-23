<script lang="ts" setup>
  import Autoplay from "embla-carousel-autoplay";

  const images = [
    "https://picsum.photos/640/640?random=1",
    "https://picsum.photos/640/640?random=2",
    "https://picsum.photos/640/640?random=3",
    "https://picsum.photos/640/640?random=4",
    "https://picsum.photos/640/640?random=5",
    "https://picsum.photos/640/640?random=6",
  ];

  const users: { avatar: string; name: string; id: number }[] = [
    {
      avatar: "https://github.com/benjamincanac.png",
      id: 1,
      name: "Benjamin Canac",
    },
    { avatar: "https://github.com/romhml.png", id: 2, name: "Benjamin Canac" },
    { avatar: "https://github.com/noook.png", id: 3, name: "Benjamin Canac" },
  ];
</script>

<template>
  <main class="flex gap-8 justify-between flex-col lg:flex-row">
    <aside class="w-full lg:w-1/3">
      <p class="text-4xl font-black relative">
        {{ $t('marketing.hero.title') }}
      </p>

      <div class="font-bold mt-2 relative">
        {{ $t('marketing.hero.subtitle') }}
      </div>

      <div class="flex gap-4 my-12 relative">
        <UiButton>
          {{ $t('marketing.hero.getMore') }}
        </UiButton>

        <img
          alt=""
          class="dark:hidden block w-12 h-12 absolute top-[110%] left-8 -rotate-90"
          src="@/assets/icons/arrow-dark.svg"
        >
        <img
          alt=""
          class="dark:block hidden w-12 h-12 absolute top-[110%] left-8 -rotate-90"
          src="@/assets/icons/arrow-light.svg"
        >
      </div>

      <div class="flex items-center gap-2">
        <div class="flex gap-2">
          <UiAvatar v-for="user in users" :key="user.id">
            <UiAvatarImage :src="user.avatar" />
          </UiAvatar>
        </div>

        <span class="font-black">
          {{ $t('marketing.hero.learnPeople') }}
        </span>
      </div>
    </aside>

    <aside class="w-full lg:w-2/3 lg:px-2">
      <UiCarousel
        :opts="{
          align: 'start',
          loop: true,
        }"
        :plugins="[Autoplay({
          delay: 2000,
        })]"
      >
        <UiCarouselContent>
          <UiCarouselItem
            class="basis-1/3"
            v-for="image in images"
            :key="image"
          >
            <img class="rounded-lg" height="320" width="320" :src="image">
          </UiCarouselItem>
        </UiCarouselContent>
        <UiCarouselPrevious class="hidden lg:flex" />
        <UiCarouselNext class="hidden lg:flex" />
      </UiCarousel>
    </aside>
  </main>
</template>
