<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import CarouselImage from '@/components/CarouselImage.vue'
</script>

<template>
    <main>
        <main class="flex flex-col md:flex-row gap-4 justify-center">
            <ContainerCard>
                <MarkdownRenderer filename="AboutMe" />
                <CarouselImage />
            </ContainerCard>
            <ContainerCard>
                <h2>Pathfinding</h2>
                <DemoPathfinding />
            </ContainerCard>
        </main>
    </main>
</template>
