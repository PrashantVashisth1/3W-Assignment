import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl max-h-[80vh] flex flex-col">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
            Point History for {userName}
          </Dialog.Title>
          <div className="overflow-y-auto flex-1 pr-2 -mr-2">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse p-4 bg-gray-100 rounded-lg">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : history.length === 0 ? (
              <p className="text-gray-500 text-center py-8 text-lg font-medium">
                No point history available
              </p>
            ) : (
              <div className="space-y-4">
                {history.map((record) => (
                  <div
                    key={record._id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div>
                      <span className="text-xl font-bold text-green-600">
                        +{record.points} points
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {new Date(record.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary w-full py-3"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}