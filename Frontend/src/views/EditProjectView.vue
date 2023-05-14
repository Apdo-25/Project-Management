<script setup>
import { mdiTableBorder, mdiMonitor } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import TableProjectEdit from '@/components/TableProject.vue'
import Layout from '@/layouts/Layout.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <Layout>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="My Projects" main>
        <BaseButton
          to="/"
          :icon="mdiMonitor"
          label="Back to Home"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <TableProjectEdit />
    </SectionMain>
  </Layout>
</template>
