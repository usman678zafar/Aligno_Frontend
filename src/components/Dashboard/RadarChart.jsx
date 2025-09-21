import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

const RadarChartComponent = ({ data }) => {
  // Use actual data if provided, otherwise show a loading state
  const chartData = data || [];
  
  // If no data, show a placeholder
  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full h-96 backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-4">
          Skills Comparison
        </h3>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Loading analysis data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-semibold text-white mb-4">
        Skills Comparison
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "#9ca3af", fontSize: 12 }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#9ca3af" }}
          />
          <Radar
            name="Your Resume"
            dataKey="resume"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.3}
          />
          <Radar
            name="Job Requirements"
            dataKey="required"
            stroke="#ec4899"
            fill="#ec4899"
            fillOpacity={0.3}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(139,92,246,0.5)",
              borderRadius: "8px",
            }}
            formatter={(value) => `${value}%`}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
