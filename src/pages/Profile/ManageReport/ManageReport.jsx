import Reports2 from '../../Reports/Reports2';

const ManageReport = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Manage Your Reports</h2>
      <Reports2 manageMode={true} />
    </>
  );
};

export default ManageReport;
