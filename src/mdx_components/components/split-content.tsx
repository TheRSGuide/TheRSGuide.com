import React, { ReactNode } from "react";

// SplitItem component for individual content sections
export const SplitItem = ({
  children,
  width,
}: {
  children: ReactNode;
  width?: number;
}) => {
  const style = width
    ? {
        flex: `0 0 calc(${width}% - 0.5rem)`,
        minWidth: 0,
        maxWidth: `calc(${width}% - 0.5rem)`,
      }
    : {};

  const className = width ? "min-w-0" : "flex-1 min-w-0";

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

// SplitContent component for side-by-side layouts
export const SplitContent = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="flex gap-4 items-start flex-nowrap overflow-x-auto">
      {children}
    </div>
  );
};

// Center component for centering content horizontally
export const Center = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center">
      {children}
    </div>
  );
};
