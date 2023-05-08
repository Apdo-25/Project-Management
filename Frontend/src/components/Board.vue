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
  import Column from "./Column.vue";
  
  export default {
    components: {
      Column,
    },
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
        addCard(columnIndex) {
    const cardTitle = prompt("Enter card title");
    if (!cardTitle) return;
    const newCard = {
      id: Date.now(),
      title: cardTitle,
      description: "",
    };
    this.columns[columnIndex].cards.push(newCard);
  },
  moveCard({ fromColumnIndex, fromCardIndex, toColumnIndex, toCardIndex }) {
    const movedCard = this.columns[fromColumnIndex].cards.splice(fromCardIndex, 1)[0];
    this.columns[toColumnIndex].cards.splice(toCardIndex, 0, movedCard);
  },
  deleteCard(columnIndex, cardIndex) {
    this.columns[columnIndex].cards.splice(cardIndex, 1);
  },
  addColumn() {
    const columnTitle = prompt("Enter column title");
    if (!columnTitle) return;
    const newColumn = {
      id: Date.now(),
      title: columnTitle,
      cards: [],
    };
    this.columns.push(newColumn);
  },
    },
  };
  </script>
  