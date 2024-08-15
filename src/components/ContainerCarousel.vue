<template>
    <div class="glide flex flex-col gap-5 relative">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides items-center">
                <slot />
            </ul>
        </div>
        <div
            class="glide__arrows absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center"
            data-glide-el="controls"
        >
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                <img
                    class="h-10 opacity-35 hover:opacity-100 transition-opacity"
                    src="/src/svg/arrow-left.svg"
                    alt="Left Arrow"
                />
            </button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
                <img
                    class="h-10 opacity-35 hover:opacity-100 transition-opacity"
                    src="/src/svg/arrow-right.svg"
                    alt="Right Arrow"
                />
            </button>
        </div>
    </div>
</template>

<script setup>
import Glide from '@glidejs/glide'
import { onMounted } from 'vue'

onMounted(() => {
    new Glide('.glide', {
        peek: 20
    }).mount()
})
</script>

<style scoped></style>
