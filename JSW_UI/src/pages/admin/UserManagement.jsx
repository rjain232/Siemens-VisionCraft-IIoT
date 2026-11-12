import { useEffect, useState } from "react";
import { Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { usersApi } from "../../services/api";

const emptyForm = { name: "", email: "", password: "", role: "user" };

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmUser, setConfirmUser] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await usersApi.list();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editing) {
        const payload = { name: form.name, email: form.email, role: form.role };
        if (form.password) payload.password = form.password;
        await usersApi.update(editing.id, payload);
        setMessage("User updated.");
      } else {
        await usersApi.create(form);
        setMessage("User created.");
      }

      setForm(emptyForm);
      setEditing(null);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (user) => {
    setEditing(user);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const removeUser = async () => {
    if (!confirmUser) return;
    setError("");
    setMessage("");
    try {
      await usersApi.remove(confirmUser.id);
      setMessage("User deleted.");
      await loadUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirmUser(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            User Management
          </h1>
          <p className="text-sm text-gray-500">
            Create admin and user accounts.
          </p>
        </div>
        <button
          onClick={loadUsers}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <form
        onSubmit={submit}
        className="grid gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-5"
      >
        <input
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder={editing ? "New password optional" : "Password"}
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required={!editing}
        />
        <select
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "rgb(22, 70, 161)" }}>
          {editing ? <Save size={16} /> : <Plus size={16} />}{" "}
          {editing ? "Save" : "Create"}
        </button>
      </form>

      {(message || error) && (
        <p
          className={`rounded-md px-3 py-2 text-sm ${error ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}`}
        >
          {error || message}
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3 capitalize text-gray-600">
                  {user.role}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => startEdit(user)}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmUser(user)}
                      className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {confirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100" style={{ backgroundColor: "rgb(22, 70, 161)" }}>
              <div className="flex items-center gap-2">
                <Trash2 size={16} className="text-white" />
                <h3 className="text-sm font-semibold text-white">Delete User</h3>
              </div>
              <button onClick={() => setConfirmUser(null)} className="text-white/70 hover:text-white text-lg leading-none">✕</button>
            </div>

            {/* Body */}
            <div className="px-5 py-5">
              <p className="text-sm text-gray-600 mb-3">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
              <div className="rounded-md bg-gray-50 border border-gray-200 px-4 py-3">
                <p className="text-sm font-semibold text-gray-800">{confirmUser.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{confirmUser.email}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setConfirmUser(null)}
                className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={removeUser}
                className="px-4 py-2 text-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
