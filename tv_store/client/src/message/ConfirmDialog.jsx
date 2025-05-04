import React from "react";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-sm z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800">{message}</h2>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-700/95  transition"
          >
            Xác nhận
          </button>
        </div>
      </div>

    </div>
  );
};

export default ConfirmDialog;
