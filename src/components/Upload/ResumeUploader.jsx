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
