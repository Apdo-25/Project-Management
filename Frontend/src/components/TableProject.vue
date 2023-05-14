<script setup>
import { computed, ref, onMounted } from 'vue'
import { mdiTableOff, mdiMonitorCellphone, mdiMonitor } from '@mdi/js'
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

const projectStore = useProjectStore()

onMounted(async () => {
  await projectStore.fetchProjects()

  //console
  console.log(projectStore.projects)
})

const isModalActive = ref(false)
const isModalDangerActive = ref(false)
const perPage = ref(5)
const currentPage = ref(0)
const checkedRows = ref([])

const numPages = computed(() => Math.ceil(projectStore.projects.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, project) => {
  if (isChecked) {
    checkedRows.value.push(project)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === project.id)
  }
}

const projectsPaginated = computed(() =>
  projectStore.projects.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
)
</script>

<template>
  <CardBox class="mb-6" has-table>
    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th />
          <th>Name</th>
          <th>Description</th>
          <th>Members</th>
          <th>Status</th>
          <th>Created</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projectsPaginated" :key="project.id">
          <TableCheckboxCell v-if="checkable" @checked="checked($event, project)" />
          <td class="border-b-0 lg:w-6 before:hidden">
            <UserAvatar :username="project.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
          </td>
          <td data-label="Name">
            {{ project.name }}
          </td>
          <td data-label="Company">
            {{ project.description }}
          </td>
          <td data-label="City">
            {{ project.members }}
          </td>
          <td data-label="Progress" class="lg:w-32">
            <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="project.status">
              {{ project.status }}
            </progress>
          </td>
          <td data-label="Created" class="lg:w-1 whitespace-nowrap">
            <small class="text-gray-500 dark:text-slate-400" :title="project.createdAt">
              {{ project.createdAt }}
            </small>
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="deleteProject(project)"
              />
              <BaseButton
                color="primary"
                :icon="mdiMonitor"
                small
                @click="updateProject(project)"
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'"
            small
            @click="currentPage = page"
          />
        </BaseButtons>
        <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </CardBox>

  <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" />

  <NotificationBar color="danger" :icon="mdiTableOff">
    <b>Empty table.</b> When there's nothing to show
  </NotificationBar>

  <CardBox>
    <CardBoxComponentEmpty />
  </CardBox>
</template>
