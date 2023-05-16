<!-- src/components/Column.vue -->
<template>
  <div class="flex flex-col h-full">
    <h2 class="text-xl font-bold mb-2">{{ column.title }}</h2>
    <div
      class="flex-1 overflow-y-auto space-y-2 min-h-[50px] bg-gray-200 p-2 rounded"
      @dragover.prevent
      @drop="dropCard"
    >
      <Card
        v-for="(card, cardIndex) in column.cards"
        :key="card.id"
        :card="card"
        :cardIndex="cardIndex"
        :columnIndex="columnIndex"
        @dragstart="dragCard"
        @delete="deleteCard"
      />
    </div>
    <button @click="addCard" class="bg-green-500 text-white px-2 py-1 mt-2 rounded">
      Add Card
    </button>
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  components: {
    Card
  },
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    addCard() {
      this.$emit('addCard', this.columnIndex)
    },
    dragCard(event, cardIndex) {
      // Handle drag start for a card
    },
    dropCard(event) {
      const jsonData = event.dataTransfer.getData('application/json')
      const { columnIndex: fromColumnIndex, cardIndex: fromCardIndex } = JSON.parse(jsonData)
      const toColumnIndex = this.columnIndex
      const toCardIndex = this.column.cards.length

      this.$emit('moveCard', {
        fromColumnIndex,
        fromCardIndex,
        toColumnIndex,
        toCardIndex
      })
    },
    deleteCard(cardIndex) {
      this.$emit('deleteCard', this.columnIndex, cardIndex)
    }
  }
}
</script>
