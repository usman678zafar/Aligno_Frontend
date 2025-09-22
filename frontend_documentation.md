# Frontend Project Documentation

This document contains all the source code from the React frontend project.

**Project Type:** React with Tailwind CSS
**Generated on:** D:\NexusNao\PROJECTS\Aligno\frontend

---

## 📑 Table of Contents

### ⚙️ Configuration Files
- `package.json`
- `tailwind.config.js`
- `postcss.config.js`

### 📁 Public Files
- `public\index.html`
- `public\manifest.json`

### 📦 Source Files
**src/**
  - `App.jsx`
  - `index.js`

**src\components\Analysis/**
  - `InterviewQuestions.jsx`
  - `SuggestionCard.jsx`

**src\components\Dashboard/**
  - `ATSStatus.jsx`
  - `MatchScore.jsx`
  - `RadarChart.jsx`
  - `SkillTags.jsx`

**src\components\Layout/**
  - `Footer.jsx`
  - `Header.jsx`

**src\components\Upload/**
  - `JobDescInput.jsx`
  - `ResumeUploader.jsx`

**src\pages/**
  - `Analysis.jsx`
  - `Dashboard.jsx`
  - `Home.jsx`

**src\services/**
  - `api.js`

**src\styles/**
  - `globals.css`

---

## 📝 Source Code

### ⚙️ Configuration Files

##### 📋 package.json

**Path:** `package.json`

**Package Information:**
- **Name:** aligno-frontend
- **Version:** 1.0.0
- **Dependencies:** 7 packages
- **Dev Dependencies:** 3 packages

```json
{
  "name": "aligno-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-router-dom": "^6.20.1",
    "axios": "^1.6.2",
    "recharts": "^2.10.3",
    "lucide-react": "^0.294.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

##### 📜 tailwind.config.js

**Path:** `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        pink: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
```

---

##### 📜 postcss.config.js

**Path:** `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### 📁 Public Directory

##### 🌐 index.html

**Path:** `public\index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#8b5cf6" />
    <meta name="description" content="Aligno - AI-powered Resume Optimizer | Align your resume with your dream job" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Aligno - AI Resume Optimizer</title>

    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
      }
    </style>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

---

##### 📋 manifest.json

**Path:** `public\manifest.json`

```json
{
  "short_name": "Aligno",
  "name": "Aligno - AI Resume Optimizer",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#8b5cf6",
  "background_color": "#1a1a2e",
  "description": "Align your resume perfectly with any job using AI-powered analysis and optimization"
}
```

---

### 📦 Source Files

##### ⚛️ App.jsx

**Path:** `src\App.jsx`

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis/:id" element={<Analysis />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

---

##### 📜 index.js

**Path:** `src\index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

#### 📂 src\components\Analysis

##### ⚛️ InterviewQuestions.jsx

**Path:** `src\components\Analysis\InterviewQuestions.jsx`

```jsx
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
```

---

##### ⚛️ SuggestionCard.jsx

**Path:** `src\components\Analysis\SuggestionCard.jsx`

```jsx
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
```

---

#### 📂 src\components\Dashboard

##### ⚛️ ATSStatus.jsx

**Path:** `src\components\Dashboard\ATSStatus.jsx`

```jsx
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
```

---

##### ⚛️ MatchScore.jsx

**Path:** `src\components\Dashboard\MatchScore.jsx`

```jsx
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
```

---

##### ⚛️ RadarChart.jsx

**Path:** `src\components\Dashboard\RadarChart.jsx`

```jsx
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
```

---

##### ⚛️ SkillTags.jsx

**Path:** `src\components\Dashboard\SkillTags.jsx`

```jsx
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
```

---

#### 📂 src\components\Layout

##### ⚛️ Footer.jsx

**Path:** `src\components\Layout\Footer.jsx`

```jsx
import React from "react";
import {
  Code2,
  Heart,
  ExternalLink,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Globe,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto relative">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
      </div>

      <div className="backdrop-blur-xl bg-black/30 border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo and Company Info */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  Powered by
                </span>
                <a
                  href="https://nexusnao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:scale-105 transition-all duration-300"
                  aria-label="NexusNao - Software Solutions Company"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30 group-hover:border-blue-400/50 transition-all group-hover:drop-shadow-[0_0_15px_rgba(30,136,229,0.5)]">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      NexusNao
                    </span>
                  </div>
                </a>
              </div>

              <p className="text-xs text-gray-500 text-center lg:text-left max-w-sm">
                Aligno - Aligning careers with opportunities through intelligent
                AI
              </p>
            </div>

            {/* Center - Features/Stats */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">AI Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">Perfect Alignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400">ATS Optimized</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 flex items-center gap-1">
                Built with{" "}
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                by NexusNao Team
              </p>
            </div>

            {/* Right Side - Social Links */}
            <div className="flex flex-col items-center lg:items-end gap-4">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/nexusnao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://linkedin.com/company/nexusnao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="mailto:support@nexusnao.com"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://nexusnao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                  aria-label="Website"
                >
                  <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright & Legal */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500 text-center md:text-left">
                © {new Date().getFullYear()} Aligno by NexusNao Software
                Solutions. All rights reserved.
              </p>

              <div className="flex items-center gap-6 text-xs">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 transition-colors hover:underline"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 transition-colors hover:underline"
                >
                  Terms of Service
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-400 transition-colors hover:underline"
                >
                  Cookie Policy
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Code2 className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">Aligno v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

---

##### ⚛️ Header.jsx

**Path:** `src\components\Layout\Header.jsx`

```jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, Sparkles } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Beautiful Aligno Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 rounded-xl">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M3 9L12 3L21 9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 15L12 21L21 15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" fill="white" opacity="0.9" />
                </svg>
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
                Aligno
              </span>
              <span className="text-xs text-gray-400 -mt-1">
                AI Resume Optimizer
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/")
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/dashboard")
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

---

#### 📂 src\components\Upload

##### ⚛️ JobDescInput.jsx

**Path:** `src\components\Upload\JobDescInput.jsx`

```jsx
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
```

---

##### ⚛️ ResumeUploader.jsx

**Path:** `src\components\Upload\ResumeUploader.jsx`

```jsx
import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { uploadResume, testConnection } from '../../services/api';

const ResumeUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    setError(null);
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['.pdf', '.docx'];
    
    const hasValidType = validTypes.includes(file.type);
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!hasValidType && !hasValidExtension) {
      setError('Please upload a PDF or DOCX file');
      return;
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setError(null);
    
    try {
      // First test connection
      await testConnection();
      
      // Upload resume
      console.log('Starting upload for:', file.name);
      const response = await uploadResume(file);
      console.log('Upload successful:', response.data);
      onUploadSuccess(response.data);
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          'Upload failed. Please ensure the backend server is running.';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12
          transition-all duration-300 backdrop-blur-lg
          ${dragActive ? 'border-purple-400 bg-purple-500/10' : 'border-purple-600/50 bg-white/5'}
          ${file ? 'bg-green-500/10 border-green-400' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="text-center">
            <Upload className="mx-auto h-16 w-16 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Drop your resume here
            </h3>
            <p className="text-gray-400 mb-4">or</p>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
              />
              <span className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all inline-block">
                Browse Files
              </span>
            </label>
            <p className="text-gray-500 text-sm mt-4">
              Supports PDF and DOCX (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="text-center">
            <FileText className="mx-auto h-16 w-16 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {file.name}
            </h3>
            <p className="text-gray-400 mb-4">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setFile(null);
                  setError(null);
                }}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
              >
                <X size={16} /> Remove
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Upload & Analyze
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
```

---

#### 📂 src\pages

##### ⚛️ Analysis.jsx

**Path:** `src\pages\Analysis.jsx`

```jsx
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
```

---

##### ⚛️ Dashboard.jsx

**Path:** `src\pages\Dashboard.jsx`

```jsx
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
```

---

##### ⚛️ Home.jsx

**Path:** `src\pages\Home.jsx`

```jsx
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
```

---

#### 📂 src\services

##### 📜 api.js

**Path:** `src\services\api.js`

```javascript
// frontend/src/services/api.js
// Enhanced API service with dynamic URL detection for Hugging Face Spaces
import axios from "axios";

// Dynamic API URL based on environment
const getAPIBaseURL = () => {
  // Production - point to your Hugging Face Space
  if (process.env.NODE_ENV === 'production') {

    return 'https://usman678zafar-aligno-backend.hf.space/health';
  }
  // Local development
  return 'http://localhost:8000';
};

const API_BASE_URL = getAPIBaseURL();

// Create axios instance with configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 60000, // 60 second timeout for long analyses
});

