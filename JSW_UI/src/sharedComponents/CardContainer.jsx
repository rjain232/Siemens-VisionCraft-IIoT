import React, { forwardRef } from "react";

const CardContainer = forwardRef(({ title, children } ,ref) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4"
      style={{ overflow: "visible", position: "relative" }}
      ref={ref}
    >
      {title && (
        <h1 className="text-lg font-semibold text-gray-800 text-center mb-2 mt-2">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
});

export default CardContainer;
