import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, FileBarChart, Activity, PieChart } from "lucide-react";

import netLogo from "../../assets/Netp_Logo_2.10.png";
import schLogo from "../../assets/schaeffler.png";

const SYSTEMS = [
  {
    id: "oms",
    title: "OMS",
    subtitle: "Order Management System",
    path: "/login/oms",
    icon: Package,
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "svg",
    title: "Schaeffler VIN Generation System",
    subtitle: "SVGs",
    path: "/login/svg",
    icon: FileBarChart,
    gradient: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: "monitoring",
    title: "Live Monitoring",
    subtitle: "Real-time system monitoring",
    path: "/login/monitoring",
    icon: Activity,
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "reporting",
    title: "Reporting",
    subtitle: "Analytics and reports",
    path: "/login/reporting",
    icon: PieChart,
    gradient: "from-orange-500 to-red-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export default function MasterLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-8 mb-10"
        >
          <img src={schLogo} className="h-14 object-contain" />
          <div className="h-10 w-px bg-gray-300" />
          <img src={netLogo} className="h-14 object-contain" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            Master Login Dashboard
          </h1>
          <p className="text-slate-500 text-sm">Select a system to continue</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">
          {SYSTEMS.map((sys, index) => {
            const Icon = sys.icon;
            return (
              <motion.button
                key={sys.id}
                onClick={() => navigate(sys.path)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-200 text-left overflow-hidden transition-all"
              >
                {/* Gradient hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${sys.gradient} opacity-0 group-hover:opacity-10 transition`}
                />

                {/* Circle effect (top-right) */}
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${sys.gradient} opacity-0 group-hover:opacity-20 transition-all duration-300`}
                />

                {/* Icon */}
                <div
                  className={`${sys.iconBg} w-12 h-12 flex items-center justify-center rounded-xl mb-4 group-hover:scale-110 transition`}
                >
                  <Icon className={`w-6 h-6 ${sys.iconColor}`} />
                </div>

                {/* Text */}
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {sys.title}
                </h2>
                <p className="text-sm text-gray-500">{sys.subtitle}</p>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
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
