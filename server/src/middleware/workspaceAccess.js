const Workspace = require("../models/Workspace");
const asyncHandler = require("../utils/asyncHandler");

// Istemal: workspaceAccess()  ya  workspaceAccess("owner", "admin")
const workspaceAccess = (...allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      res.status(404);
      throw new Error("Workspace not found");
    }

    const member = workspace.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );

    if (!member) {
      res.status(403);
      throw new Error("You are not a member of this workspace");
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(member.role)) {
      res.status(403);
      throw new Error("You do not have permission to do this");
    }

    req.workspace = workspace;
    req.memberRole = member.role;
    next();
  });

module.exports = { workspaceAccess };