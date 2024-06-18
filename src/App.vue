<script setup lang="ts"></script>

<template>
    <header class="flex justify-between mb-4">
        <h1 class="mt-auto mb-auto justify-center text-3xl sm:text-5xl">Trygve Jørgensen</h1>
        <img
            src="../images/KvadratProfilbilde.jpeg"
            alt="Profile picture"
            class="rounded-full shadow-xl size-20 sm:size-28"
        />
    </header>

    <RouterView />

    <footer
        class="mt-5 pt-5 pb-5 border-t border-gray-300 text-center flex flex-row items-center justify-center gap-4"
    >
        <div class="pb-5 text-right">
            <p class="leading-none">+47 94 05 05 56</p>
            <a href="mailito: trygveabjo@gmail.com"
                ><p class="leading-none">trygveabjo@gmail.com</p></a
            >
        </div>
        <div class="flex gap-2 justify-center">
            <a href="https://github.com/troytyggis55" target="”_blank”">
                <img src="../svg/github.svg" alt="Github Logo" class="" />
            </a>
            <a
                href="https://www.linkedin.com/in/trygve-j%C3%B8rgensen-80b1b9259/"
                target="”_blank”"
            >
                <img src="../svg/linkedin.svg" alt="LinkedIn Logo" class="h-10" />
            </a>
        </div>
    </footer>
</template>

<style scoped></style>
