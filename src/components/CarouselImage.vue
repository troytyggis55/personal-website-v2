<template>
    <div class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide">
                    <img src="/images/aboutme/hs.jpg" alt="Image 1" />
                </li>
                <li class="glide__slide">
                    <img src="/images/aboutme/snowboard.jpeg" alt="Image 2" />
                </li>
                <li class="glide__slide">
                    <ContainerInstagram
                        permalink="https://www.instagram.com/reel/C6szQ95NQ6f/?utm_source=ig_embed&amp;utm_campaign=loading"
                    />
                </li>
            </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
        </div>
    </div>
</template>

<script setup>
import Glide from '@glidejs/glide'
import { onMounted } from 'vue'
import ContainerInstagram from '@/components/ContainerInstagram.vue'

onMounted(() => {
    new Glide('.glide', {
        peek: 20
    }).mount()
})
</script>

<style scoped></style>
