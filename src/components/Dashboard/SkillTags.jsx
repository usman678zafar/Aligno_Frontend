import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const SkillTags = ({ matchedSkills, missingSkills, suggestions }) => {
  return (
    <div className="space-y-6">
      {/* Matched Skills */}
      {matchedSkills && matchedSkills.length > 0 && (
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-green-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Check className="text-green-400" size={20} />
            Matched Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30 hover:bg-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {missingSkills && missingSkills.length > 0 && (
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-red-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <X className="text-red-400" size={20} />
            Missing Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm border border-red-500/30 hover:bg-red-500/30 transition-all hover:shadow-lg hover:shadow-red-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="text-yellow-400" size={20} />
            Skills to Improve
          </h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm border border-yellow-500/30 hover:bg-yellow-500/30 transition-all hover:shadow-lg hover:shadow-yellow-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTags;
