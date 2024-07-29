<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import ContainerCarousel from '@/components/ContainerCarousel.vue'
import ContainerInstagram from '@/components/ContainerInstagram.vue'
</script>

<template>
    <main>
        <main class="flex flex-col md:flex-row gap-4 justify-center">
            <ContainerCard>
                <MarkdownRenderer filename="AboutMe" />
                <ContainerCarousel>
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
                </ContainerCarousel>
            </ContainerCard>
            <ContainerCard>
                <h2>Pathfinding</h2>
                <DemoPathfinding />
            </ContainerCard>
        </main>
    </main>
</template>
