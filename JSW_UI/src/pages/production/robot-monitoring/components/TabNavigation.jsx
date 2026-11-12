import { Heart, Activity, AlertCircle, Layers } from "lucide-react";

const iconMap = {
  Heart,
  Activity,
  AlertCircle,
  Layers,
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
                ? "text-sky-600 border-sky-600 bg-sky-50/50"
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
