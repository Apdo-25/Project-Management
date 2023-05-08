<!-- src/views/Kanban.vue -->
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
  
  <script>
  import Layout from '@/layouts/Layout.vue'
  import SectionMain from '@/components/SectionMain.vue'
  import Board from "../components/Board.vue";
  
  export default {
    components: {
      Layout,
      SectionMain,
      Board,
    },
    data() {
      return {
        columns: [
          // Example columns and cards
          {
            id: 1,
            title: "To Do",
            cards: [
              { id: 11, title: "Task 1", description: "Description for Task 1" },
              { id: 12, title: "Task 2", description: "Description for Task 2" },
            ],
          },
          {
            id: 2,
            title: "In Progress",
            cards: [
              { id: 21, title: "Task 3", description: "Description for Task 3" },
            ],
          },
          {
            id: 3,
            title: "Done",
            cards: [
              { id: 31, title: "Task 4", description: "Description for Task 4" },
            ],
          },
        ],
      };
    },
  };
  </script>
  