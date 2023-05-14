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
      enum: ["In progress", "Open", "Closed"],
      default: "In progress",
    },

    // members are the users who are part of the project
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    deadline: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
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
