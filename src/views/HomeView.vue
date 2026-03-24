<script setup lang="ts">
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import DemoFluid from '@/components/DemoFluid.vue'
import { ref } from 'vue'

const pathCtrl = ref(false)
const fluidCtrl = ref(false)
</script>

<template>
    <div class="page">
    <header class="site-hero">
        <span class="header-name">Trygve Jørgensen</span>
        <img src="/images/KvadratProfilbilde.jpeg" alt="Profilbilde" class="header-photo" />
        <p class="tagline">
            Masterstudent i Datateknologi ved NTNU med spesialisering i effektive datasystemer.<br />
            Kan fullstack, liker backend, <em>elsker utfordringer</em>
            <sup>(&hellip;og hater slagord)</sup>
        </p>
    </header>

    <main class="flex flex-col gap-20">
        <!-- Experience -->
        <section>
            <p class="eyebrow">Erfaring</p>
            <div class="exp-list">
                <div class="exp-row">
                    <span class="exp-company">Bekk</span>
                    <div class="exp-right">
                        <span class="exp-period">Sommer 2025</span>
                        <span class="exp-role">Sommerjobb · konsulent</span>
                    </div>
                </div>
                <div class="exp-row">
                    <span class="exp-company">TIHLDE</span>
                    <div class="exp-right">
                        <span class="exp-period">2024–25</span>
                        <span class="exp-role">Leder for linjeforening · 700+ studenter</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Project -->
        <section>
            <p class="eyebrow">Prosjekt</p>
            <a href="https://chatssb.no" target="_blank" class="chatssb-card">
                <div class="chatssb-header">
                    <span class="chatssb-name">ChatSSB.no</span>
                    <span class="chatssb-arrow">↗</span>
                </div>
                <p class="chatssb-desc">
                    AI-drevet chatgrensesnitt som gjør SSBs åpne data dramatisk mer tilgjengelig —
                    hvem som helst kan utforske norsk statistikk uten tekniske forkunnskaper.
                </p>
                <div class="chatssb-tags">
                    <span class="tag">Fullstack</span>
                    <span class="tag">API-integrasjon</span>
                    <span class="tag">AI</span>
                </div>
            </a>
        </section>

        <!-- Demos -->
        <section>
            <p class="eyebrow">"Håndlaget" kode anno 2023</p>
            <div class="demos-wrap">
                <div class="demo-block">
                    <div class="demo-inner">
                        <div class="demo-hd">
                            <span class="demo-name">Pathfinding</span>
                        </div>
                        <DemoPathfinding :show-controls="pathCtrl" />
                        <button
                            class="ctrl-toggle"
                            @click="pathCtrl = !pathCtrl"
                            :aria-expanded="pathCtrl"
                        >
                            {{ pathCtrl ? 'skjul' : 'innstillinger' }}
                        </button>
                    </div>
                </div>

                <div class="demo-block">
                    <div class="demo-inner">
                        <div class="demo-hd">
                            <span class="demo-name">Fluid simulations</span>
                        </div>
                        <DemoFluid :show-controls="fluidCtrl" />
                        <button
                            class="ctrl-toggle"
                            @click="fluidCtrl = !fluidCtrl"
                            :aria-expanded="fluidCtrl"
                        >
                            {{ fluidCtrl ? 'skjul' : 'innstillinger' }}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>

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
    </div>
</template>

<style scoped>
/* ── Page wrapper ────────────────────────────── */
.page {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.page > main {
    flex: 1;
}

/* ── Hero ────────────────────────────────────── */
.site-hero {
    display: grid;
    grid-template-areas:
        'name'
        'photo'
        'tagline';
    gap: 1.75rem;
    margin-bottom: 5rem;
    margin-top: 5rem;
    padding-bottom: 2rem;
    justify-items: center;
}

.header-name {
    grid-area: name;
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 8vw, 3.2rem);
    font-weight: 900;
    color: var(--color-fg);
    letter-spacing: -0.02em;
    line-height: 1;
}

