const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member", "viewer"],
      default: "member",
    },
  },
  { _id: false } // har member ki alag _id nahi chahiye
);

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Workspace name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot be more than 200 characters"],
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [memberSchema],
  },
  { timestamps: true }
);

// "mere workspaces" wali query tez karne ke liye
workspaceSchema.index({ "members.user": 1 });

module.exports = mongoose.model("Workspace", workspaceSchema);