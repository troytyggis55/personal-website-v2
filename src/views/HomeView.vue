<script setup lang="ts">
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import DemoFluid from '@/components/DemoFluid.vue'
import { ref } from 'vue'

const pathCtrl = ref(false)
const fluidCtrl = ref(false)
</script>

<template>
    <main class="flex flex-col gap-20">
        <!-- About -->
        <section>
            <p class="tagline">
                Masterstudent i Datateknologi ved NTNU med spesialisering i effektive datasystemer.<br>
                Kan fullstack, liker backend, <em>elsker utfordringer</em> <sup>(&hellip;og hater slagord)</sup>
            </p>
        </section>

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
                    <a href="https://tihlde.org" target="_blank" class="exp-company exp-link"
                        >TIHLDE</a
                    >
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

                <div class="demo-block">
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
        </section>
    </main>
</template>

<style scoped>
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

/* ── About ───────────────────────────────────── */
.tagline {
    font-family: 'Lora', serif;
    font-size: clamp(1.1rem, 2.2vw, 1.35rem);
    color: rgba(230, 226, 217, 0.8);
    line-height: 1.8;
    max-width: 52ch;
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
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.4rem 0;
    border-bottom: 1px solid var(--color-border);
}

.exp-company {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.3rem, 2.5vw, 1.7rem);
    font-weight: 700;
    color: var(--color-fg);
    letter-spacing: -0.01em;
}

.exp-link:hover {
    color: var(--color-accent);
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
    font-size: 0.7rem;
    color: var(--color-amber);
    opacity: 0.75;
    letter-spacing: 0.05em;
}

.exp-role {
    font-size: 0.82rem;
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
    color: var(--color-accent);
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
    color: var(--color-accent);
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
    gap: 1.25rem;
    border: 1px solid var(--color-border);
    padding: 1.5rem;
}

.demo-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.demo-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
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
    opacity: 0.8;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: opacity 0.2s;
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
