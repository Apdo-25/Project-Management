<script setup>
import { ref, onMounted } from 'vue'
import KanbanBoard from '@/components/kanban/KanbanBoard.vue'
import Layout from '@/layouts/Layout.vue'
import ProjectTitle from '@/components/kanban/ProjectTitle.vue'
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import { mdiArrowLeft, mdiTableBorder } from '@mdi/js'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
</script>

<template>
  <Layout>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Project Board" main>
        <BaseButton
          to="projects"
          :icon="mdiArrowLeft"
          label="My Projects"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <ProjectTitle />
      <KanbanBoard />
    </SectionMain>
  </Layout>
</template>
