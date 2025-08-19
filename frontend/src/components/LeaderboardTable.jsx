import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function LeaderboardTable({ onRefresh }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [onRefresh]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded w-full mb-2"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                    user.rank === 1
                      ? "bg-yellow-100 text-yellow-800"
                      : user.rank === 2
                      ? "bg-gray-100 text-gray-800"
                      : user.rank === 3
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {user.rank}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.totalPoints}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