// Token management
let authToken = localStorage.getItem("authToken");

// Add request interceptor for debugging and auth
api.interceptors.request.use(
  (config) => {
    console.log("🚀 API Request:", config.method?.toUpperCase(), config.url);
    
    // Add auth token if available
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "❌ API Error:",
      error.response?.status,
      error.response?.data
    );
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      authToken = null;
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    
    if (error.response?.status === 429) {
      // Rate limiting
      error.message = "Too many requests. Please wait a moment and try again.";
    }
    
    if (error.code === "ECONNABORTED") {
      error.message = 
        "Request timeout. The analysis is taking longer than expected.";
    }
    
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authAPI = {
  register: async (email, password, name) => {
    const response = await api.post("/api/auth/register", {
      email,
      password,
      name,
    });
    return response;
  },
  
  login: async (email, password) => {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    
    // Store token
    if (response.data.access_token) {
      authToken = response.data.access_token;
      localStorage.setItem("authToken", authToken);
    }
    
    return response;
  },
  
  logout: () => {
    authToken = null;
    localStorage.removeItem("authToken");
  },
  
  getMe: async () => {
    return await api.get("/api/auth/me");
  },
  
  checkLimit: async () => {
    return await api.post("/api/auth/check-limit");
  },
};

// Resume operations
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  console.log("📤 Uploading file:", file.name, file.size, "bytes");
  
  return await api.post("/api/upload/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`Upload progress: ${percentCompleted}%`);
    },
  });
};

