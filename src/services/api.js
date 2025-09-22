// frontend/src/services/api.js
// Enhanced API service with dynamic URL detection for Hugging Face Spaces
import axios from "axios";

// Dynamic API URL based on environment
const getAPIBaseURL = () => {
  // Production - point to your Hugging Face Space
  if (process.env.NODE_ENV === 'production') {
    return 'https://usman678zafar-aligno-backend.hf.space';  // FIXED: Remove /health
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
    }
    
    if (error.response?.status === 429) {
      error.message = "Too many requests. Please wait a moment and try again.";
    }
    
    if (error.code === "ECONNABORTED") {
      error.message = 
        "Request timeout. The analysis is taking longer than expected.";
    }
    
    return Promise.reject(error);
  }
);

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
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      return `${protocol}//usman678zafar-aligno-backend.hf.space/api/ws/analysis`;
    }
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
  
  return ws;
};

export default api;
