import api from "./Api";

const demoReports = [
  {
    _id: "demo-1",
    reportTitle: "Street light outage near Dhanmondi Lake",
    reportDescription: "A dark stretch near the lake has made evening commutes feel unsafe for residents.",
    reportLocation: "Dhanmondi 8A, Dhaka",
    reportType: "theft",
    crimeDate: "2026-09-20",
    crimeTime: "21:10",
    status: "pending",
    reportImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-2",
    reportTitle: "Suspicious activity reported near Banani",
    reportDescription: "Residents noticed repeated suspicious movement around the parking area after midnight.",
    reportLocation: "Road 11, Banani, Dhaka",
    reportType: "other",
    crimeDate: "2026-09-19",
    crimeTime: "00:30",
    status: "reviewing",
    reportImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-3",
    reportTitle: "Vehicle vandalism near Gulshan 2",
    reportDescription: "Two parked vehicles were damaged overnight. CCTV footage has been shared with authorities.",
    reportLocation: "Gulshan 2, Dhaka",
    reportType: "vandalism",
    crimeDate: "2026-09-17",
    crimeTime: "02:15",
    status: "resolved",
    reportImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
  },
];

const readDemoReports = () => {
  const saved = localStorage.getItem("crime-alert-demo-reports");
  return saved ? JSON.parse(saved) : demoReports;
};

const writeDemoReports = (reports) => {
  localStorage.setItem("crime-alert-demo-reports", JSON.stringify(reports));
  return reports;
};

// ✅ Create report
export const createReport = async (payload) => {
  try {
    const res = await api.post("/report/create", payload);
    return res.data;
  } catch {
    const report = { ...payload, _id: `demo-${Date.now()}`, createdAt: new Date().toISOString() };
    writeDemoReports([report, ...readDemoReports()]);
    return { success: true, data: report, demo: true };
  }
};

// ✅ Update report
export const updateReport = async (id, payload) => {
  try {
    const res = await api.put(`/report/update/${id}`, payload);
    return res.data;
  } catch {
    const reports = readDemoReports().map((report) => report._id === id ? { ...report, ...payload } : report);
    writeDemoReports(reports);
    return { success: true, data: reports.find((report) => report._id === id), demo: true };
  }
 
};

// ✅ Soft delete report
export const softDeleteReport = async (id) => {
  try {
    const res = await api.patch(`/report/delete/${id}`);
    return res.data;
  } catch {
    writeDemoReports(readDemoReports().map((report) => report._id === id ? { ...report, isDeleted: true } : report));
    return { success: true, demo: true };
  }
};

// ✅ Restore report
export const restoreReport = async (id) => {
  try {
    const res = await api.patch(`/report/restore/${id}`);
    return res.data;
  } catch {
    writeDemoReports(readDemoReports().map((report) => report._id === id ? { ...report, isDeleted: false } : report));
    return { success: true, demo: true };
  }
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
  try {
    const res = await api.get("/report/search");
    return res.data;
  } catch {
    return { success: true, data: readDemoReports().filter((report) => !report.isDeleted), demo: true };
  }
};

// ✅ Get report by ID
export const getReportById = async (id) => {
  try {
    const res = await api.get(`/report/search/${id}`);
    return res.data;
  } catch {
    return { success: true, data: readDemoReports().find((report) => report._id === id), demo: true };
  }
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
  try {
    const res = await api.get("/report/combined/search", { params });
    return res.data;
  } catch {
    const normalized = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value)
    );
    const data = readDemoReports().filter((report) => {
      const haystack = [
        report.reportTitle,
        report.reportDescription,
        report.reportLocation,
        report.reportType,
      ].join(" ").toLowerCase();
      return (!normalized.q || haystack.includes(normalized.q.toLowerCase())) &&
        (!normalized.reportTitle || haystack.includes(normalized.reportTitle.toLowerCase())) &&
        (!normalized.reportLocation || report.reportLocation === normalized.reportLocation) &&
        (!normalized.reportType || report.reportType?.toLowerCase() === normalized.reportType.toLowerCase()) &&
        (!normalized.status || report.status?.toLowerCase() === normalized.status.toLowerCase());
    });
    return { success: true, data, demo: true };
  }
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

export const getReportsWithActionTaken = async () => {
  try {
    const res = await api.get("/report/with-action-taken");
    return res.data; // { success: true, data: [...] }
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};