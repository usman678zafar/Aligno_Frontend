import React, { useState } from 'react';
import { ChevronRight, Lightbulb, Copy, Check } from 'lucide-react';

const SuggestionCard = ({ suggestion }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!suggestion) return null;

  return (
    <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/30 transition-all">
      <div 
        className="flex items-start gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Lightbulb className="text-purple-400" size={20} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-white">
              {suggestion.section || 'General Improvement'}
            </h4>
            <ChevronRight 
              className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} 
              size={20} 
            />
          </div>
          
          <p className="text-gray-400 text-sm">
            {suggestion.reason || 'Click to see improvement suggestion'}
          </p>
        </div>
      </div>

      {expanded && (
        <div className="mt-6 space-y-4 pl-14">
          {/* Original Version */}
          {suggestion.original && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-400 font-medium text-sm">Current Version</span>
              </div>
              <p className="text-gray-300 text-sm">{suggestion.original}</p>
            </div>
          )}

          {/* Improved Version */}
          {suggestion.improved && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-medium text-sm">Suggested Improvement</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(suggestion.improved);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs hover:bg-green-500/30 transition-all"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300 text-sm">{suggestion.improved}</p>
            </div>
          )}

          {/* Why This Is Better */}
          {suggestion.reason && (
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <span className="text-purple-400 font-medium text-sm">Why This Is Better</span>
              <p className="text-gray-300 text-sm mt-2">{suggestion.reason}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;
