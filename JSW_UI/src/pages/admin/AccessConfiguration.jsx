import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Save, Lock } from "lucide-react";
import appConfig from "../../config/appConfig";
import { accessApi, usersApi } from "../../services/api";

export default function AccessConfiguration() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedKeysByUser, setSelectedKeysByUser] = useState({});
  const [loadedUserIds, setLoadedUserIds] = useState(new Set());
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const assignableUsers = useMemo(
    () =>
      users.filter((user) =>
        appConfig.roleGroups.assignableAccess.includes(
          String(user.role).toLowerCase(),
        ),
      ),
    [users],
  );

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId),
    [selectedUserId, users],
  );
  const selectedKeys = selectedKeysByUser[selectedUserId] || [];

  const loadInitialData = async () => {
    setLoading(true);
    setError("");

    try {
      const [userData, pageData] = await Promise.all([
        usersApi.list(),
        accessApi.allPages(),
      ]);
      const nextUsers = userData.users || [];
      const nextAssignableUsers = nextUsers.filter((user) =>
        appConfig.roleGroups.assignableAccess.includes(
          String(user.role).toLowerCase(),
        ),
      );
      setUsers(nextUsers);
      setPages(pageData.pages || []);

      if (!selectedUserId && nextAssignableUsers[0]) {
        setSelectedUserId(nextAssignableUsers[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!selectedUserId || loadedUserIds.has(selectedUserId)) return;

    accessApi
      .userPages(selectedUserId)
      .then((data) => {
        setSelectedKeysByUser((prev) => ({
          ...prev,
          [selectedUserId]: (data.pages || []).map((page) => page.key),
        }));
        setLoadedUserIds((prev) => new Set(prev).add(selectedUserId));
      })
      .catch((err) => setError(err.message));
  }, [loadedUserIds, selectedUserId]);

  const togglePage = (pageKey) => {
    setSelectedKeysByUser((prev) => {
      const currentKeys = prev[selectedUserId] || [];
      return {
        ...prev,
        [selectedUserId]: currentKeys.includes(pageKey)
          ? currentKeys.filter((key) => key !== pageKey)
          : [...currentKeys, pageKey],
      };
    });
  };

  const saveAccess = async () => {
    setError("");
    setMessage("");

    try {
      const assignableKeys = pages
        .filter((page) => page.assignable)
        .map((page) => page.key);
      const pageKeys = selectedKeys.filter((key) =>
        assignableKeys.includes(key),
      );
      await accessApi.updateUserPages(selectedUserId, pageKeys);
      setSelectedKeysByUser((prev) => ({
        ...prev,
        [selectedUserId]: pageKeys,
      }));
      setMessage("Access updated.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Access Configuration</h1>
          <p className="text-sm text-gray-500">Choose which sidebar sections each user can see.</p>
        </div>
        <button
          onClick={loadInitialData}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* User selector */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select User</p>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-100"
          >
            {assignableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
          {selectedUser && (
            <div className="rounded-md bg-gray-50 border border-gray-200 px-3 py-2">
              <p className="text-xs font-semibold text-gray-700">{selectedUser.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{selectedUser.email}</p>
            </div>
          )}
          {assignableUsers.length === 0 && (
            <p className="rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700">
              Create a normal user from User Management to assign sidebar access.
            </p>
          )}
        </div>

        {/* Permissions */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Page Permissions</p>
            {selectedUserId && (
              <span className="text-xs text-gray-400">
                {pages.filter((p) => p.assignable && selectedKeys.includes(p.key)).length} / {pages.filter((p) => p.assignable).length} selected
              </span>
            )}
          </div>

          <div className="p-5">
            <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
              {pages.map((page) => (
                <label
                  key={page.key}
                  className={`flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors ${
                    !page.assignable
                      ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "border-gray-200 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(page.key)}
                    onChange={() => togglePage(page.key)}
                    disabled={!page.assignable || !selectedUserId}
                    className="h-4 w-4 accent-blue-700 flex-shrink-0"
                  />
                  <span className="flex-1 text-gray-700">{page.label}</span>
                  {!page.assignable && (
                    <span className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Lock size={10} /> Admin
                    </span>
                  )}
                </label>
              ))}
            </div>

            {(message || error) && (
              <p className={`mt-4 rounded-md px-3 py-2 text-sm ${error ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
                {error || message}
              </p>
            )}

            <div className="flex justify-end mt-5 pt-4 border-t border-gray-100">
              <button
                onClick={saveAccess}
                disabled={!selectedUserId || loading}
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: "rgb(22, 70, 161)" }}
              >
                <Save size={15} /> Save Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