// Analysis operations with caching option
export const analyzeResume = async (
  resumeId,
  jobDescription,
  useCache = true
) => {
  console.log("🔍 Analyzing resume:", resumeId);
  return await api.post("/api/analyze", {
    resume_id: resumeId,
    job_description: jobDescription,
    use_cache: useCache,
  });
};

export const getAnalysis = async (analysisId) => {
  console.log("📊 Getting analysis:", analysisId);
  return await api.get(`/api/analysis/${analysisId}`);
};

// Enhanced ATS check
export const checkATSEnhanced = async (
  resumeId,
  jobDescription,
  atsSystem = "general"
) => {
  return await api.post("/api/ats/check-enhanced", {
    resume_id: resumeId,
    job_description: jobDescription,
    ats_system: atsSystem,
  });
};

export const generateInterviewQuestions = async (analysisId) => {
  return await api.post("/api/interview/generate", { analysis_id: analysisId });
};

export const getSuggestions = async (analysisId) => {
  return await api.post("/api/suggestions/improve", {
    analysis_id: analysisId,
  });
};

// Test endpoint
export const testConnection = async () => {
  try {
    const response = await api.get("/health");
    console.log("🏥 Health check:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Connection test failed:", error);
    throw error;
  }
};

// WebSocket connection for real-time updates with dynamic URL
export const createWebSocketConnection = (onMessage) => {
  // Determine WebSocket URL
  const getWebSocketURL = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      
      // Hugging Face Spaces
      if (hostname.includes('huggingface.co') || hostname.includes('hf.space')) {
        return `${protocol}//${window.location.host}/api/ws/analysis`;
      }
    }
    
    // Local development
    return 'ws://localhost:8000/api/ws/analysis';
  };
  
  const wsUrl = getWebSocketURL();
  console.log("🔌 Connecting to WebSocket:", wsUrl);
  
  const ws = new WebSocket(wsUrl);
  
  ws.onopen = () => {
    console.log("WebSocket connected");
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
  
  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
  
  ws.onclose = () => {
    console.log("WebSocket disconnected");
  };
  
  // Add reconnection logic for production
  ws.addEventListener('close', () => {
    if (typeof window !== 'undefined' && 
        (window.location.hostname.includes('huggingface.co') || 
         window.location.hostname.includes('hf.space'))) {
      // Attempt to reconnect after 3 seconds in production
      setTimeout(() => {
        console.log("Attempting to reconnect WebSocket...");
        createWebSocketConnection(onMessage);
      }, 3000);
    }
  });
  
  return ws;
};

// Export additional utilities
export const isProduction = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname.includes('huggingface.co') || hostname.includes('hf.space');
  }
  return false;
};

// Cache management utilities
export const cacheAPI = {
  // Clear all cached analyses
  clearCache: async () => {
    return await api.post("/api/cache/clear");
  },
  
  // Get cache statistics
  getStats: async () => {
    return await api.get("/api/cache/stats");
  },
};

// Batch operations
export const batchAPI = {
  // Analyze multiple resumes
  analyzeMultiple: async (analyses) => {
    return await api.post("/api/batch/analyze", { analyses });
  },
  
  // Get multiple analyses
  getMultipleAnalyses: async (analysisIds) => {
    return await api.post("/api/batch/get-analyses", { ids: analysisIds });
  },
};

// Export utilities for debugging
export const debugAPI = {
  // Get current configuration
  getConfig: () => ({
    baseURL: API_BASE_URL,
    isProduction: isProduction(),
    hasAuth: !!authToken,
  }),
  
  // Test all endpoints
  testEndpoints: async () => {
    const results = {};
    
    try {
      results.health = await testConnection();
    } catch (e) {
      results.health = { error: e.message };
    }
    
    try {
      results.root = await api.get("/");
    } catch (e) {
      results.root = { error: e.message };
    }
    
    return results;
  },
};

export default api;
```

---

#### 📂 src\styles

##### 🎨 globals.css

**Path:** `src\styles\globals.css`

```css
/* Tailwind + custom styles */

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer utilities {
  /* Glassmorphism effect */
  .glass {
    @apply backdrop-blur-lg bg-white/10 border border-white/20;
  }
  
  .glass-dark {
    @apply backdrop-blur-lg bg-black/20 border border-white/10;
  }
  
  /* Gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent;
  }
  
  /* Glow effects */
  .glow-purple {
    @apply shadow-lg shadow-purple-500/25;
  }
  
  .glow-pink {
    @apply shadow-lg shadow-pink-500/25;
  }
  
  /* Animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
    50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
  }
  
  .pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-purple-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-purple-500;
}
```

---

