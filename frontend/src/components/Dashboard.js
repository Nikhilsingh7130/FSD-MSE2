import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { grievanceService } from '../services/api';
import { getUser, logout } from '../utils/auth';
import './Dashboard.css';

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Academic',
    status: 'Pending',
  });
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await grievanceService.getAll();
      setGrievances(response.data.grievances);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch grievances');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchGrievances();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await grievanceService.search(searchQuery);
      setGrievances(response.data.grievances);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (editingId) {
        await grievanceService.update(editingId, formData);
        setSuccess('Grievance updated successfully!');
      } else {
        await grievanceService.submit(formData);
        setSuccess('Grievance submitted successfully!');
      }
      setFormData({ title: '', description: '', category: 'Academic', status: 'Pending' });
      setShowForm(false);
      setEditingId(null);
      fetchGrievances();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save grievance');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (grievance) => {
    setFormData({
      title: grievance.title,
      description: grievance.description,
      category: grievance.category,
      status: grievance.status,
    });
    setEditingId(grievance._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this grievance?')) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      await grievanceService.delete(id);
      setSuccess('Grievance deleted successfully!');
      fetchGrievances();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete grievance');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', description: '', category: 'Academic', status: 'Pending' });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Grievance Management System</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search grievances by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
            <button type="button" onClick={fetchGrievances}>
              Clear
            </button>
          </form>
        </div>

        <button
          className="submit-grievance-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Submit New Grievance'}
        </button>

        {showForm && (
          <div className="grievance-form-container">
            <h2>{editingId ? 'Edit Grievance' : 'Submit a New Grievance'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter grievance title"
                  maxLength="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter detailed description"
                  rows="4"
                  maxLength="1000"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Academic">Academic</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Transport">Transport</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {editingId && (
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="form-buttons">
                <button type="submit" disabled={loading} className="save-btn">
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grievances-list">
          <h2>My Grievances</h2>
          {loading && !showForm ? (
            <div className="loading">Loading grievances...</div>
          ) : grievances.length === 0 ? (
            <div className="no-grievances">
              No grievances found. Submit one to get started!
            </div>
          ) : (
            <div className="grievances-grid">
              {grievances.map((grievance) => (
                <div key={grievance._id} className="grievance-card">
                  <div className="card-header">
                    <h3>{grievance.title}</h3>
                    <span className={`status ${grievance.status.toLowerCase()}`}>
                      {grievance.status}
                    </span>
                  </div>
                  <p className="description">{grievance.description}</p>
                  <div className="card-footer">
                    <span className="category">{grievance.category}</span>
                    <span className="date">
                      {new Date(grievance.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="card-actions">
                    <button
                      onClick={() => handleEdit(grievance)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(grievance._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
