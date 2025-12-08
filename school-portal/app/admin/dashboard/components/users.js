import { useState, useEffect } from "react";
import Alert from "../../../../components/Alert.js";

const ROLES = ["Admin", "Editor", "Viewer"]; // Role options

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 5;

  const [searchQuery, setSearchQuery] = useState("");

  const triggerAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
  };

  // Dummy Users
  const DUMMY_USERS = [
    { _id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { _id: 2, name: "Bob", email: "bob@example.com", role: "Editor" },
    { _id: 3, name: "Charlie", email: "charlie@example.com", role: "Viewer" },
    { _id: 4, name: "David", email: "david@example.com", role: "Admin" },
    { _id: 5, name: "Eve", email: "eve@example.com", role: "Editor" },
    { _id: 6, name: "Frank", email: "frank@example.com", role: "Viewer" },
    { _id: 7, name: "Grace", email: "grace@example.com", role: "Admin" },
  ];

  // Load users (simulate API)
  const loadUsers = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 500));
      setUsers(DUMMY_USERS);
    } catch (err) {
      triggerAlert("error", "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = () => {
    if (!userFormData.name.trim() || !userFormData.email.trim()) {
      triggerAlert("error", "Name and Email are required");
      return;
    }

    const newUser = { _id: users.length + 1, ...userFormData };
    setUsers([newUser, ...users]);
    triggerAlert("success", "User created successfully");
    setShowUserModal(false);
    setUserFormData({ name: "", email: "", role: "" });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user._id !== id));
    triggerAlert("success", "User deleted successfully");
  };

  // Search Filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">User Management</h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name, email, or role"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              onClick={() => setShowUserModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all font-semibold flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Create User</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-indigo-50 transition-all">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-2">
  {/* View */}
  <button
    onClick={() => alert(`Viewing ${user.name}`)}
    className="p-1 text-blue-500 hover:text-blue-700 rounded-full transition-colors"
    title="View"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  </button>

  {/* Edit */}
  <button
    onClick={() => {
      setUserFormData(user);
      setShowUserModal(true);
    }}
    className="p-1 text-yellow-500 hover:text-yellow-700 rounded-full transition-colors"
    title="Edit"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  </button>

  {/* Delete */}
  <button
    onClick={() => handleDeleteUser(user._id)}
    className="p-1 text-red-500 hover:text-red-700 rounded-full transition-colors"
    title="Delete"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2v0a2 2 0 002 2h4a2 2 0 002-2v0a2 2 0 00-2-2m-4 0v0" />
    </svg>
  </button>
</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {filteredUsers.length > USERS_PER_PAGE && (
              <div className="flex justify-end items-center space-x-2 mt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1 ? "bg-indigo-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 mt-0">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Create New User</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Name *</label>
                <input
                  type="text"
                  value={userFormData.name}
                  onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                <input
                  type="email"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Role</label>
                <select
                  value={userFormData.role}
                  onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                >
                  <option value="">Select role</option>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex items-center justify-end space-x-3 border-t">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Component */}
      <Alert
        type={alertType}
        title={`${alertType.charAt(0).toUpperCase() + alertType.slice(1)} Alert`}
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
        autoClose={5000}
      />
    </div>
  );
}
