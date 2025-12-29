import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { testConnection } from '../services/auth';
import SeoHead from '../components/SEO/SeoHead';

const Home = () => {
  const { user } = useAuth();
  const [apiStatus, setApiStatus] = useState('');
  const [testing, setTesting] = useState(false);

  const testApiConnection = async () => {
    setTesting(true);
    setApiStatus('Testing connection...');
    try {
      const result = await testConnection();
      setApiStatus(`✅ Connected: ${result.message}`);
    } catch (error) {
      setApiStatus(`❌ Failed: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <>
      <SeoHead 
        title="HabitStreak - Free Habit Tracker with GitHub-like Streaks"
        description="Build and track daily habits with our free habit tracker. Visualize your progress with GitHub-like streak calendar, set goals, and achieve personal growth."
        keywords="free habit tracker, daily habit tracker, streak calendar, GitHub streaks, habit formation, productivity app, goal tracking"
      />
      
      <div className="home-page">
        <header className="hero">
          <h1>Build Better Habits, One Day at a Time</h1>
          <p className="subtitle">Track your daily habits, build impressive streaks like GitHub contributions, and achieve your goals with our simple yet powerful habit tracker.</p>
          
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <div className="auth-buttons">
              <Link to="/auth?mode=login" className="btn btn-primary">
                Start Tracking Free
              </Link>
              <Link to="/auth?mode=register" className="btn btn-secondary">
                Create Account
              </Link>
            </div>
          )}
          
          <div className="trust-badges">
            <span>✅ Free Forever</span>
            <span>🔒 Secure & Private</span>
            <span>📱 Mobile Friendly</span>
            <span>🚀 No Credit Card</span>
          </div>
        </header>

        <section className="benefits">
          <div className="benefit-card">
            <div className="benefit-icon">🔥</div>
            <h3>Streak Tracking</h3>
            <p>Visualize your habit streaks with GitHub-like contribution graphs. Stay motivated by maintaining your daily streaks.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h3>Progress Analytics</h3>
            <p>Detailed statistics and insights about your habit performance. Track your improvement over weeks and months.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Goal Setting</h3>
            <p>Set 30-day challenges or custom duration goals. Get reminders and stay on track with your personal targets.</p>
          </div>
        </section>

        <section className="features">
          <h2>Why Choose HabitStreak?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🎮 Gamified Experience</h3>
              <p>Turn habit building into a game with streaks, achievements, and progress rewards.</p>
            </div>
            <div className="feature">
              <h3>📱 Cross-Platform</h3>
              <p>Access your habits anywhere - works perfectly on desktop, tablet, and mobile devices.</p>
            </div>
            <div className="feature">
              <h3>🔔 Daily Reminders</h3>
              <p>Never miss a day with customizable reminders for your most important habits.</p>
            </div>
            <div className="feature">
              <h3>📈 Data Export</h3>
              <p>Export your habit data for personal analysis or to share your progress with others.</p>
            </div>
            <div className="feature">
              <h3>👥 Community</h3>
              <p>Join a community of like-minded individuals building better habits together.</p>
            </div>
            <div className="feature">
              <h3>⚡ Fast & Lightweight</h3>
              <p>Optimized for speed and performance, even with hundreds of tracked habits.</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Users Are Saying</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <p>"Finally found a habit tracker that actually makes me want to keep going. The streak visualization is addictive!"</p>
              <span className="author">- Sarah, Developer</span>
            </div>
            <div className="testimonial">
              <p>"As a GitHub user, I love the familiar contribution graph style. It makes tracking habits intuitive."</p>
              <span className="author">- Mark, Project Manager</span>
            </div>
            <div className="testimonial">
              <p>"Helped me build a consistent morning routine. 45-day streak and counting!"</p>
              <span className="author">- Jessica, Student</span>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Start Building Better Habits Today</h2>
          <p>Join thousands of users who have transformed their daily routines with HabitStreak.</p>
          <Link to="/auth?mode=register" className="btn btn-primary btn-large">
            Get Started Free
          </Link>
          <p className="small-text">No credit card required • Free forever plan</p>
        </section>

        <div className="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>Is HabitStreak really free?</h3>
            <p>Yes! HabitStreak offers a completely free plan with all core features. You can track unlimited habits and maintain streaks without any cost.</p>
          </div>
          <div className="faq-item">
            <h3>How does the streak calendar work?</h3>
            <p>Our streak calendar works like GitHub's contribution graph. Each day you complete a habit, it gets marked. The longer your streak, the more impressive your calendar looks.</p>
          </div>
          <div className="faq-item">
            <h3>Can I use it on mobile?</h3>
            <p>Absolutely! HabitStreak is fully responsive and works perfectly on smartphones, tablets, and desktop computers.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
