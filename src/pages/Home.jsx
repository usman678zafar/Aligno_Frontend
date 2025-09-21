import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResumeUploader from "../components/Upload/ResumeUploader";
import JobDescInput from "../components/Upload/JobDescInput";
import { analyzeResume } from "../services/api";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Shield,
  AlertCircle,
  Loader,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({
    percentage: 0,
    stage: "",
    message: "",
  });

  // WebSocket connection for real-time progress updates
  useEffect(() => {
    let ws = null;
    if (isAnalyzing) {
      ws = new WebSocket("ws://localhost:8000/api/ws/analysis");
      
      ws.onopen = () => {
        console.log("WebSocket connected for progress updates");
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setProgress({
          percentage: data.percentage,
          stage: data.stage,
          message: data.message,
        });
      };
      
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      
      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };
    }
    
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [isAnalyzing]);

  const handleUploadSuccess = (data) => {
    setResumeData(data);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!resumeData || !jobDescription) {
      setError("Please upload a resume and enter a job description");
      return;
    }

    if (jobDescription.length < 50) {
      setError(
        "Please provide a more detailed job description (at least 50 characters)"
      );
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setProgress({ percentage: 0, stage: "Starting", message: "Initializing analysis..." });

    try {
      const response = await analyzeResume(
        resumeData.resume_id,
        jobDescription
      );

      if (response.data.success) {
        navigate("/dashboard", {
          state: {
            analysisId: response.data.analysis_id,
            matchScore: response.data.match_score,
          },
        });
      } else {
        throw new Error("Analysis failed");
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Analysis failed. Please check your internet connection and try again.";
      setError(errorMessage);
      setProgress({ percentage: 0, stage: "", message: "" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const features = [
    "AI-powered resume analysis",
    "ATS compatibility check",
    "Keyword optimization",
    "Custom interview questions",
    "Actionable improvements",
    "Real-time scoring",
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          {/* Animated Aligno Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 rounded-3xl border border-purple-500/30 backdrop-blur-xl">
              <div className="relative">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 animate-float"
                >
                  <defs>
                    <linearGradient
                      id="alignoGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" style={{ stopColor: "#a78bfa" }} />
                      <stop offset="100%" style={{ stopColor: "#f472b6" }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M10 30L40 10L70 30"
                    stroke="url(#alignoGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 50L40 70L70 50"
                    stroke="url(#alignoGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="12"
                    fill="url(#alignoGradient)"
                    opacity="0.9"
                  />
                  <circle cx="40" cy="40" r="6" fill="white" />
                </svg>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                <Zap className="absolute -bottom-2 -left-2 w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-bold text-white mb-2">
          Welcome to <span className="gradient-text">Aligno</span>
        </h1>
        <p className="text-xl text-purple-300 mb-4 font-medium">
          Align Your Resume with Success
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Optimize your resume for any job with our advanced AI analysis. Get
          instant feedback, ATS scoring, and tailored suggestions that align
          perfectly with your dream job requirements.
        </p>
      </div>

      {/* Progress Bar (shown during analysis) */}
      {isAnalyzing && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Loader className="animate-spin text-purple-400" size={20} />
              <span className="text-white font-medium">{progress.stage}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{progress.message}</p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="backdrop-blur-lg bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-400 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 backdrop-blur-lg bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all"
          >
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-white">{feature}</span>
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400">Step 1:</span> Upload Resume
          </h2>
          <ResumeUploader onUploadSuccess={handleUploadSuccess} />
          {resumeData && (
            <div className="mt-4 p-3 backdrop-blur-lg bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-sm flex items-center gap-2">
                <CheckCircle size={16} />
                Resume uploaded successfully: {resumeData.filename}
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400">Step 2:</span> Job Description
          </h2>
          <JobDescInput value={jobDescription} onChange={setJobDescription} />
        </div>
      </div>

      {/* Analyze Button */}
      <div className="text-center">
        <button
          onClick={handleAnalyze}
          disabled={!resumeData || !jobDescription || isAnalyzing}
          className={`
            px-8 py-4 rounded-xl font-semibold text-lg
            flex items-center gap-3 mx-auto
            transition-all transform hover:scale-105
            ${
              resumeData && jobDescription && !isAnalyzing
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Aligning Your Resume ({progress.percentage}%)...
            </>
          ) : (
            <>
              Start Alignment
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;