.header-photo {
    grid-area: photo;
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    object-fit: cover;
}

.tagline {
    grid-area: tagline;
    font-family: 'Lora', serif;
    font-size: clamp(1.4rem, 2.5vw, 1.6rem);
    color: rgba(230, 226, 217, 0.8);
    line-height: 1.75;
    max-width: 48ch;
}

@media (min-width: 640px) {
    .site-hero {
        grid-template-areas:
            'name  photo'
            'tagline photo';
        grid-template-columns: 1fr auto;
        align-items: center;
        column-gap: 3rem;
        row-gap: 1.5rem;
        justify-items: left;
    }

    .header-photo {
        width: 17rem;
        height: 17rem;
        align-self: center;
    }
}

/* ── Footer ──────────────────────────────────── */
.site-footer {
    margin-top: 8rem;
    width: 100vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 1.75rem 2.5rem 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-top: 1px solid var(--color-border);
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

/* ── Shared ─────────────────────────────────── */
.eyebrow {
    font-family: 'Lora', serif;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-amber);
    opacity: 0.8;
    margin-bottom: 1.25rem;
}

.tagline em {
    font-style: italic;
    color: var(--color-fg);
}

/* ── Experience ──────────────────────────────── */
.exp-list {
    border-top: 1px solid var(--color-border);
}

.exp-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--color-border);
}

.exp-company {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.3rem, 2.5vw, 2rem);
    font-weight: 700;
    color: var(--color-fg);
    letter-spacing: -0.01em;
}

.exp-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.15rem;
    flex-shrink: 0;
}

.exp-period {
    font-family: 'Lora', serif;
    font-size: 1rem;
    color: var(--color-amber);
    opacity: 0.75;
    letter-spacing: 0.05em;
}

.exp-role {
    font-size: 1rem;
    color: rgba(230, 226, 217, 0.65);
    font-style: italic;
}

/* ── ChatSSB ─────────────────────────────────── */
.chatssb-card {
    display: block;
    text-decoration: none;
    padding: 2rem 2.25rem;
    border: 1px solid var(--color-border);
    background: rgba(255, 255, 255, 0.02);
    transition:
        background 0.25s,
        border-color 0.25s;
}

.chatssb-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(66, 184, 131, 0.35);
}

.chatssb-header {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 0.9rem;
}

.chatssb-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 700;
    color: var(--color-fg);
    letter-spacing: -0.02em;
}

.chatssb-arrow {
    font-size: 1.3rem;
    color: var(--color-amber);
    transition: transform 0.2s;
}

.chatssb-card:hover .chatssb-arrow {
    transform: translate(3px, -3px);
}

.chatssb-desc {
    font-size: 0.95rem;
    color: rgba(230, 226, 217, 0.55);
    line-height: 1.7;
    max-width: 58ch;
}

.chatssb-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1.25rem;
}

.tag {
    font-family: 'Lora', serif;
    font-size: 0.62rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    color: var(--color-amber);
    border: 1px solid rgba(66, 184, 131, 0.2);
}

/* ── Demos ───────────────────────────────────── */
.demos-wrap {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 1280px) {
    .demos-wrap {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
}

.demo-block {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border);
    padding: 1.5rem;
}

.demo-inner {
    max-width: 448px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    align-self: center;
}

.demo-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.demo-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-fg);
    letter-spacing: -0.01em;
}

.ctrl-toggle {
    font-family: 'Lora', serif;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-amber);
    border: 1px solid var(--color-border);
    opacity: 0.8;
    background: none;
    cursor: pointer;
    padding: 1em;
    transition: opacity 0.2s;
    align-self: center;
}

.ctrl-toggle:hover {
    opacity: 1;
}
</style>

<style>
.hover-glow {
    transition: filter 0.2s;
}

.hover-glow:hover {
    filter: drop-shadow(0 0 8px rgba(230, 226, 217, 0.6));
}
</style>
