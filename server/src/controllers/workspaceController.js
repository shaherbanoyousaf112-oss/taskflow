const Workspace = require("../models/Workspace");
const asyncHandler = require("../utils/asyncHandler");

// POST /api/workspaces
const createWorkspace = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const workspace = await Workspace.create({
    name,
    description,
    owner: req.user._id,
    members: [{ user: req.user._id, role: "owner" }], // banane wala khud owner
  });

  res.status(201).json({
    _id: workspace._id,
    name: workspace.name,
    description: workspace.description,
    memberCount: 1,
    role: "owner",
    createdAt: workspace.createdAt,
  });
});

// GET /api/workspaces  (sirf mere workspaces)
const getWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({ "members.user": req.user._id })
    .sort({ updatedAt: -1 })
    .lean();

  const result = workspaces.map((w) => ({
    _id: w._id,
    name: w.name,
    description: w.description,
    memberCount: w.members.length,
    role: w.members.find((m) => m.user.toString() === req.user._id.toString())
      .role,
    createdAt: w.createdAt,
  }));

  res.json(result);
});

// GET /api/workspaces/:id
const getWorkspace = asyncHandler(async (req, res) => {
  await req.workspace.populate("members.user", "name email");

  res.json({
    _id: req.workspace._id,
    name: req.workspace.name,
    description: req.workspace.description,
    members: req.workspace.members,
    role: req.memberRole,
    createdAt: req.workspace.createdAt,
  });
});

// PUT /api/workspaces/:id  (owner ya admin)
const updateWorkspace = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  req.workspace.name = name;
  if (description !== undefined) req.workspace.description = description;
  await req.workspace.save();

  res.json({
    _id: req.workspace._id,
    name: req.workspace.name,
    description: req.workspace.description,
  });
});

// DELETE /api/workspaces/:id  (sirf owner)
const deleteWorkspace = asyncHandler(async (req, res) => {
  await req.workspace.deleteOne();
  res.json({ message: "Workspace deleted" });
});

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
};