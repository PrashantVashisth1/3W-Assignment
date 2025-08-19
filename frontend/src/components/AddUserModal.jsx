import { useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

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
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="card max-w-sm w-full">
          <Dialog.Title className="text-lg font-medium mb-4">
            Add New User
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
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
