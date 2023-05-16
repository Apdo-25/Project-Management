<!-- src/components/Board.vue -->
<template>
  <div class="flex h-full space-x-4">
    <Column
      v-for="(column, columnIndex) in columns"
      :key="column.id"
      :column="column"
      :columnIndex="columnIndex"
      @addCard="addCard"
      @moveCard="moveCard"
      @deleteCard="deleteCard"
    />
    <button @click="addColumn" class="bg-blue-500 text-white px-2 py-1 mt-2 rounded">
      Add Column
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useKanbanStore } from '@/stores/kanban'
import Column from './Column.vue'

export default {
  components: {
    Column
  },
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  setup() {
    const kanbanStore = useKanbanStore()

    const addCard = (columnIndex) => {
      const cardTitle = prompt('Enter a card title:')
      if (cardTitle) {
        kanbanStore.addCard(columnIndex, cardTitle)
      }
    }

    const moveCard = (moveInfo) => {
      kanbanStore.moveCard(moveInfo)
    }

    const deleteCard = (columnIndex, cardIndex) => {
      kanbanStore.deleteCard(columnIndex, cardIndex)
    }

    const addColumn = () => {
      const columnTitle = prompt('Enter a column title:')
      if (columnTitle) {
        kanbanStore.addColumn(columnTitle)
      }
    }

    return {
      addCard,
      moveCard,
      deleteCard,
      addColumn
    }
  }
}
</script>
