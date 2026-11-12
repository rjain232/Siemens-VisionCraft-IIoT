import { Activity, SearchX } from "lucide-react";

const COLOR_MAP = {
  gray: { bg: "bg-gray-100", icon: "text-gray-400" },
  sky: { bg: "bg-sky-50", icon: "text-sky-400" },
  red: { bg: "bg-red-50", icon: "text-red-400" },
};

const EmptyState = ({
  icon: Icon = Activity,
  title,
  subtitle,
  color = "sky",
  className = "",
}) => {
  const { bg, icon } = COLOR_MAP[color] || COLOR_MAP.sky;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-12 text-center mt-4 ${className}`}
    >
      {Icon && (
        <div
          className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center mx-auto mb-3`}
        >
          <Icon size={22} className={icon} />
        </div>
      )}
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {subtitle && (
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export const SearchPromptState = ({ pageName }) => (
  <EmptyState title={`Select filters and click Search to view ${pageName} data`} />
);

export const NoDataState = ({ subtitle }) => (
  <EmptyState
    icon={SearchX}
    color="gray"
    title="No data found for the selected filters and date"
    subtitle={subtitle}
  />
);

export default EmptyState;