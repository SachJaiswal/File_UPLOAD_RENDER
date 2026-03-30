import React, { useState } from 'react';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';

const UserForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    dob: '',
    address: '',
    state: '',
    country: '',
    birthplace: '',
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }

    const submitData = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    // Append all files
    files.forEach(file => {
      submitData.append('files', file.file);
    });

    await onSubmit(submitData);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      dob: '',
      address: '',
      state: '',
      country: '',
      birthplace: '',
    });
    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            First Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter first name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Last Name *
          </label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter last name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Date of Birth *
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Birthplace *
          </label>
          <input
            type="text"
            name="birthplace"
            value={formData.birthplace}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter birthplace"
          />
        </div>

        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label className="form-label">
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="form-input"
            placeholder="Enter full address"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter state"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Country *
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter country"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Upload Files (Max 15 files, up to 10MB each) *
        </label>
        <FileUpload files={files} setFiles={setFiles} maxFiles={15} />
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ marginRight: '0.5rem' }}></span>
                Uploading...
              </>
            ) : (
              '✨ Create User'
            )}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-secondary"
          >
            Reset Form
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;