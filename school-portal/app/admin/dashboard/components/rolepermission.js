import { useEffect, useState } from "react";

export default function RolePermission() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    roleName: "",
    roleDescription: "",
    permissions: [],
  });

  // Load roles + permissions from API
  const loadData = async () => {
    try {
      setLoading(true);
      const [rolesRes, permRes] = await Promise.all([
        fetch("/api/rbac/roles"),
        fetch("/api/rbac/modules"),
      ]);
      const rolesData = await rolesRes.json();
      const permData = await permRes.json();
      if (rolesData.success) setRoles(rolesData.roles || []);
      if (permData.success) setPermissions(permData.modules || {});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Toggle permission in form
  const togglePermission = (permName) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permName)
        ? prev.permissions.filter((p) => p !== permName)
        : [...prev.permissions, permName],
    }));
  };

  // Handle create role
  const handleCreateRole = async () => {
    try {
      const res = await fetch("/api/rbac/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        loadData();
        setShowModal(false);
        setFormData({ roleName: "", roleDescription: "", permissions: [] });
      } else {
        alert(data.error || "Error creating role");
      }
    } catch (err) {
      alert("Request failed: " + err.message);
    }
  };

    const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'roles', label: 'Roles & Permissions', icon: '🔐' },
    { id: 'classes', label: 'Classes & Sections', icon: '🏫' },
    { id: 'students', label: 'Students', icon: '👨‍🎓' },
    { id: 'teachers', label: 'Teachers', icon: '👩‍🏫' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Roles & Permissions</h2>
                      <p className="text-sm text-gray-600 mt-1">Manage roles and assign permissions to users</p>
                    </div>
                    <button
                      onClick={() => setShowRoleModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center space-x-2"
                    >
                      <span>➕</span>
                      <span>Create New Role</span>
                    </button>
                  </div>

                  {/* Predefined Roles */}
                  <div className="mb-8">
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Predefined Roles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'SuperAdmin', description: 'Full system access', users: 1, color: 'red' },
                        { name: 'Admin', description: 'Administrative access', users: 5, color: 'orange' },
                        { name: 'Teacher', description: 'Classroom management', users: 147, color: 'blue' },
                        { name: 'Student', description: 'Student access', users: 2845, color: 'green' },
                        { name: 'Parent', description: 'Parent access', users: 1200, color: 'purple' },
                      ].map((role) => (
                        <div key={role.name} className={`border-l-4 border-${role.color}-500 bg-${role.color}-50 p-4 rounded-lg`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{role.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                              <p className="text-xs text-gray-500 mt-2">{role.users} users assigned</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">⋮</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Roles */}
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Custom Roles</h3>
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">No custom roles created yet. Click "Create New Role" to add one.</p>
                    </div>
                  </div>
                </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-indigo-600 px-6 py-4 text-white flex justify-between">
              <h2 className="font-bold">Create New Role</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Role Name */}
              <div>
                <label className="block font-semibold mb-1">Role Name *</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.roleName}
                  onChange={(e) =>
                    setFormData({ ...formData, roleName: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full border p-2 rounded"
                  value={formData.roleDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, roleDescription: e.target.value })
                  }
                />
              </div>

              {/* Permissions */}
              <div>
                <h3 className="font-bold mb-2">Permissions</h3>
                {Object.keys(permissions).length === 0 ? (
                  <p>Loading permissions...</p>
                ) : (
                  Object.entries(permissions).map(([moduleName, perms], i) => (
                    <div
                      key={moduleName}
                      className="border-l-4 border-indigo-500 pl-4 mb-4 bg-gray-50 p-3 rounded-md"
                    >
                      <h4 className="font-semibold mb-2 capitalize">{moduleName}</h4>
                      <div className="space-y-2">
                        {(Array.isArray(perms) ? perms : []).map((perm) => (
                          <label key={perm.name} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              className="w-5 h-5"
                              checked={formData.permissions.includes(perm.name)}
                              onChange={() => togglePermission(perm.name)}
                            />
                            <span>{perm.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 bg-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                disabled={!formData.roleName}
                onClick={handleCreateRole}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
