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
</script>

<template>
  <Layout>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="My Projects" main>
        <BaseButton
          to="CreateProject"
          :icon="mdiMonitor"
          label="Create a new Project"
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
