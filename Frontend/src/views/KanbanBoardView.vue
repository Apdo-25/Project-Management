<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import KanbanBoard from '@/components/kanban/KanbanBoard.vue'
import Layout from '@/layouts/Layout.vue'
import ProjectTitle from '@/components/kanban/ProjectTitle.vue'
import SectionMain from '@/components/SectionMain.vue'
</script>

<template>
  <Layout>
    <SectionMain>
      <div class="flex">
        <div class="w-4/5 p-10">
          <ProjectTitle />
          <KanbanBoard />
        </div>
      </div>
    </SectionMain>
  </Layout>
</template>
