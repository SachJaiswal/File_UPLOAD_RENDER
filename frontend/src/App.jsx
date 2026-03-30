import React, { useState } from 'react';
import UserForm from './components/UserForm';
import FileList from './components/FileList';
import { userAPI } from './services/api';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [submittedUser, setSubmittedUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await userAPI.createUser(formData);
      setSubmittedUser(response.data);
      setSuccess(true);
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
    } catch (err) {
      console.error('Error creating user:', err);
      setError(err.response?.data?.error || err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header glass-effect">
        <h1>✨ User Registration Portal</h1>
        <p>Upload your documents and create your profile in one place</p>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner-large"></div>
        </div>
      )}

      {/* Success Message */}
      {success && submittedUser && (
        <div className="alert alert-success">
          <div className="alert-icon">🎉</div>
          <div className="alert-content">
            <div className="alert-title">Success!</div>
            <div className="alert-message">
              User {submittedUser.name} {submittedUser.surname} has been created successfully.
              User ID: {submittedUser._id}
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-error">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <div className="alert-title">Error</div>
            <div className="alert-message">{error}</div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{submittedUser?.files?.length || 0}</div>
          <div className="stat-label">Files Uploaded</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{submittedUser ? '✓' : '📝'}</div>
          <div className="stat-label">Registration Status</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">15</div>
          <div className="stat-label">Max Files</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">10MB</div>
          <div className="stat-label">Max File Size</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
        {/* Form Section */}
        <div className="card">
          <div className="card-header">
            <h2>📋 User Information</h2>
          </div>
          <div className="card-content">
            <UserForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>

        {/* Info Section */}
        <div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-header">
              <h2>💡 Instructions</h2>
            </div>
            <div className="card-content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✓</span>
                  <span>Fill in all required user information fields</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📎</span>
                  <span>Upload up to 15 files (max 10MB each)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎨</span>
                  <span>Supported formats: PDF, Images, Documents, Videos</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🖱️</span>
                  <span>Drag and drop files or click to browse</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>☁️</span>
                  <span>All files will be uploaded to AWS S3 securely</span>
                </div>
              </div>
            </div>
          </div>

          {submittedUser && submittedUser.files && submittedUser.files.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2>📁 Uploaded Files ({submittedUser.files.length})</h2>
              </div>
              <div className="card-content">
                <FileList files={submittedUser.files} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;