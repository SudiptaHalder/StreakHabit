import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SEO/SeoHead';

const About = () => {
  return (
    <>
      <SeoHead 
        title="About HabitStreak | Free Habit Tracker App"
        description="Learn about HabitStreak - the free habit tracking app that helps you build better habits with GitHub-like streak visualization and progress tracking."
        keywords="about habit tracker, habit app about, habit streak about, habit tracking mission, productivity app about"
        url="/about"
      />
      
      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="about-header">
          <h1>About HabitStreak</h1>
          <p className="subtitle">Helping millions build better habits, one day at a time.</p>
        </div>

        <div className="about-content">
          <section className="mission">
            <h2>Our Mission</h2>
            <p>
              At HabitStreak, we believe that small, consistent actions lead to remarkable transformations. 
              Our mission is to make habit formation accessible, enjoyable, and effective for everyone.
            </p>
            <p>
              Inspired by GitHub's contribution graphs, we created a habit tracker that visualizes progress 
              in an intuitive way, turning daily habits into a satisfying visual journey.
            </p>
          </section>

          <section className="story">
            <h2>Our Story</h2>
            <p>
              HabitStreak was born from a simple observation: people who track their habits consistently 
              are more likely to maintain them. However, most habit trackers were either too complicated 
              or too simplistic.
            </p>
            <p>
              As developers familiar with GitHub's streak system, we realized that this visual approach 
              could be perfectly adapted for personal habit tracking. The familiar green squares became 
              our inspiration for creating a habit tracker that people would actually enjoy using daily.
            </p>
          </section>

          <section className="team">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>🌱 Simplicity</h3>
                <p>We believe powerful tools should be simple to use. No complicated setups, just pure habit tracking.</p>
              </div>
              <div className="value-card">
                <h3>🔓 Accessibility</h3>
                <p>Everyone should have access to tools for personal growth. That's why HabitStreak is and will always be free.</p>
              </div>
              <div className="value-card">
                <h3>🔒 Privacy</h3>
                <p>Your data belongs to you. We don't sell your information or show you ads.</p>
              </div>
              <div className="value-card">
                <h3>🚀 Innovation</h3>
                <p>We continuously improve our platform based on user feedback and the latest research in habit formation.</p>
              </div>
            </div>
          </section>

          <section className="stats">
            <h2>By The Numbers</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">2M+</div>
                <div className="stat-label">Habits Tracked</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">User Satisfaction</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">365</div>
                <div className="stat-label">Days Active</div>
              </div>
            </div>
          </section>

          <section className="cta">
            <h2>Join Our Community</h2>
            <p>Start your habit-building journey today with thousands of others who are transforming their lives.</p>
            <div className="cta-buttons">
              <Link to="/auth?mode=register" className="btn btn-primary">
                Get Started Free
              </Link>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
