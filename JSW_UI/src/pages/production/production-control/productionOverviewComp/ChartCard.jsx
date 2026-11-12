import { memo } from "react";

const ChartCard = memo(function ChartCard({
  title,
  shadow,
  children,
  bgColor,
  border,
  className,
}) {
  return (
    <div
      className={`bg-white p-4 rounded-lg h-full
        ${shadow ? "shadow-lg hover:shadow-xl" : ""}
        ${bgColor || ""}
        ${border || ""}
        ${className || ""}
      `}
    >
      {title && (
        <h2 className="text-base sm:text-lg font-bold mb-4 text-center text-blue-950 tracking-wide">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
});

export default ChartCard;
