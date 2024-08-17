<script setup lang="ts">
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
</script>

<template>
    <div class="flex flex-row flex-wrap gap-6">
        <DemoPathfinding />
        <div class="flex flex-col lg:max-w-md justify-center">
            <MarkdownRenderer filename="Pathfinding" />
        </div>
    </div>
</template>

<style scoped></style>
