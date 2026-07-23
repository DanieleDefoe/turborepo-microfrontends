<script lang="ts" setup>
  import Marquee from "@/components/inspira-ui/marquee/index.vue";
  import MarqueeReviewCard from "@/components/inspira-ui/marquee/review-card.vue";

  const reviews = [
    {
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
      name: "Jack",
      username: "@jack",
    },
    {
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
      name: "Jill",
      username: "@jill",
    },
    {
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
      name: "John",
      username: "@john",
    },
    {
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
      name: "Jane",
      username: "@jane",
    },
    {
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
      name: "Jenny",
      username: "@jenny",
    },
    {
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
      name: "James",
      username: "@james",
    },
  ];

  // Split reviews into two rows
  const firstRow = ref(reviews.slice(0, reviews.length / 2));
  const secondRow = ref(reviews.slice(reviews.length / 2));
</script>

<template>
  <h2 class="text-4xl font-black my-4 text-center">
    {{ $t('marketing.evaluation.title') }}
  </h2>
  <h4 class="text-center mb-4">
    {{ $t('marketing.evaluation.subtitle') }}
  </h4>
  <div
    class="relative flex w-full flex-col items-center justify-center overflow-hidden"
  >
    <Marquee class="[--duration:50s]" pause-on-hover>
      <MarqueeReviewCard
        v-for="review in firstRow"
        :key="review.username"
        :body="review.body"
        :img="review.img"
        :name="review.name"
        :username="review.username"
      />
    </Marquee>

    <Marquee class="[--duration:50s]" pause-on-hover reverse>
      <MarqueeReviewCard
        v-for="review in secondRow"
        :key="review.username"
        :body="review.body"
        :img="review.img"
        :name="review.name"
        :username="review.username"
      />
    </Marquee>

    <!-- Left Gradient -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-(--ui-bg) dark:from-(--ui-bg)"
    />

    <!-- Right Gradient -->
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-(--ui-bg) dark:from-(--ui-bg)"
    />
  </div>
</template>
