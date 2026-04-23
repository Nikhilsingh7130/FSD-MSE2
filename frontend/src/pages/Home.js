import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  return (
    <div className="home">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Grievance Management System</div>
          <div className="nav-links">
            {authenticated ? (
              <button
                className="nav-btn"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  className="nav-btn"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button
                  className="nav-btn primary"
                  onClick={() => navigate('/register')}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Student Grievance Management System</h1>
          <p>
            A comprehensive platform for students to submit, track, and resolve
            their grievances related to academics, facilities, and
            administration.
          </p>
          {!authenticated && (
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/register')}
              >
                Get Started
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Submit Grievances</h3>
            <p>
              Easily submit grievances regarding academic, hostel, transport,
              or other issues.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Track Status</h3>
            <p>
              View the current status of your grievances (Pending or Resolved)
              in real-time.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✏️</div>
            <h3>Edit & Manage</h3>
            <p>Update or delete your grievances as needed for better management.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure Access</h3>
            <p>
              Your data is protected with secure authentication and
              authorization.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔎</div>
            <h3>Search Grievances</h3>
            <p>
              Quickly search and filter your grievances by title for easy
              access.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Category Filter</h3>
            <p>Organize grievances by category for better tracking and management.</p>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Grievance Categories</h2>
        <div className="categories-list">
          <div className="category-item">
            <h4>Academic</h4>
            <p>Issues related to courses, grades, or academic policies</p>
          </div>
          <div className="category-item">
            <h4>Hostel</h4>
            <p>Complaints regarding hostel facilities and accommodations</p>
          </div>
          <div className="category-item">
            <h4>Transport</h4>
            <p>Issues with transportation services and shuttle arrangements</p>
          </div>
          <div className="category-item">
            <h4>Other</h4>
            <p>Any other grievances not covered in the above categories</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 Student Grievance Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
