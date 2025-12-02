import { useEffect, useState } from "react";
import Alert from "../../../../components/Alert.js";




const parseMongoError = (errorMessage) => {
  console.log("Original MongoDB Error Message:", errorMessage);
  // Detect duplicate key error (11000)
  if (errorMessage.includes("E11000") || errorMessage.includes("11000")) {
    console.log("Duplicate Key Error Detected");
    const match = errorMessage.match(/name:\s*"([^"]+)"/);

    const roleName = match ? match[1] : "This role";
    return `The role "${roleName}" already exists.`;
  }

  return errorMessage;
};


export default function RolePermission() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    roleDescription: "",
    permissions: [],
  });

  const triggerAlert  = (type) => {
    setAlertType(type);
    setShowAlert(true);
  };


  {/* Permissions Section with dynamic border colors */ }
  const colors = [
    "border-red-500",
    "border-green-500",
    "border-blue-500",
    "border-yellow-500",
    "border-purple-500",
    "border-pink-500",
    "border-indigo-500",
    "border-teal-500",
  ];

  const [loadingPermissions, setLoadingPermissions] = useState(false);

  useEffect(() => {
    if (showRoleModal) {
      setLoadingPermissions(true);
      fetch("/api/rbac/permissions")
        .then((res) => res.json())
        .then((data) => {
           console.log("Permissions API response:", data);
          if (data && data.permissions) {
            setPermissions(data.permissions);
          } else {
            setPermissions({});
          }
          setLoadingPermissions(false);
        })
        .catch((err) => {
          console.error("Failed to load permissions", err);
          setPermissions({});
          setLoadingPermissions(false);
        });
    }
  }, [showRoleModal]);

  // Load roles + permissions from API
const loadData = async () => {
  try {
    setLoading(true);
    const rolesRes = await fetch("/api/rbac/roles");
    const rolesData = await rolesRes.json();

    if (rolesData.success) {
      setRoles(rolesData.roles || []);
    }
  } catch (err) {
    console.error("Failed to load roles", err);
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
      body: JSON.stringify({
        roleName: roleFormData.roleName,
        roleDescription: roleFormData.roleDescription,
        permissions: roleFormData.permissions,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
    setAlertMessage("Role created successfully");
    triggerAlert ("success");
      setShowRoleModal(false);

      // Reset form
      setRoleFormData({
        roleName: "",
        roleDescription: "",
        permissions: [],
      });
    } else {
        const readable = parseMongoError(data.error || "Error creating role");
     
        setAlertMessage(readable);
        triggerAlert("error");

    }
  } catch (err) {
     triggerAlert("error", "Request failed: " + err.message);
  }
};


  return (
    <div className="p-6 space-y-6">
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

  {loading ? (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {roles.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No custom roles created yet.</p>
        </div>
      ) : (
        roles.map((role) => (
          <div key={role._id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900">{role.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{role.description}</p>
            <p className="text-xs text-gray-500 mt-2">Permissions:</p>
            <ul className="text-xs text-gray-700 list-disc ml-5 mt-1">
              {role.permissions.map((perm) => (
                <li key={perm._id}>{perm.name}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )}
</div>
</div>

      {/* Modal Create Role Start */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Create New Role</h2>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Role Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Role Name *</label>
                <input
                  type="text"
                  value={roleFormData.roleName}
                  onChange={(e) => setRoleFormData({ ...roleFormData, roleName: e.target.value })}
                  placeholder="e.g., Department Head, Accountant"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              {/* Role Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  value={roleFormData.roleDescription}
                  onChange={(e) => setRoleFormData({ ...roleFormData, roleDescription: e.target.value })}
                  placeholder="Describe the purpose of this role..."
                  rows="3"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              {/* Permissions Heading */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Permissions</h3>
              </div>

              {loadingPermissions ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                permissions &&
                Object.entries(permissions).map(([moduleName, perms], index) => {
                  const borderColor = colors[index % colors.length];

                  return (
                    <div
                      key={moduleName}
                      className={`border-l-4 ${borderColor} pl-4 mb-4 bg-gray-50 p-3 rounded-md`}
                    >
                      <h4 className="font-semibold mb-2 capitalize">{moduleName}</h4>
                      <div className="space-y-2">
                        {(Array.isArray(perms) ? perms : []).map((perm) => (
                          <label key={perm.name} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-gray-800 rounded focus:ring-2 focus:ring-gray-400"
                              value={perm.name}
                              checked={roleFormData.permissions?.includes(perm.name) || false}
                              onChange={(e) => {
                                const newPermissions = e.target.checked
                                  ? [...(roleFormData.permissions || []), perm.name]
                                  : (roleFormData.permissions || []).filter((p) => p !== perm.name);
                                setRoleFormData({ ...roleFormData, permissions: newPermissions });
                              }}
                            />
                            <span className="text-sm text-gray-800">{perm.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 px-6 py-4 flex items-center justify-end space-x-3 border-t">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRole}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Create Role End */}


      {/* Alert Component for showing alerts*/}
      <Alert
        type={alertType}
        title={`${alertType.charAt(0).toUpperCase() + alertType.slice(1)} Alert`}
        message={`${alertMessage}.`}
        show={showAlert}
        onClose={() => setShowAlert(false)}
        autoClose={5000}
      />


    </div>


  );
}

  