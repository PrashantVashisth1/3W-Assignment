import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function PointHistoryModal({
  isOpen,
  onClose,
  userId,
  userName,
}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId) {
      fetchHistory();
    }
  }, [isOpen, userId]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/points/history/${userId}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="card max-w-md w-full max-h-[80vh] overflow-hidden">
          <Dialog.Title className="text-lg font-medium mb-4">
            Point History for {userName}
          </Dialog.Title>
          <div className="overflow-y-auto max-h-[60vh]">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : history.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No point history available
              </p>
            ) : (
              <div className="space-y-3">
                {history.map((record) => (
                  <div
                    key={record._id}
                    className="border-b border-gray-100 pb-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-blue-600">
                        +{record.points} points
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(record.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary w-full"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
