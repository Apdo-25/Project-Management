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

      <TableProject />
    </SectionMain>
  </Layout>
</template>

<script setup>
import { mdiTableBorder, mdiMonitor } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import TableProject from '@/components/TableProject.vue'
import Layout from '@/layouts/Layout.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>
