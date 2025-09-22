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
