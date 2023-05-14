<script setup>
import { computed, ref, onMounted } from 'vue'
import { mdiTableOff, mdiMonitorCellphone, mdiMonitor, mdiEye, mdiTrashCan } from '@mdi/js'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import useProjectStore from '@/stores/project'
import CardBox from '@/components/CardBox.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import layout from '@/layouts/Layout.vue'
import SectionMain from '@/components/SectionMain.vue'

// Create reactive variables
const isModalActive = ref(false)
const currentPage = ref(0)
const checkedRows = ref([])

// Get the project store instance
const projectStore = useProjectStore()

// Method to create a new project
const createProject = async () => {
  // Create a new project
  const newProject = {
    id: Date.now(), // Generate a unique ID
    name: 'New Project',
    description: 'Lorem ipsum',
    members: 'John Doe',
    progress: 50,
    created: new Date().toISOString()
  }

  // Add the new project to the store
  projectStore.createProject(newProject)

  // Update the pagination
  currentPage.value = Math.ceil((projectStore.projects.length + 1) / perPage.value) - 1
  checkedRows.value = [] // Reset checked rows

  // Close the modal
  isModalActive.value = false
}

onMounted(async () => {
  await projectStore.fetchProjects()
  console.log(projectStore.projects)
})
</script>

<template>
  <layout>
    <SectionMain>
      <CardBox class="mb-6" has-table>
        <!-- ... -->
        <table>
          <!-- ... -->
          <tbody>
            <tr v-for="project in projectStore.projectsPaginated" :key="project.id">
              <!-- ... -->
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
                  <BaseButton
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="isModalDangerActive = true"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- ... -->
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" />

      <NotificationBar color="danger" :icon="mdiTableOff">
        <b>Empty table.</b> When there's nothing to show
      </NotificationBar>

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>

      <CardBoxModal
        v-model:active="isModalActive"
        title="New Project"
        :danger="false"
        @save="createProject"
      >
        <!-- ... -->
        <template #footer>
          <BaseButtons>
            <BaseButton label="Create" color="info" @click="createProject" />
            <BaseButton label="Cancel" color="whiteDark" @click="isModalActive = false" />
          </BaseButtons>
        </template>
      </CardBoxModal>
    </SectionMain>
  </layout>
</template>
