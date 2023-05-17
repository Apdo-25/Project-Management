<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import KanbanBoard from '@/components/kanban/KanbanBoard.vue'
import Layout from '@/layouts/Layout.vue'
import ProjectTitle from '@/components/kanban/ProjectTitle.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import { mdiArrowLeft, mdiTableBorder } from '@mdi/js'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
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
