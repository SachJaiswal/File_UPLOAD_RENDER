import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ files, setFiles, maxFiles = 15 }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Check if adding these files would exceed the limit
    if (files.length + acceptedFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed. You already have ${files.length} files.`);
      return;
    }
    
    // Add new files with preview URLs
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    
    setFiles([...files, ...newFiles]);
  }, [files, setFiles, maxFiles]);

  const removeFile = (index) => {
    const newFiles = [...files];
    // Revoke preview URL to avoid memory leaks
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'text/plain': ['.txt'],
      'video/*': ['.mp4', '.avi', '.mov'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: maxFiles,
  });

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
return (
  <div className="file-upload-container">
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="dropzone-icon">
        {isDragActive ? '📥' : '📤'}
      </div>
      <div className="dropzone-text">
        {isDragActive ? 'Drop your files here' : 'Drag & drop files here'}
      </div>
      <div className="dropzone-subtext">
        or click to browse
      </div>
      <div className="dropzone-subtext" style={{ marginTop: '0.5rem' }}>
        Maximum {maxFiles} files, up to 10MB each
      </div>
    </div>

    {files.length > 0 && (
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <div className="file-info">
              <div className="file-icon">
                {file.type.startsWith('image/') ? '🖼️' : 
                 file.type === 'application/pdf' ? '📄' :
                 file.type.startsWith('video/') ? '🎥' : '📎'}
              </div>
              <div className="file-details">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatBytes(file.size)}</div>
              </div>
            </div>
            <button
              onClick={() => removeFile(index)}
              className="file-remove"
              title="Remove file"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
 
};

export default FileUpload;