import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import { createWorkspace } from "../../api/workspaceApi";
import getErrorMessage from "../../utils/getErrorMessage";

export default function CreateWorkspaceModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const workspace = await createWorkspace(form);
      toast.success("Workspace created");
      onCreated(workspace);
      setForm({ name: "", description: "" });
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Create workspace">
      <form onSubmit={handleSubmit}>
        <Input
          label="Workspace name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Marketing Team"
          maxLength={50}
          required
        />
        <Textarea
          label="Description (optional)"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What is this workspace for?"
          maxLength={200}
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}