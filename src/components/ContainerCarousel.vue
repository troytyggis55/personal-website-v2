<template>
    <div class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <slot/>
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

onMounted(() => {
    new Glide('.glide', {
        peek: 20
    }).mount()
})
</script>

<style scoped></style>