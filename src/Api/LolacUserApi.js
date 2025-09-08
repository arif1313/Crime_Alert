import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/local-user", // তোমার backend base URL
  withCredentials: true,
});

// 1️⃣ Create LocalUser
export const createLocalUser = async (data) => {
  try {
    const res = await API.post("/create", data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 2️⃣ Get All LocalUsers
export const getAllLocalUsers = async () => {
  try {
    const res = await API.get("/search");
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 3️⃣ Get LocalUser by ID
export const getLocalUserById = async (id) => {
  try {
    const res = await API.get(`/search/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 4️⃣ Update LocalUser
export const updateLocalUser = async (id, data) => {
  try {
    const res = await API.put(`/update/${id}`, data);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 5️⃣ Soft Delete LocalUser
export const softDeleteLocalUser = async (id) => {
  try {
    const res = await API.delete(`/delete/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 6️⃣ Restore LocalUser
export const restoreLocalUser = async (id) => {
  try {
    const res = await API.patch(`/restore/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 7️⃣ Live Search LocalUsers
export const liveSearchLocalUsers = async (keyword) => {
  try {
    const res = await API.get(`/search/live?keyword=${keyword}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 8️⃣ Search by contactNumber
export const searchByContactNumber = async (contactNumber) => {
  try {
    const res = await API.get(`/search/contact?contactNumber=${contactNumber}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 9️⃣ Search by isDeleted
export const searchByIsDeleted = async (isDeleted) => {
  try {
    const res = await API.get(`/search/isDeleted?isDeleted=${isDeleted}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 🔟 Search by isBlocked
export const searchByIsBlocked = async (isBlocked) => {
  try {
    const res = await API.get(`/search/isBlocked?isBlocked=${isBlocked}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 1️⃣1️⃣ Block LocalUser
export const blockLocalUser = async (id) => {
  try {
    const res = await API.patch(`/block/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

// 1️⃣2️⃣ Unblock LocalUser
export const unblockLocalUser = async (id) => {
  try {
    const res = await API.patch(`/unblock/${id}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};
// 1️⃣3️⃣ Search LocalUser by userId
export const searchByUserId = async (userId) => {
  try {
    const res = await API.get(`/search/userId?userId=${userId}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

