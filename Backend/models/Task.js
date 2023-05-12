const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Tasks
const taskSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 1000 },
    due_date: { type: Date, required: false },
    assigned_to: { type: Schema.Types.ObjectId, ref: "User" },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["New", "In Progress", "Completed"],
      default: "New",
    },
    priority: { type: Number, required: false, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("Task", taskSchema);
