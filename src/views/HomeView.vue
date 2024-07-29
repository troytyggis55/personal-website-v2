<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import ContainerCarousel from '@/components/ContainerCarousel.vue'
</script>

<template>
    <main class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row gap-4 justify-center">
            <ContainerCard>
                <MarkdownRenderer filename="AboutMe" />
                <ContainerCarousel>
                    <li class="glide__slide items-center">
                        <img src="/images/aboutme/hs.jpg" alt="Image 1" />
                    </li>
                    <li class="glide__slide items-center">
                        <img src="/images/aboutme/hs.jpg" alt="Image 2" />
                    </li>
                    <li class="glide__slide items-center">
                        <img src="/images/aboutme/hs.jpg" alt="Image 3" />
                    </li>
                </ContainerCarousel>
            </ContainerCard>
            <ContainerCard class="max-w-md">
                <h2>Pathfinding</h2>
                <DemoPathfinding />
            </ContainerCard>
        </div>
        <ContainerCard>
            <h1>Skills</h1>
            <div class="flex flex-row flex-wrap gap-10 justify-center">
                <img
                    class="h-40 hover-glow"
                    src="/public/svg/java.svg"
                    alt="Java Logo"
                    title="Java"
                />
                <img
                    class="h-40 hover-glow"
                    src="/public/svg/python.svg"
                    alt="Python Logo"
                    title="Python"
                />
                <img
                    class="h-40 hover-glow"
                    src="/public/svg/javascript.svg"
                    alt="JavaScript Logo"
                    title="JavaScript"
                />
                <img class="h-40 hover-glow" src="/public/svg/cpp.svg" alt="C++ Logo" title="C++" />
            </div>
        </ContainerCard>
    </main>
</template>

<style>
// ToDo: Add hover-glow class to global styles
.hover-glow {
    transition: filter 0.2s;
}

.hover-glow:hover {
    filter: drop-shadow(0 0 10px white);
}
</style>
