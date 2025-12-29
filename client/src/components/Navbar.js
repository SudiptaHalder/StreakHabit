import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">HabitStreak</Link>
        </div>
        
        <div className="nav-links">
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
          
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth?mode=login">Sign In</Link>
              <Link to="/auth?mode=register" className="signup-btn">
                Sign Up Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
