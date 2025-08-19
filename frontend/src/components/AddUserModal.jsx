import { useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddUserModal({ isOpen, onClose, onUserAdded }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`${API_URL}/users`, { name });
      onUserAdded();
      onClose();
      setName("");
    } catch (error) {
      setError("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl transform transition-transform duration-300 scale-95 md:scale-100">
          <Dialog.Title className="text-2xl font-bold mb-4 text-gray-900 text-center">
            Add New User
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input px-4 py-2 border-2 border-gray-300 rounded-md w-full focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add User"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}