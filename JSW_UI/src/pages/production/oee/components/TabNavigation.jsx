import {
  TrendingUp,
  BarChart3,
  Heart,
  Activity,
  AlertCircle,
} from "lucide-react";

const iconMap = {
  TrendingUp,
  BarChart3,
  Heart,
  Activity,
  AlertCircle,
};

export default function TabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 mb-6 border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon =
          typeof tab.icon === "string" ? iconMap[tab.icon] : tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
              isActive
                ? "text-sky-600 border-sky-600 bg-[#C0272B/10]"
                : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50/50"
            }`}
          >
            {Icon && <Icon size={18} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export const oeeTabs = [
  { id: "overall", label: "Overall OEE", icon: TrendingUp },
  { id: "summary", label: "Production Summary", icon: BarChart3 },
];
