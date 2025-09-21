import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysis } from '../services/api';
import SuggestionCard from '../components/Analysis/SuggestionCard';
import InterviewQuestions from '../components/Analysis/InterviewQuestions';
import { ArrowLeft, FileText, Target, MessageSquare, Lightbulb, Download, Shield } from 'lucide-react';

const Analysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('suggestions');

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await getAnalysis(id);
        setAnalysis(response.data.data);
      } catch (error) {
        console.error('Failed to fetch analysis:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white">
          <p>Analysis not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        
        <h1 className="text-4xl font-bold text-white mb-2">Detailed Analysis</h1>
        <p className="text-gray-400">Personalized recommendations and insights</p>
      </div>

      {/* Summary Card */}
      <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Shield className="text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Analysis Summary</h2>
            <p className="text-gray-400">Overall Match Score: {analysis.match_analysis?.overall_score || 0}%</p>
          </div>
        </div>
        
        <p className="text-gray-300">
          {analysis.match_analysis?.summary || "Your resume shows good potential for this role. Focus on the suggestions below to improve your match score."}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab('suggestions')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === 'suggestions'
              ? 'bg-purple-600 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <Lightbulb size={18} />
          Improvement Suggestions
        </button>
        
        <button
          onClick={() => setActiveTab('interview')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === 'interview'
              ? 'bg-purple-600 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <MessageSquare size={18} />
          Interview Questions
        </button>
        
        <button
          onClick={() => setActiveTab('keywords')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === 'keywords'
              ? 'bg-purple-600 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <Target size={18} />
          Keyword Analysis
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'suggestions' && (
          <div className="space-y-6">
            {analysis.suggestions && analysis.suggestions.length > 0 ? (
              analysis.suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} />
              ))
            ) : (
              <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-purple-500/20">
                <div className="text-center">
                  <Lightbulb className="mx-auto text-purple-400 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-white mb-2">No Specific Suggestions</h3>
                  <p className="text-gray-400">Your resume is well-optimized for this position!</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'interview' && (
          <InterviewQuestions questions={analysis.interview_questions || []} />
        )}

        {activeTab === 'keywords' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Matched Keywords */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-green-500/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="text-green-400" size={20} />
                Matched Keywords ({analysis.match_analysis?.keyword_matches?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.match_analysis?.keyword_matches?.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30"
                  >
                    {keyword}
                  </span>
                )) || <p className="text-gray-400">No keywords matched</p>}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-red-500/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="text-red-400" size={20} />
                Missing Keywords ({analysis.match_analysis?.missing_keywords?.length || 0})
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.match_analysis?.missing_keywords?.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm border border-red-500/30"
                  >
                    {keyword}
                  </span>
                )) || <p className="text-gray-400">No missing keywords</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mt-12">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
        >
          <Download size={18} />
          Export Report
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
};

export default Analysis;
