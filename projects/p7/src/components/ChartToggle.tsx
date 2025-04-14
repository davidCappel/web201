"use client";

import React from 'react';
import Toggle from 'react-toggle'
import 'react-toggle/style.css';

interface ChartToggleProps {
  showCharts: boolean;
  setShowCharts: (show: boolean) => void;
}

const ChartToggle: React.FC<ChartToggleProps> = ({ showCharts, setShowCharts }) => {
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <label htmlFor="chart-toggle" className="text-sm font-medium text-gray-700">
          Show Data Visualizations
        </label>
        <Toggle
          id="chart-toggle"
          checked={showCharts}
          onChange={(e) => setShowCharts(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default ChartToggle;