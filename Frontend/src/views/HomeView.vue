<script setup>
import { ref, onMounted, computed } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import { useProjectStore } from '@/stores/project'
import { useAuthStore } from '@/stores/auth'

const projectStore = useProjectStore()
const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initialize()
  const currentUser = authStore.userDetail.id

  try {
    await projectStore.fetchUserProjects(currentUser)
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Handle the error here, e.g., display an error message or fallback behavior
  }
})

const currentTime = ref(getCurrentTime())

function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString()
}

const filteredProjects = computed(() => {
  const currentUser = authStore.userDetail._id
  const projects = projectStore.getProjects

  console.log('Projects: ', projects)
  console.log('Current User ID: ', currentUser)

  // Filter projects close to the deadline (e.g., within 7 days)
  const currentDate = new Date()
  const deadlineThreshold = currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  const filtered = projects.filter((project) => {
    const deadlineDate = new Date(project.deadline)
    return deadlineDate.getTime() <= deadlineThreshold && project.userId === currentUser
  })

  console.log('Filtered Projects: ', filtered)
  return filtered
})
</script>

<template>
  <Layout>
    <SectionMain>
      <div class="clock text-right pr-4">Time: {{ currentTime }}</div>
      <SectionTitle>
        <h2 class="text-xl font-semibold">Dashboard</h2>
      </SectionTitle>
      <CardBox>
        <CardBoxComponentBody>
          <p class="text-lg">
            Welcome to PM-Project, a comprehensive project management tool designed to help you stay
            organized, collaborate with your team, and meet project deadlines.
          </p>
        </CardBoxComponentBody>
      </CardBox>
      <BaseDivider />
      <CardBox>
        <CardBoxComponentHeader title="Projects Close to Due Dates" />
        <CardBoxComponentBody>
          <ul>
            <li v-for="project in filteredProjects" :key="project._id">
              {{ project.name }} - Due Date: {{ project.dueDate }}
            </li>
          </ul>
        </CardBoxComponentBody>
      </CardBox>
    </SectionMain>
  </Layout>
</template>
