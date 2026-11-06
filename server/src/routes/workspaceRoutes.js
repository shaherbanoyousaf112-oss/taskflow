const express = require("express");
const { body } = require("express-validator");
const {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");
const { protect } = require("../middleware/authMiddleware");
const { workspaceAccess } = require("../middleware/workspaceAccess");
const validate = require("../middleware/validate");

const router = express.Router();

const workspaceRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Workspace name is required")
    .isLength({ max: 50 })
    .withMessage("Name cannot be more than 50 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description cannot be more than 200 characters"),
];

// Is file ke saare routes login mangte hain
router.use(protect);

router
  .route("/")
  .get(getWorkspaces)
  .post(workspaceRules, validate, createWorkspace);

router
  .route("/:id")
  .get(workspaceAccess(), getWorkspace)
  .put(workspaceAccess("owner", "admin"), workspaceRules, validate, updateWorkspace)
  .delete(workspaceAccess("owner"), deleteWorkspace);

module.exports = router;