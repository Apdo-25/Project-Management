<!-- src/components/Card.vue -->
<template>
    <div
      class="bg-white p-2 rounded shadow"
      draggable="true"
      @dragstart="dragstart"
      @dragend="dragend"
    >
      <div class="flex justify-between">
        <p>{{ card.title }}</p>
      <button @click="deleteCard" class="text-red-500">
        ×
      </button>
    </div>
    <p class="text-sm text-gray-600">{{ card.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    cardIndex: {
      type: Number,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    dragstart(event) {
      event.dataTransfer.setData(
        "application/json",
        JSON.stringify({ columnIndex: this.columnIndex, cardIndex: this.cardIndex })
      );
      event.dataTransfer.effectAllowed = "move";
    },
    dragend(event) {
      event.dataTransfer.clearData("application/json");
    },
    deleteCard() {
      this.$emit("delete", this.cardIndex);
    },
  },
};
</script>
