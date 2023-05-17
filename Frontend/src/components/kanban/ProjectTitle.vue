<script setup>
import BaseButton from '../BaseButton.vue'
import { mdiPencilOutline } from '@mdi/js'
import SectionTitleLineWithButton from '../SectionTitleLineWithButton.vue'
</script>
<template>
  <div class="flex items-center justify-between border-b border-gray-200 pb-8">
    <div class="flex items-center justify-end space-x-5">
      <BaseButton
        to="/KanbanBoard"
        :icon="mdiPencilOutline"
        label="Create a new tasks"
        color="contrast"
        rounded-full
        small
      />
    </div>
  </div>
</template>
