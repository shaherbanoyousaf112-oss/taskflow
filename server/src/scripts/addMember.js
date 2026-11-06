require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Workspace = require("../models/Workspace");

const [workspaceId, email, role = "member"] = process.argv.slice(2);

const run = async () => {
  if (!workspaceId || !email) {
    console.log("Usage: node src/scripts/addMember.js <workspaceId> <email> <role>");
    process.exit(1);
  }

  if (!["admin", "member", "viewer"].includes(role)) {
    console.log("Role must be one of: admin, member, viewer");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new Error(`No user found with email ${email}`);

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error("Workspace not found");

  const existing = workspace.members.find(
    (m) => m.user.toString() === user._id.toString()
  );

  if (existing) {
    existing.role = role; // pehle se member hai to sirf role badal do
  } else {
    workspace.members.push({ user: user._id, role });
  }

  await workspace.save();
  console.log(`Done: ${email} is now "${role}" in "${workspace.name}"`);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});