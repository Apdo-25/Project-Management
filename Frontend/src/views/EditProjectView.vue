<script setup>
import { reactive, ref } from 'vue'
import {
  mdiBallotOutline,
  mdiAccount,
  mdiTextAccount,
  mdiGithub,
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

const selectOptions1 = [
  { id: 1, label: 'Low' },
  { id: 2, label: 'Medium' },
  { id: 3, label: 'High' }
]

const selectOptions = [
  { id: 1, label: 'Open' },
  { id: 2, label: 'In Progress' },
  { id: 3, label: 'Closed' }
]
const form = reactive({
  name: '',
  Description: '',
  priority: selectOptions1[0],
  status: selectOptions[0],
  deadline: '',
  addMember: '',
  removeMeber: ''
})

const customElementsForm = reactive({
  checkbox: ['lorem'],
  radio: 'one',
  switch: ['one'],
  file: null
})

const submit = () => {
  //
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
          to="/projects"
          :icon="mdiGithub"
          label="Go Back To Project"
          color="contrast"
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
            v-model="form.Description"
            type="textarea"
          />
        </FormField>

        <FormField label="Priority">
          <FormCheckRadioGroup
            type="radio"
            v-model="selectOptions1"
            name="Priority-checkbox"
            :options="{ lorem: 'Low', ipsum: 'Medium', dolore: 'High' }"
          />
        </FormField>

        <FormField label="Status">
          <FormCheckRadioGroup
            type="radio"
            v-model="selectOptions"
            name="Status-checkbox"
            :options="{ lorem: 'Open', ipsum: 'In Progress', dolore: 'Closed' }"
          />
        </FormField>

        <FormField label="Add Member">
          <FormControl placeholder="Add Member" v-model="form.addMember" :icon="mdiAccount" />
        </FormField>

        <FormField label="Remove Member">
          <FormControl placeholder="Remove Member" v-model="form.removeMeber" :icon="mdiAccount" />
        </FormField>

        <FormField label="Deadline">
          <FormControl v-model="form.deadline" :icon="mdiClockTimeEightOutline" type="date"
        /></FormField>
        <BaseDivider />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </Layout>
</template>
