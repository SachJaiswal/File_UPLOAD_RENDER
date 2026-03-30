import React from 'react';

const FileList = ({ files }) => {
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return '🖼️';
    if (fileType === 'application/pdf') return '📄';
    if (fileType?.startsWith('video/')) return '🎥';
    if (fileType?.startsWith('text/')) return '📝';
    return '📎';
  };

  return (
    <div className="space-y-3">
      {files.map((file, index) => (
        <div key={file._id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getFileIcon(file.fileType)}</span>
            <div>
              <p className="font-medium text-gray-900">{file.originalName}</p>
              <p className="text-sm text-gray-500">{formatBytes(file.fileSize)}</p>
            </div>
          </div>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
};

export default FileList;