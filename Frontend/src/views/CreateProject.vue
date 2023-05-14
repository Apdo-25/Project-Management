<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import Layout from '@/layouts/Layout.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'

const selectOptions = [
  { id: 1, label: 'in progress' },
  { id: 2, label: 'Open' },
  { id: 3, label: 'Closed' }
]
const selectOptions1 = [
  { id: 1, label: 'Low' },
  { id: 2, label: 'Medium' },
  { id: 3, label: 'High' }
]
const form = reactive({
  name: 'John Doe',
  Description: 'john.doe@example.com',
  status: selectOptions[0],
  priority: selectOptions1[0],
  deadline: ''
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

const formStatusWithHeader = ref(true)

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
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Create a Project" main>
        <BaseButton
          href="/"
          :icon="mdiGithub"
          label="Back Home"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <FormField label="Grouped with icons">
          <FormControl v-model="form.name" :icon="mdiAccount" />
          <FormControl v-model="form.Description" type="text" :icon="mdiMail" />
          <FormField>
            <FormControl
              help="What is your project about. Max 255 characters"
              label="Project Description"
              v-model="form.Description"
              type="textarea"
              placeholder="Explain how we can help you"
            />
          </FormField>
        </FormField>

        <FormField label="Checkbox">
          <FormCheckRadioGroup
            v-model="form.priority"
            name="sample-checkbox"
            :options="{ lorem: 'Low', ipsum: 'Medium', dolore: 'HIgh' }"
          />
        </FormField>

        <FormField label="Checkbox">
          <FormCheckRadioGroup
            v-model="form.status"
            name="sample-checkbox"
            :options="{ lorem: 'Open', ipsum: 'In Progress', dolore: 'Closed' }"
          />
        </FormField>

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
