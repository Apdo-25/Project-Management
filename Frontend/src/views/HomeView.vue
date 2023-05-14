<script setup>
import { ref } from 'vue'

import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import sectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

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
    </SectionMain>
  </Layout>
</template>
