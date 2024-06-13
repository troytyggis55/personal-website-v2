<script setup lang="ts">
import ContainerCard from '@/components/ContainerCard.vue'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
</script>

<template>
    <header class="flex justify-between mb-4">
        <h1 class="mt-auto mb-auto justify-center ">Trygve Jørgensen</h1>
        <img
            src="../images/KvadratProfilbilde.jpeg"
            alt="Profile picture"
            class="rounded-full h-24 w-24 shadow-xl"
        />
    </header>

    <main>
        <ContainerCard>
            <MarkdownRenderer filename="AboutMe" />
        </ContainerCard>
    </main>
</template>

<style scoped></style>
