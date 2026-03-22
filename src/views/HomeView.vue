<script setup lang="ts">
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import DemoPathfinding from '@/components/DemoPathfinding.vue'
import { ref } from 'vue'

const showDemo = ref(true)
</script>

<template>
    <main class="flex flex-col gap-6">
        <!-- Row 1: Bio + Demo -->
        <div class="flex flex-col md:flex-row gap-6">
            <ContainerCard>
                <h3 class="section-label">Om meg</h3>
                <MarkdownRenderer filename="AboutMe" />

                <div class="mt-6 flex flex-col gap-4">
                    <div class="experience-entry">
                        <div class="entry-header">
                            <span class="entry-title">Bekk</span>
                            <span class="entry-tag">Sommerjobb 2025</span>
                        </div>
                        <p class="entry-desc">Konsulent — backend og systemutvikling.</p>
                    </div>

                    <div class="experience-entry">
                        <div class="entry-header">
                            <a
                                href="https://tihlde.org"
                                target="_blank"
                                class="entry-title link-accent"
                                >TIHLDE</a
                            >
                            <span class="entry-tag">Leder 2024/25</span>
                        </div>
                        <p class="entry-desc">
                            Leder for linjeforeningen for informatikk- og datastudenter ved NTNU,
                            med over 700 medlemmer.
                        </p>
                    </div>
                </div>
            </ContainerCard>

            <ContainerCard class="md:max-w-md w-full">
                <h3 class="section-label">Pathleting-demo</h3>
                <DemoPathfinding v-if="showDemo" />
                <button
                    v-else
                    @click="showDemo = true"
                    class="text-5xl w-full h-full min-h-56 text-white border border-white/30 hover:bg-white/10 transition rounded"
                >
                    Start demo
                </button>

                <div class="mt-4 flex justify-center gap-2" v-if="showDemo">
                    <button
                        class="px-4 py-2 text-sm text-white border border-white/30 hover:bg-white/10 transition rounded"
                        @click="showDemo = false"
                    >
                        Stopp
                    </button>
                    <router-link
                        to="/demo/pathfinding"
                        class="px-4 py-2 text-sm text-white border border-white/30 hover:bg-white/10 transition rounded"
                    >
                        Flere demoer
                    </router-link>
                </div>
            </ContainerCard>
        </div>

        <!-- Row 2: Projects -->
        <ContainerCard>
            <h3 class="section-label">Prosjekter</h3>
            <a href="https://chatssb.no" target="_blank" class="project-card group">
                <div class="project-card-inner">
                    <div class="flex items-center gap-3">
                        <span class="project-title">ChatSSB.no</span>
                        <span class="project-arrow">↗</span>
                    </div>
                    <p class="project-desc">
                        Gjør SSBs åpne data dramatisk mer tilgjengelig — kombinerer et chat-grensesnitt
                        med SSBs API slik at hvem som helst kan utforske norsk statistikk uten teknisk
                        forkunnskaper.
                    </p>
                    <div class="flex gap-2 mt-3 flex-wrap">
                        <span class="tech-tag">Fullstack</span>
                        <span class="tech-tag">API-integrasjon</span>
                        <span class="tech-tag">AI</span>
                    </div>
                </div>
            </a>
        </ContainerCard>
    </main>
</template>

<style scoped>
.section-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.75rem;
}

.experience-entry {
    padding: 0.875rem 1rem;
    border-left: 2px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0 6px 6px 0;
}

.entry-header {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 0.25rem;
}

.entry-title {
    font-weight: 700;
    font-size: 1rem;
    color: white;
}

.link-accent:hover {
    color: var(--color-accent);
}

.entry-tag {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.45);
    font-weight: 500;
}

.entry-desc {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
}

.project-card {
    display: block;
    text-decoration: none;
}

.project-card-inner {
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    transition: background 0.2s, border-color 0.2s;
}

.project-card:hover .project-card-inner {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
}

.project-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: white;
}

.project-arrow {
    font-size: 1.1rem;
    color: var(--color-accent);
    transition: transform 0.2s;
}

.project-card:hover .project-arrow {
    transform: translate(2px, -2px);
}

.project-desc {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-top: 0.4rem;
}

.tech-tag {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: rgba(66, 184, 131, 0.15);
    color: var(--color-accent);
    border: 1px solid rgba(66, 184, 131, 0.3);
}
</style>

<style>
.hover-glow {
    transition: filter 0.2s;
}

.hover-glow:hover {
    filter: drop-shadow(0 0 10px white);
}
</style>
