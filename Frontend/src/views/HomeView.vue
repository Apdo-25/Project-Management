<script setup>
import { ref } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import LayoutS from '@/layouts/LayoutS.vue'
import sectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'

const currentTime = ref(getCurrentTime())

const projectStore = useProjectStore()

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
    <LayoutS>
      <SectionMain>
        <div class="clock text-right pr-4">
          Time:
          {{ currentTime }}
        </div>
        <sectionTitle> <h2 class="text-xl font-semibold">Projects</h2> </sectionTitle>
        <CardBox>
          <CardBoxComponentBody>
            <ul>
              <li v-for="project in projectStore.projects" :key="project.id">
                {{ project.name }}
              </li>
            </ul>
          </CardBoxComponentBody>
        </CardBox>
      </SectionMain>
    </LayoutS>
  </Layout>
</template>
