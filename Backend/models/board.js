const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for kanban

const BoardSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  lists: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      cards: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          dueDate: { type: Date, required: false },
          comments: [
            {
              name: { type: String, required: true },
              description: { type: String, required: true },
              date: { type: Date, required: true },
              user: { type: String, required: true },
            },
          ],
          attachments: [
            {
              name: { type: String, required: true },
              description: { type: String, required: true },
              date: { type: Date, required: true },
              user: { type: String, required: true },
            },
          ],
          checklist: [
            {
              name: { type: String, required: true },
              description: { type: String, required: true },
              date: { type: Date, required: true },
              user: { type: String, required: true },
              checked: { type: Boolean, required: true },
            },
          ],
          date: { type: Date, required: true },
          user: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Board", BoardSchema);
