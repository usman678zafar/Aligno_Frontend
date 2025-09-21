import React, { useEffect, useState } from 'react';

const MatchScore = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = () => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="relative w-80 h-80 mx-auto">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="160"
          cy="160"
          r="120"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="20"
          fill="none"
        />
        <circle
          cx="160"
          cy="160"
          r="120"
          stroke={getScoreColor()}
          strokeWidth="20"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-6xl font-bold text-white">{Math.round(animatedScore)}%</div>
        <div className="text-xl text-gray-400 mt-2">Match Score</div>
        <div className={`text-sm mt-1 ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          {score >= 80 ? 'Excellent Match!' : score >= 60 ? 'Good Match' : 'Needs Improvement'}
        </div>
      </div>
    </div>
  );
};

export default MatchScore;
