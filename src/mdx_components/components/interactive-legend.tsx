'use client';

import React, { useState } from 'react';

interface LegendItem {
  id: string;
  name: string;
  description: string;
  hoverImage: string;
  icon?: string;
}

interface InteractiveLegendProps {
  baseImage: string;
  items: LegendItem[];
}

export const InteractiveLegend: React.FC<InteractiveLegendProps> = ({
  baseImage,
  items,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [lockedItem, setLockedItem] = useState<string | null>(null);

  const hasIcons = items.some((item) => item.icon && item.icon.trim() !== '');

  const handleMouseEnter = (itemId: string) => {
    if (!lockedItem) {
      setHoveredItem(itemId);
    }
  };

  const handleMouseLeave = () => {
    if (!lockedItem) {
      setHoveredItem(null);
    }
  };

  const handleRowClick = (itemId: string) => {
    if (lockedItem === itemId) {
      setLockedItem(null);
      setHoveredItem(null);
    } else {
      setLockedItem(itemId);
      setHoveredItem(itemId);
    }
  };

  const currentImage =
    lockedItem || hoveredItem
      ? items.find((item) => item.id === (lockedItem || hoveredItem))?.hoverImage || baseImage
      : baseImage;

  const getRowClasses = (itemId: string) => {
    const isLocked = lockedItem === itemId;
    const isHovered = hoveredItem === itemId;

    if (isLocked) {
      return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
    }
    if (isHovered) {
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
    return 'hover:bg-fd-muted/50';
  };

  return (
    <div className="select-none flex flex-col md:flex-row gap-4 my-4">
      {/* Image Section */}
      <div className="w-full md:w-1/3">
        <div className="relative w-full max-h-80 overflow-hidden rounded-lg border border-fd-border">
          <img
            src={currentImage}
            alt="Interactive view"
            className="w-full h-full object-cover select-none"
          />
        </div>
        <p className="mt-2 text-center text-xs text-fd-muted-foreground">
          <em>Hover to switch, click to lock view</em>
        </p>
      </div>

      {/* Table Section */}
      <div className="w-full md:w-2/3">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-fd-border bg-fd-muted/50">
              {hasIcons && (
                <th className="w-12 text-xs font-medium text-left p-2">Icon</th>
              )}
              <th className="text-xs font-medium text-left p-2">Name</th>
              <th className="text-xs font-medium text-left p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className={`cursor-pointer transition-colors duration-200 border-b border-fd-border ${getRowClasses(item.id)}`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRowClick(item.id)}
              >
                {hasIcons && (
                  <td className="font-medium text-center text-xl p-2">
                    {item.icon || ''}
                  </td>
                )}
                <td className="font-medium p-2">{item.name}</td>
                <td className="text-fd-muted-foreground p-2">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
