import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MatchScore from "../components/Dashboard/MatchScore";
import RadarChart from "../components/Dashboard/RadarChart";
import SkillTags from "../components/Dashboard/SkillTags";
import ATSStatus from "../components/Dashboard/ATSStatus";
import { getAnalysis } from "../services/api";
import { FileText, Target, Brain, Shield, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const analysisId = location.state?.analysisId;
      if (!analysisId) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getAnalysis(analysisId);
        console.log("Analysis data received:", response.data.data);
        setAnalysis(response.data.data);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
        setError("Failed to load analysis results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [location, navigate]);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-white">Analyzing your resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-red-500/20 max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all mx-auto"
          >
            <RefreshCw size={18} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Extract data with defaults
  const matchAnalysis = analysis?.match_analysis || {};
  const atsResult = analysis?.ats_result || {};
  const radarData = analysis?.radar_data || [];
  const overallScore = matchAnalysis.overall_score || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Resume Analysis Dashboard
        </h1>
        <p className="text-gray-400">
          {matchAnalysis.summary || "Comprehensive analysis of your resume"}
        </p>
      </div>

      {/* Main Score Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-purple-500/20">
          <MatchScore score={overallScore} />
        </div>
        <RadarChart data={radarData} />
      </div>

      {/* Skills Analysis */}
      <div className="mb-8">
        <SkillTags
          matchedSkills={matchAnalysis.keyword_matches || []}
          missingSkills={matchAnalysis.missing_keywords || []}
          suggestions={matchAnalysis.skill_gaps || []}
        />
      </div>

      {/* ATS & Recommendations Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <ATSStatus atsResult={atsResult} />

        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="text-purple-400" size={20} />
            Key Strengths
          </h3>
          <ul className="space-y-2">
            {matchAnalysis.strengths && matchAnalysis.strengths.length > 0 ? (
              matchAnalysis.strengths.map((strength, i) => (
                <li
                  key={i}
                  className="text-gray-300 text-sm flex items-start gap-2"
                >
                  <span className="text-green-400 mt-1">•</span>
                  {strength}
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-sm">
                No specific strengths identified
              </li>
            )}
          </ul>
        </div>

        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Brain className="text-pink-400" size={20} />
            Areas to Improve
          </h3>
          <ul className="space-y-2">
            {matchAnalysis.weaknesses && matchAnalysis.weaknesses.length > 0 ? (
              matchAnalysis.weaknesses.map((weakness, i) => (
                <li
                  key={i}
                  className="text-gray-300 text-sm flex items-start gap-2"
                >
                  <span className="text-yellow-400 mt-1">•</span>
                  {weakness}
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-sm">
                No major improvements needed
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate(`/analysis/${location.state?.analysisId}`)}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/25"
        >
          View Detailed Suggestions
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all border border-white/20"
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
