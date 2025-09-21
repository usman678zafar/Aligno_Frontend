import React, { useState } from 'react';
import { MessageSquare, ChevronDown, BookOpen, Star, Check } from 'lucide-react';

const InterviewQuestions = ({ questions = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Default questions if none provided
  const defaultQuestions = [
    "Tell me about yourself and your background.",
    "Why are you interested in this position?",
    "What are your greatest strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Do you have any questions for us?"
  ];

  const displayQuestions = questions.length > 0 ? questions : defaultQuestions;

  // Sample answers/tips for each question
  const getTips = (question) => {
    const tips = {
      default: [
        "Be specific and provide examples",
        "Keep your answer concise (2-3 minutes)",
        "Relate your answer back to the job requirements",
        "Show enthusiasm and genuine interest"
      ]
    };

    return tips.default;
  };

  return (
    <div className="space-y-4">
      <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="text-purple-400" size={24} />
          <h3 className="text-xl font-semibold text-white">Interview Preparation</h3>
        </div>
        <p className="text-gray-400">
          Practice these questions tailored to your resume and the job description.
        </p>
      </div>

      {displayQuestions.map((question, index) => (
        <div
          key={index}
          className="backdrop-blur-lg bg-white/5 rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-400/30 transition-all"
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full p-5 text-left flex items-start gap-4 hover:bg-white/5 transition-all"
          >
            <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
              <Star className="text-purple-400" size={16} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium pr-4">
                  Question {index + 1}
                </h4>
                <ChevronDown
                  className={`text-gray-400 transition-transform ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </div>
              <p className="text-gray-300 mt-2">{question}</p>
            </div>
          </button>

          {expandedIndex === index && (
            <div className="px-5 pb-5 border-t border-white/10">
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="text-purple-400" size={16} />
                  <span className="text-purple-400 font-medium text-sm">Answer Tips</span>
                </div>
                
                <ul className="space-y-2">
                  {getTips(question).map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span className="text-gray-300 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <span className="text-purple-400 font-medium">Pro Tip:</span> Practice your answer out loud and time yourself. 
                    Aim for 2-3 minutes per response, focusing on specific examples from your experience.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* General Interview Tips */}
      <div className="mt-8 backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20">
        <h4 className="text-lg font-semibold text-white mb-4">General Interview Tips</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-green-500/20 rounded">
              <Check className="text-green-400" size={16} />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Research the Company</p>
              <p className="text-gray-400 text-xs mt-1">Know their products, culture, and recent news</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-1 bg-green-500/20 rounded">
              <Check className="text-green-400" size={16} />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Prepare Examples</p>
              <p className="text-gray-400 text-xs mt-1">Use the STAR method for behavioral questions</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-1 bg-green-500/20 rounded">
              <Check className="text-green-400" size={16} />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Ask Questions</p>
              <p className="text-gray-400 text-xs mt-1">Show interest by asking thoughtful questions</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-1 bg-green-500/20 rounded">
              <Check className="text-green-400" size={16} />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Follow Up</p>
              <p className="text-gray-400 text-xs mt-1">Send a thank-you email within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
