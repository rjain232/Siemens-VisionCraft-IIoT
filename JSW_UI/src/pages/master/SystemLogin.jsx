import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import netLogo from "../../assets/Netp_Logo_2.10.png";
import schLogo from "../../assets/schaeffler.png";

const SYSTEM_CONFIG = {
  oms: { heading: "OMS Login", redirect: null },
  svg: { heading: "Schaeffler VIN Generation System Login", redirect: null },
  monitoring: { heading: "Live Monitoring Login", redirect: null },
  reporting: { heading: "Reporting Login", redirect: "/dashboard" },
};

export default function SystemLogin() {
  const { systemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const config = SYSTEM_CONFIG[systemId] ?? SYSTEM_CONFIG.reporting;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      const redirectTo = location.state?.from?.pathname || config.redirect || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      {/* Container */}
      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col flex-1">
        {/* Back (FIXED ALIGNMENT) */}
        <div className="pt-6 mb-4">
          <button
            onClick={() => navigate("/master")}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Logos (IMPROVED SPACING) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            <img src={schLogo} className="h-12 object-contain" />
            <div className="h-8 w-px bg-gray-300" />
            <img src={netLogo} className="h-12 object-contain" />
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-200 p-8"
          >
            {/* Heading */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">
                {config.heading}
              </h1>
              <p className="text-slate-500 text-sm">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email / Username
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or username"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none"
                  />
                </div>
              </div>

              {/* Forgot */}
              {error && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer (IMPROVED) */}
        <div className="w-full flex justify-center py-6 mt-auto">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <img src={schLogo} alt="Schaeffler" className="h-10 w-auto" />
            <span>© 2026 All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
