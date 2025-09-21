// Enhanced API service with better error handling and caching support
import axios from "axios";

// Ensure we're using the correct backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

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
      error.message = "Request timeout. The analysis is taking longer than expected.";
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
export const analyzeResume = async (resumeId, jobDescription, useCache = true) => {
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
export const checkATSEnhanced = async (resumeId, jobDescription, atsSystem = "general") => {
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

// WebSocket connection for real-time updates
export const createWebSocketConnection = (onMessage) => {
  const ws = new WebSocket(`ws://localhost:8000/api/ws/analysis`);
  
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
  
  return ws;
};

export default api;
