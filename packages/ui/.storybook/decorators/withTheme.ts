import type { Decorator } from "@storybook/vue3-vite"

export const withTheme: Decorator = () => ({
    template: '<div class="bg-background text-foreground p-6"><story /></div>'
})
