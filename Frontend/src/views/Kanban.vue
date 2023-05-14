<script>
import { computed } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import { useKanbanStore } from '@/stores/kanban'
import Layout from '@/layouts/Layout.vue'
import Board from '@/components/Board.vue'

export default {
  components: {
    SectionMain,
    Layout,
    Board
  },
  setup() {
    const kanbanStore = useKanbanStore()
    const columns = computed(() => kanbanStore.columns)

    return {
      columns
    }
  }
}
</script>

<template>
  <Layout>
    <SectionMain>
      <div class="p-4">
        <h1 class="text-3xl font-bold mb-4">Kanban Board</h1>
        <Board :columns="columns" />
      </div>
    </SectionMain>
  </Layout>
</template>
