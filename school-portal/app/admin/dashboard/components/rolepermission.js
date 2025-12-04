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

const groupPermissionsByModule = (permissions) => {
  const grouped = {};

  permissions.forEach((perm) => {
    const moduleName = perm.module || "general"; // fallback
    if (!grouped[moduleName]) grouped[moduleName] = [];
    grouped[moduleName].push(perm);
  });

  return grouped;
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
  const [openMenu, setOpenMenu] = useState(null); // roleId for 3-dots menu
  const [viewRole, setViewRole] = useState(null); // role being viewed
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [showPermissionWarning, setShowPermissionWarning] = useState(false);
  const [roleNameError, setRoleNameError] = useState("");

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

//bg colors array 
  const bgColors = [
  "bg-red-50",
  "bg-green-50",
  "bg-blue-50",
  "bg-yellow-50",
  "bg-purple-50",
  "bg-pink-50",
  "bg-indigo-50",
  "bg-teal-50",
];

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
      console.log("Roles API response:", rolesData);
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
const handleCreateRole = async (flagWithoutPermission = false) => {
  try {
    if (!roleFormData.roleName.trim()) {
      setRoleNameError("Role Name is required");
      return;
    }

    const selectedPermissions = (roleFormData.permissions || []).filter(
      p => p && p.trim()
    );

    console.log("This is the flag without permission value", flagWithoutPermission , '  '  ,selectedPermissions.length);
    if (selectedPermissions.length == 0 && !flagWithoutPermission) {
      setShowPermissionWarning(true);
      return;
    }

    console.log("This is the Role Form Data" , roleFormData.roleName , roleFormData.roleDescription, selectedPermissions);
    const res = await fetch("/api/rbac/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roleName: roleFormData.roleName,
        roleDescription: roleFormData.roleDescription,
        permissions: selectedPermissions,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setAlertMessage("Role created successfully");
      triggerAlert("success");
      setShowRoleModal(false);

      setRoleFormData({
        roleName: "",
        roleDescription: "",
        permissions: [],
      });
    } else {
      setAlertMessage(parseMongoError(data.error || "Error creating role"));
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
  
        roles.map((role, index) => {
  const borderColor = colors[index % colors.length];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <div
      key={role._id}
      className={`p-4 rounded-lg relative border-l-4 ${borderColor} ${bgColor}`}
    >
      {/* 3 dots menu */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setOpenMenu(openMenu === role._id ? null : role._id)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ⋮
        </button>

        {openMenu === role._id && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-lg z-50">
            <button
              onClick={() => {
                setViewRole(role);
                setOpenMenu(null);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              View Permissions
            </button>
          </div>
        )}
      </div>

      {/* Role Info */}
      <h4 className="font-semibold text-gray-900">{role.name}</h4>
      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
      <p className="text-xs text-gray-500 mt-2">0 Users assigned</p>
    </div>
  );
})


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
                     onChange={(e) => {
      setRoleFormData({ ...roleFormData, roleName: e.target.value });
      if (roleNameError) setRoleNameError(""); // Error clear kar do jaise hi type kare
    }}
                  placeholder="e.g., Department Head, Accountant"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />
                  {roleNameError && <p className="text-red-500 text-sm mt-1">{roleNameError}</p>}
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
              onClick={() => handleCreateRole(false)}
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


      {/* Show Permission warning Modal*/}
{showPermissionWarning && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 space-y-4">
      <h3 className="text-lg font-bold text-yellow-800">⚠ No Permissions Selected</h3>
      <p className="text-gray-700">
        You are creating the role without any permissions. You can edit permissions later.
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setShowPermissionWarning(false)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleCreateRole(true); // Proceed anyway
            setShowPermissionWarning(false);
            }}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded hover:shadow-lg font-semibold"
        >
          Proceed
        </button>
      </div>
    </div>
  </div>
)}


{/* View Permissions */}
{viewRole && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between rounded-t-xl shadow-md z-10">
        <h2 className="text-lg font-bold text-white">Permissions for {viewRole.name}</h2>
        <button
          onClick={() => setViewRole(null)}
          className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {(() => {
          // Define module colors
          const moduleColors = ['indigo', 'purple', 'pink', 'green', 'orange', 'blue', 'teal'];

          return Object.entries(groupPermissionsByModule(viewRole.permissions)).map(([module, perms], idx) => {
            const color = moduleColors[idx % moduleColors.length]; // pick color based on index

            return (
              <div
                key={module}
                className={`border-l-4 rounded-lg shadow-sm transition-shadow bg-${color}-50 border-${color}-500`}
              >
                <h3 className={`font-semibold capitalize text-gray-900 mb-2 px-4 py-2`}>{module}</h3>
                <ul className="ml-5 pr-4 pb-2 space-y-1">
                  {perms.map((perm) => (
                    <li
                      key={perm._id}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      <span className={`text-${color}-600 font-bold`}>➤</span>
                      <span className="text-gray-800">{perm.label || perm.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          });
        })()}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-gray-100 px-6 py-3 flex justify-end rounded-b-xl border-t">
        <button
          onClick={() => setViewRole(null)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>


  );
}

  