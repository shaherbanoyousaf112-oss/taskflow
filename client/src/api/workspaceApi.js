import api from "./axios";

export const fetchWorkspaces = () =>
  api.get("/workspaces").then((res) => res.data);

export const createWorkspace = (data) =>
  api.post("/workspaces", data).then((res) => res.data);

export const fetchWorkspace = (id) =>
  api.get(`/workspaces/${id}`).then((res) => res.data);