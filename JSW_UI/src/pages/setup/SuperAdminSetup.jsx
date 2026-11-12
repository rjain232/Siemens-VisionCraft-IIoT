import { useState } from "react";
import { KeyRound, Lock, Mail, User } from "lucide-react";
import { authApi, storeAuth } from "../../services/api";

export default function SuperAdminSetup() {
  const [form, setForm] = useState({
    setupKey: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authResult = await authApi.setupSuperAdmin(form);
      storeAuth(authResult);
      window.location.replace("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Superadmin Setup
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create the first controlled administrator account.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            icon={KeyRound}
            label="Setup Key"
            value={form.setupKey}
            onChange={(value) => updateField("setupKey", value)}
          />
          <Input
            icon={User}
            label="Name"
            value={form.name}
            onChange={(value) => updateField("name", value)}
          />
          <Input
            icon={Mail}
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) => updateField("email", value)}
          />
          <Input
            icon={Lock}
            label="Password"
            type="password"
            value={form.password}
            onChange={(value) => updateField("password", value)}
          />
        </div>

        {error && (
          <p className="mt-4 rounded-md bg-sky-50 px-3 py-2 text-sm text-sky-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Superadmin"}
        </button>
      </form>
    </div>
  );
}

function Input({ icon: Icon, label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="mt-1 flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus-within:border-sky-500 focus-within:bg-white">
        <Icon size={16} className="text-gray-400" />
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-sm outline-none"
          required
        />
      </span>
    </label>
  );
}
