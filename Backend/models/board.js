const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const task = require("./Task");

// Schema board

const BoardSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  //ref project
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  // creator is the user who created the board
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // ref User
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // ref Task
  tasks: [
    {
      type: Schema.Types.ObjectId,

      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("Board", BoardSchema);
