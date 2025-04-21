import React from 'react';

type HeroStatsProps = {
  stats: {
    totalHeroes: number;
    highStrengthPercentage: number;
    highSpeedPercentage: number;
    overallSuccess: number;
    categories: string[];
  };
};

const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-md text-black p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Team Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-bold text-lg mb-2">Team Composition</h3>
          <p>Total Heroes: <span className="font-semibold">{stats.totalHeroes}</span></p>
          <p>Categories: <span className="font-semibold">{stats.categories.length ? stats.categories.join(', ') : 'None'}</span></p>
        </div>
        
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-bold text-lg mb-2">Attribute Distribution</h3>
          <p>High Strength: <span className="font-semibold">{stats.highStrengthPercentage.toFixed(1)}%</span></p>
          <p>High Speed: <span className="font-semibold">{stats.highSpeedPercentage.toFixed(1)}%</span></p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">Team Success Prediction</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${getSuccessColor(stats.overallSuccess)}`}
            style={{ width: `${stats.overallSuccess}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-sm">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        <p className="mt-2 text-center font-semibold">
          Predicted Success Rate: {stats.overallSuccess.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

// Helper function to determine the color based on success rate
function getSuccessColor(rate: number): string {
  if (rate < 30) return 'bg-red-500';
  if (rate < 60) return 'bg-yellow-500';
  return 'bg-green-500';
}

export default HeroStats;