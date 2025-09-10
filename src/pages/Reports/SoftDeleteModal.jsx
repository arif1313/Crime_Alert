// SoftDeleteModal.js
import PropTypes from "prop-types";

const SoftDeleteModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-96">
        <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete this report? This action can be undone
          only by restoring.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="btn btn-sm bg-gray-200 border-gray-400 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-sm bg-red-100 border-red-500 text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

SoftDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default SoftDeleteModal;
