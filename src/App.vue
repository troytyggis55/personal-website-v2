<script setup lang="ts">
import DemoPerlin from '@/components/DemoPerlin.vue'
</script>

<template>
    <DemoPerlin />

    <header class="site-header">
        <router-link to="/" class="header-name-link">
            <span class="header-name">Trygve Jørgensen</span>
        </router-link>
        <img
            src="/images/KvadratProfilbilde.jpeg"
            alt="Profilbilde"
            class="header-photo"
        />
    </header>

    <RouterView />

    <footer class="site-footer">
        <div class="footer-contact">
            <p>+47 94 05 05 56</p>
            <a href="mailto:trygveabjo@gmail.com">trygveabjo@gmail.com</a>
        </div>
        <div class="footer-icons">
            <a href="https://github.com/troytyggis55" target="_blank" class="hover-glow">
                <img src="/src/svg/github.svg" alt="GitHub" class="footer-icon" />
            </a>
            <a
                href="https://www.linkedin.com/in/trygve-j%C3%B8rgensen-80b1b9259/"
                target="_blank"
                class="hover-glow"
            >
                <img src="/src/svg/linkedin.svg" alt="LinkedIn" class="footer-icon" />
            </a>
        </div>
    </footer>
</template>

<style scoped>
.site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
}

.header-name-link {
    text-decoration: none;
}

.header-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 5vw, 3.2rem);
    font-weight: 900;
    color: var(--color-fg);
    letter-spacing: -0.02em;
    line-height: 1;
    transition: color 0.2s;
}

.header-name-link:hover .header-name {
    color: white;
}

.header-photo {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    flex-shrink: 0;
}

@media (min-width: 640px) {
    .header-photo {
        width: 5rem;
        height: 5rem;
    }
}

.site-footer {
    margin-top: 6rem;
    padding-top: 1.75rem;
    padding-bottom: 4rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
}

.footer-contact {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1rem;
    font-size: 0.8rem;
    color: rgba(230, 226, 217, 0.35);
}

.footer-contact a:hover {
    color: var(--color-fg);
}

.footer-icons {
    display: flex;
    gap: 0.75rem;
}

.footer-icon {
    height: 1.75rem;
    opacity: 0.5;
    transition: opacity 0.2s;
}

.footer-icons a:hover .footer-icon {
    opacity: 0.9;
}
</style>
