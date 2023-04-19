const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Projects
const projectSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },

    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("Project", projectSchema);
