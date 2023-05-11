const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Projects
const projectSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },

    // creator is the user who created the project
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    // members are the users who are part of the project
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Project", projectSchema);
