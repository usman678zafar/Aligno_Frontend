import React from 'react';
import { Briefcase } from 'lucide-react';

const JobDescInput = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-purple-600/50">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="text-purple-400" size={24} />
          <h3 className="text-xl font-semibold text-white">Job Description</h3>
        </div>
        
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-64 p-4 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all resize-none"
        />
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {value.length} characters
          </span>
          <span className="text-sm text-purple-400">
            Tip: Include the full job posting for best results
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescInput;
