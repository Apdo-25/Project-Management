<script setup>
import { ref, onMounted } from 'vue'

import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import sectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})

const currentTime = ref(getCurrentTime())

function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString()
}

// Update clock every second
setInterval(() => {
  currentTime.value = getCurrentTime()
}, 1000)
</script>
<template>
  <Layout>
    <SectionMain>
      <div class="clock text-right pr-4">
        Time:
        {{ currentTime }}
      </div>
      <sectionTitle> <h2 class="text-xl font-semibold">Welcome To PM-Project</h2> </sectionTitle>
      <CardBox>
        <CardBoxComponentBody>
          <p class="text-lg">
            PM-Project is a project management tool that makes it easy to keep track of your
            projects and stay on top of your deadlines.
          </p>
        </CardBoxComponentBody>
      </CardBox>
      <BaseDivider />
      <CardBox>
        <CardBoxComponentHeader title="Frequently used Projects" />
        <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview">
          <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" />
        </SectionTitleLineWithButton>

        <CardBox class="mb-6">
          <div v-if="chartData">
            <line-chart :data="chartData" class="h-96" />
          </div>
        </CardBox>
      </CardBox>
      <BaseDivider />
      <CardBox>
        <CardBoxComponentHeader title="Project Due Dates" />
      </CardBox>
    </SectionMain>
  </Layout>
</template>
