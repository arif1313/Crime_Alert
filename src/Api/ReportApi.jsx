import api from "./Api";

// ✅ Create report
export const createReport = async (payload) => {
  const res = await api.post("/report/create", payload);
  return res.data;
};

// ✅ Update report
export const updateReport = async (id, payload) => {
  const res = await api.put(`/report/update/${id}`, payload);
  return res.data;
 
};

// ✅ Soft delete report
export const softDeleteReport = async (id) => {
  const res = await api.patch(`/report/delete/${id}`);
  return res.data;
};

// ✅ Restore report
export const restoreReport = async (id) => {
  const res = await api.patch(`/report/restore/${id}`);
  return res.data;
};

// ✅ Block report
export const blockReport = async (id) => {
  const res = await api.patch(`/report/block/${id}`);
  return res.data;
};

// ✅ Unblock report
export const unblockReport = async (id) => {
  const res = await api.patch(`/report/unblock/${id}`);
  return res.data;
};

// ✅ Get all reports (excluding deleted)
export const getAllReports = async () => {
  const res = await api.get("/report/search");
  return res.data;
};

// ✅ Get report by ID
export const getReportById = async (id) => {
  const res = await api.get(`/report/search/${id}`);
  return res.data;
};

// ✅ Search by reportId
export const searchByReportId = async (reportId) => {
  const res = await api.get(`/report/search/reportId/${reportId}`);
  return res.data;
};

// ✅ Search by reporterId
export const searchByReporterId = async (reporterId) => {
  const res = await api.get(`/report/search/reporterId/${reporterId}`);
  return res.data;
};

// ✅ Search by type
export const searchByReportType = async (reportType) => {
  const res = await api.get(`/report/search/type/${reportType}`);
  return res.data;
};

// ✅ Search by status
export const searchByStatus = async (status) => {
  const res = await api.get(`/report/search/status/${status}`);
  return res.data;
};

// ✅ Search blocked reports
export const searchIsBlocked = async (isBlocked) => {
  const res = await api.get(`/report/search/is-blocked?isblocked=${isBlocked}`);
  return res.data;
};

// ✅ Search deleted reports
export const searchIsDeleted = async (isDeleted) => {
  const res = await api.get(`/report/search/is-deleted?isdelete=${isDeleted}`);
  return res.data;
};

// ✅ Live search by title
export const liveSearchByName = async (keyword) => {
  const res = await api.get(`/report/live/name?q=${keyword}`);
  return res.data;
};

// ✅ Live search by address
export const liveSearchByAddress = async (keyword) => {
  const res = await api.get(`/report/live/address?q=${keyword}`);
  return res.data;
};
// ✅ Combined search (type + title + location একসাথে)
export const combinedSearch = async (params) => {
  const res = await api.get("/report/combined/search", { params });
  return res.data;
};
// ✅ Search deleted reports by reporterId
export const searchDeletedByReporterId = async (reporterId) => {
  const res = await api.get(`/report/search/deleted/reporterId/${reporterId}`);
  return res.data;
};


// / ✅ Verify report (increments varifyNumber and adds user to verifiedBy)
export const verifyReport = async (id) => {
  const res = await api.patch(`/report/verify/${id}`);
  return res.data;
};