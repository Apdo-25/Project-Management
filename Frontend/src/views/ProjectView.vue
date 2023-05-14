<template>
  <Layout>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="My Projects" main>
        <BaseButton
          href="/"
          :icon="mdiMonitor"
          label="Back to Home"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <TableProject />
    </SectionMain>
  </Layout>
</template>

<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiMonitor } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableProject from '@/components/TableProject.vue'
import Layout from '@/layouts/Layout.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
</script>
