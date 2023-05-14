const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Projects
const projectSchema = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    //ref board
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    // creator is the user who created the project
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // members are the users who are part of the project
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Export the model
module.exports = mongoose.model("Project", projectSchema);
