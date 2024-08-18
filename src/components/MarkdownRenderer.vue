<template>
    <div id="header">
        <h2 id="title">{{ metaData.title }}</h2>
        <div id="details">
            <b v-if="metaData.date">{{ new Date(metaData.date).toDateString() }}</b>
            <p v-if="metaData.repo !== ''"><a :href="metaData.repo" target="_blank">Github</a></p>
            <b v-if="metaData.category !== ''">{{ metaData.category }}</b>
        </div>
    </div>

    <div id="md" v-html="markdown.render(markdownContent)" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import frontmatter from 'front-matter'
import { useSessionStore } from '@/stores/session'

const props = defineProps({
    filename: {
        type: String,
        default: ''
    }
})

interface FrontMatter {
    title?: string
    date?: string
    repo?: string
    category?: string
}

const filepath = `/markdown/${useSessionStore().language}/${props.filename}.md`

const markdown = new MarkdownIt()
const markdownContent = ref('')
const metaData = ref<FrontMatter>({ title: '', date: '', repo: '', category: '' })

onMounted(() => {
    fetch(filepath)
        .then(response => response.text())
        .then(text => {
            const { body, attributes } = frontmatter<FrontMatter>(text)
            markdownContent.value = body
            metaData.value = {
                title: attributes.title ?? '',
                date: attributes.date ?? '',
                repo: attributes.repo ?? '',
                category: attributes.category ?? ''
            }
        })
        .catch(err => (markdownContent.value = 'Could not load markdown file: ' + err.toString()))
})
</script>

<style scoped>
#title {
    margin: 0;
    padding: 0;
}

#details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0 20px;
}

.details p,
.details p a {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    color: #dcdcdc;
}
</style>

<style>
#md img {
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 500px;
    object-fit: contain;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

#md pre {
    background-color: #383096;
    color: #7ebfff;
    padding: 10px;
    overflow-x: scroll;
}

#md pre::-webkit-scrollbar {
    height: 10px;
}

#md pre::-webkit-scrollbar-track {
    background: transparent;
}

#md pre::-webkit-scrollbar-thumb {
    background: #7769dd;
}
</style>
