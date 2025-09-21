// ATS check results
import React from 'react';
import { Shield, Check, X, AlertCircle } from 'lucide-react';

const ATSStatus = ({ atsResult }) => {
  if (!atsResult) {
    return (
      <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-gray-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="text-gray-400" size={20} />
          ATS Check
        </h3>
        <p className="text-gray-400">No ATS data available</p>
      </div>
    );
  }

  const getStatusColor = () => {
    if (atsResult.passed) return 'text-green-400';
    return 'text-red-400';
  };

  const getStatusIcon = () => {
    if (atsResult.passed) {
      return <Check className="text-green-400" size={24} />;
    }
    return <X className="text-red-400" size={24} />;
  };

  return (
    <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Shield className="text-purple-400" size={20} />
        ATS Compatibility
      </h3>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-white">{atsResult.score}%</div>
          <div className={`text-sm ${getStatusColor()}`}>
            {atsResult.passed ? 'ATS Optimized' : 'Needs Improvement'}
          </div>
        </div>
        {getStatusIcon()}
      </div>
      
      {/* Score Breakdown */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Formatting</span>
            <span className="text-white">{atsResult.formatting_score}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              style={{ width: `${atsResult.formatting_score}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Keywords</span>
            <span className="text-white">{atsResult.keyword_density_score}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              style={{ width: `${atsResult.keyword_density_score}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Issues */}
      {atsResult.issues && atsResult.issues.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-yellow-400" size={16} />
            <span className="text-sm font-medium text-white">Issues Found</span>
          </div>
          <ul className="space-y-1">
            {atsResult.issues.map((issue, index) => (
              <li key={index} className="text-xs text-gray-400 flex items-start gap-1">
                <span className="text-yellow-400 mt-0.5">•</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSStatus;
