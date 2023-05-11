// src/store/kanban.ts
import { defineStore } from 'pinia';

interface Card {
  id: number;
  title: string;
  description: string;
}

interface Column {
  id: number;
  title: string;
  cards: Card[];
}

export const useKanbanStore = defineStore({
  id: 'kanban',

  state: (): { columns: Column[] } => ({
    columns: [
      // Example columns and cards
      {
        id: 1,
        title: 'To Do',
        cards: [
          { id: 11, title: 'Task 1', description: 'Description for Task 1' },
          { id: 12, title: 'Task 2', description: 'Description for Task 2' },
        ],
      },
      {
        id: 2,
        title: 'In Progress',
        cards: [
          { id: 21, title: 'Task 3', description: 'Description for Task 3' },
        ],
      },
      {
        id: 3,
        title: 'Done',
        cards: [
          { id: 31, title: 'Task 4', description: 'Description for Task 4' },
        ],
      },
    ],
  }),

  actions: {
    addCard(columnIndex: number, cardTitle: string) {
      const newCard: Card = {
        id: Date.now(),
        title: cardTitle,
        description: '',
      };
      this.columns[columnIndex].cards.push(newCard);
    },

    moveCard({
      fromColumnIndex,
      fromCardIndex,
      toColumnIndex,
      toCardIndex,
    }: {
      fromColumnIndex: number;
      fromCardIndex: number;
      toColumnIndex: number;
      toCardIndex: number;
    }) {
      const movedCard = this.columns[fromColumnIndex].cards.splice(fromCardIndex, 1)[0];
      this.columns[toColumnIndex].cards.splice(toCardIndex, 0, movedCard);
    },

    deleteCard(columnIndex: number, cardIndex: number) {
      this.columns[columnIndex].cards.splice(cardIndex, 1);
    },

    addColumn(columnTitle: string) {
      const newColumn: Column = {
        id: Date.now(),
        title: columnTitle,
        cards: [],
      };
      this.columns.push(newColumn);
    },
  },
});
