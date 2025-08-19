// import { useState, useEffect } from "react";
// import axios from "axios";
// import LeaderboardTable from "./LeaderboardTable";
// import AddUserModal from "./AddUserModal";
// import PointHistoryModal from "./PointHistoryModal";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function LeaderboardSection() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
//   const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
//   const [historyUserId, setHistoryUserId] = useState(null);
//   const [historyUserName, setHistoryUserName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   useEffect(() => {
//     fetchUsers();
//   }, [refreshKey]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/users`);
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       showMessage("Failed to load users", "error");
//     }
//   };

//   const handleClaimPoints = async () => {
//     if (!selectedUser) {
//       showMessage("Please select a user first", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${API_URL}/points/claim/${selectedUser}`
//       );
//       showMessage(`Claimed ${response.data.pointsAwarded} points!`, "success");
//       setRefreshKey((prev) => prev + 1);
//     } catch (error) {
//       console.error("Error claiming points:", error);
//       showMessage("Failed to claim points", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showMessage = (text, type) => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage({ text: "", type: "" }), 3000);
//   };

//   const handleViewHistory = (userId, userName) => {
//     setHistoryUserId(userId);
//     setHistoryUserName(userName);
//     setIsHistoryModalOpen(true);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
//         <button
//           onClick={() => setIsAddUserModalOpen(true)}
//           className="btn btn-primary"
//         >
//           Add New User
//         </button>
//       </div>

//       <div className="card mb-6">
//         <div className="flex gap-4 items-center">
//           <select
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//             className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select a user</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleClaimPoints}
//             disabled={loading || !selectedUser}
//             className="btn btn-primary min-w-[120px]"
//           >
//             {loading ? "Claiming..." : "Claim Points"}
//           </button>
//         </div>
//         {message.text && (
//           <div
//             className={`mt-3 p-3 rounded ${
//               message.type === "error"
//                 ? "bg-red-100 text-red-700"
//                 : "bg-green-100 text-green-700"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="space-y-6">
//           <LeaderboardTable onRefresh={refreshKey} />
//         </div>
//         <div className="space-y-4">
//           <div className="card">
//             <h2 className="text-xl font-semibold mb-4">User Details</h2>
//             <div className="space-y-3">
//               {users.map((user) => (
//                 <div
//                   key={user._id}
//                   className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                 >
//                   <div>
//                     <p className="font-medium">{user.name}</p>
//                     <p className="text-sm text-gray-600">
//                       Points: {user.totalPoints}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleViewHistory(user._id, user.name)}
//                     className="btn btn-secondary text-sm"
//                   >
//                     View History
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <AddUserModal
//         isOpen={isAddUserModalOpen}
//         onClose={() => setIsAddUserModalOpen(false)}
//         onUserAdded={() => {
//           setRefreshKey((prev) => prev + 1);
//           showMessage("User added successfully!", "success");
//         }}
//       />

//       <PointHistoryModal
//         isOpen={isHistoryModalOpen}
//         onClose={() => setIsHistoryModalOpen(false)}
//         userId={historyUserId}
//         userName={historyUserName}
//       />
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import axios from "axios";
import LeaderboardTable from "./LeaderboardTable";
import AddUserModal from "./AddUserModal";
import PointHistoryModal from "./PointHistoryModal";

const API_URL = import.meta.env.VITE_API_URL;

export default function LeaderboardSection() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyUserId, setHistoryUserId] = useState(null);
  const [historyUserName, setHistoryUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showMessage("Failed to load users", "error");
    }
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      showMessage("Please select a user first", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/points/claim/${selectedUser}`
      );
      showMessage(`Claimed ${response.data.pointsAwarded} points!`, "success");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error claiming points:", error);
      showMessage("Failed to claim points", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleViewHistory = (userId, userName) => {
    setHistoryUserId(userId);
    setHistoryUserName(userName);
    setIsHistoryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-2xl">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Leaderboard</h1>
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Add New User
          </button>
        </header>

        <section className="mb-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner flex flex-col md:flex-row gap-4 items-center">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="flex-1 w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleClaimPoints}
              disabled={loading || !selectedUser}
              className="px-6 py-3 w-full md:w-auto min-w-[150px] font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-md shadow-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
            >
              {loading ? "Claiming..." : "Claim Points"}
            </button> 
          </div>
          {message.text && (
            <div
              className={`mt-4 p-4 rounded-lg text-sm font-medium ${
                message.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <LeaderboardTable onRefresh={refreshKey} />
          </div>
          <div className="space-y-4">
            <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">User Details</h2>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">
                        Points: <span className="font-medium text-gray-800">{user.totalPoints}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewHistory(user._id, user.name)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                      View History
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onUserAdded={() => {
            setRefreshKey((prev) => prev + 1);
            showMessage("User added successfully!", "success");
          }}
        />

        <PointHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
          userId={historyUserId}
          userName={historyUserName}
        />
      </div>
    </div>
  );
}