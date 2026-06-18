import React from "react";

export default function Tag({ color, label }) {
  return (
    <span
      style={{ backgroundColor: `${color}20`, color }}
      className="rounded-full px-4 py-1 text-sm font-bold capitalize "
    >
      {label}
    </span>
  );
}
