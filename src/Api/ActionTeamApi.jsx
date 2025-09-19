import api from "./Api";



// ✅ Create Action Team
export const createActionTeam = async (payload) => {
  const res = await api.post("/actionTeam/create", payload);
  return res.data;
};

// ✅ Get all Action Teams
export const getAllActionTeams = async () => {
  const res = await api.get("/actionTeam/search");
  return res.data;
};

// ✅ Get Action Team by ID
export const getActionTeamById = async (id) => {
  const res = await api.get(`/actionTeam/search/${id}`);
  return res.data;
};

// ✅ Update Action Team
export const updateActionTeam = async (id, payload) => {
  const res = await api.put(`/actionTeam/update/${id}`, payload);
  return res.data;
};

// ✅ Soft Delete Action Team
export const softDeleteActionTeam = async (id) => {
  const res = await api.delete(`/actionTeam/delete/${id}`);
  return res.data;
};

// ✅ Restore Action Team
export const restoreActionTeam = async (id) => {
  const res = await api.patch(`/actionTeam/restore/${id}`);
  return res.data;
};

// ✅ Block Action Team
export const blockActionTeam = async (id) => {
  const res = await api.patch(`/actionTeam/block/${id}`);
  return res.data;
};

// ✅ Unblock Action Team
export const unblockActionTeam = async (id) => {
  const res = await api.patch(`/actionTeam/unblock/${id}`);
  return res.data;
};

// ✅ Live search
export const liveSearchActionTeam = async (query) => {
  const res = await api.get(`/actionTeam/search/live?query=${query}`);
  return res.data;
};

// ✅ Search deleted teams
export const getDeletedActionTeams = async () => {
  const res = await api.get("/actionTeam/search/deleted");
  return res.data;
};

// ✅ Search blocked teams
export const getBlockedActionTeams = async () => {
  const res = await api.get("/actionTeam/search/blocked");
  return res.data;
};
