import React from "react";

const Spinner = ({ size = 28, center = true }) => {
  const spinnerEl = (
    <div
      style={{
        width: size,
        height: size,
        border: "3px solid #e5e7eb",
        borderTop: "3px solid #2563eb",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }}
    />
  );

  if (!center) return spinnerEl;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 60px)",
        width: "100%"
      }}
    >
      {spinnerEl}
    </div>
  );
};

export default Spinner;
