<script setup>
import { ref, onMounted } from 'vue'
import {
  mdiBallotOutline,
  mdiAccount,
  mdiTextAccount,
  mdiArrowLeft,
  mdiClockTimeEightOutline
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'

import Layout from '@/layouts/Layout.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { useProjectStore } from '@/stores/project'
import { useRouter } from 'vue-router'

const router = useRouter()
const projectStore = useProjectStore()

const form = ref({
  name: '',
  description: '', // Fix the property name to match the template
  priority: '',
  status: '',
  deadline: '',
  addMember: '',
  removeMember: ''
})

const projectId = ref('')

onMounted(async () => {
  try {
    const project = await projectStore.fetchProject(router.currentRoute.value.params.id)
    form.value = { ...project } // Assign the fetched project data to the form
  } catch (error) {
    console.error('Error fetching project:', error)
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${year}-${month}-${day}`
}

const submit = async () => {
  const projectData = { ...form.value }

  // Format the deadline to "dd-MM-yyyy"
  projectData.deadline = formatDate(projectData.deadline)

  try {
    await projectStore.updateProject(projectId.value, projectData)
    router.push(`/projects/${projectId.value}`)
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with an error status
      console.error('Error updating project:', error.response.status)
      console.error('Error message:', error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message)
    }
  }
}

const formStatusCurrent = ref(0)

const formStatusOptions = ['info', 'success', 'danger', 'warning']

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0
}
</script>

<template>
  <Layout>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Edit The Project" main>
        <BaseButton
          v-if="projectId"
          :to="`/KanbanBoard/${projectId}`"
          :icon="mdiEye"
          label="Back to board"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <FormField label="Project Name">
          <FormControl placeholder="Project Name" v-model="form.name" :icon="mdiTextAccount" />
        </FormField>
        <FormField label="Project Description">
          <FormControl
            placeholder="Project Description"
            help="What is your project about. Max 255 characters"
            label="Project Description"
            v-model="form.description"
            type="textarea"
          />
        </FormField>

        <FormField label="Priority">
          <FormCheckRadioGroup
            type="radio"
            v-model="form.priority"
            name="Priority-checkbox"
            :options="{ low: 'Low', medium: 'Medium', high: 'High' }"
          />
        </FormField>

        <FormField label="Status">
          <FormCheckRadioGroup
            type="radio"
            v-model="form.status"
            name="Status-checkbox"
            :options="{ open: 'Open', inProgress: 'In Progress', closed: 'Closed' }"
          />
        </FormField>

        <FormField label="Add Member">
          <FormControl placeholder="Add Member" v-model="form.addMember" :icon="mdiAccount" />
        </FormField>

        <FormField label="Remove Member">
          <FormControl placeholder="Remove Member" v-model="form.removeMember" :icon="mdiAccount" />
        </FormField>

        <FormField label="Deadline">
          <FormControl v-model="form.deadline" :icon="mdiClockTimeEightOutline" type="date" />
        </FormField>
        <BaseDivider />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" @click="submit" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </Layout>
</template>
