import React from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SEO/SeoHead';

const Features = () => {
  const features = [
    {
      icon: '🔥',
      title: 'Streak Tracking',
      description: 'Visual GitHub-like contribution graphs that make habit tracking addictive and rewarding.',
      details: [
        '90-day streak calendar visualization',
        'Color-coded completion status',
        'Current streak counter with fire emoji',
        'Longest streak achievement tracking'
      ]
    },
    {
      icon: '📊',
      title: 'Progress Analytics',
      description: 'Comprehensive statistics and insights about your habit performance over time.',
      details: [
        'Completion percentage tracking',
        'Weekly and monthly reports',
        'Habit consistency scores',
        'Progress trend analysis'
      ]
    },
    {
      icon: '🎯',
      title: 'Goal Setting',
      description: 'Set custom goals and challenges to keep yourself motivated and on track.',
      details: [
        '30-day challenge templates',
        'Custom goal duration',
        'Progress milestones',
        'Goal achievement badges'
      ]
    },
    {
      icon: '🔔',
      title: 'Daily Reminders',
      description: 'Never miss a habit with customizable reminders and notifications.',
      details: [
        'Custom reminder times',
        'Multiple reminder methods',
        'Snooze functionality',
        'Reminder frequency control'
      ]
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access your habits anywhere with our fully responsive design.',
      details: [
        'Progressive Web App (PWA)',
        'Mobile-first design',
        'Offline capability',
        'Touch-friendly interface'
      ]
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data is secure and private. We never sell or share your information.',
      details: [
        'End-to-end encryption',
        'Data export options',
        'Account deletion',
        'No third-party tracking'
      ]
    }
  ];

  return (
    <>
      <SeoHead 
        title="HabitStreak Features | Complete Habit Tracking Solution"
        description="Explore all features of HabitStreak: streak tracking, progress analytics, goal setting, reminders, mobile access, and privacy protection."
        keywords="habit tracker features, streak tracking features, productivity app features, habit app capabilities, tracking features"
        url="/features"
      />
      
      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="features-header">
          <h1>HabitStreak Features</h1>
          <p className="subtitle">Everything you need to build and maintain better habits</p>
        </div>

        <div className="features-grid-detailed">
          {features.map((feature, index) => (
            <div key={index} className="feature-card-detailed">
              <div className="feature-icon-large">{feature.icon}</div>
              <h2>{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-details">
                {feature.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section className="comparison">
          <h2>Why Choose HabitStreak?</h2>
          <div className="comparison-table">
            <div className="comparison-row header">
              <div className="comparison-cell">Feature</div>
              <div className="comparison-cell">HabitStreak</div>
              <div className="comparison-cell">Other Apps</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-cell">Price</div>
              <div className="comparison-cell">Free Forever ✓</div>
              <div className="comparison-cell">Paid Plans ✗</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-cell">GitHub Streaks</div>
              <div className="comparison-cell">Yes ✓</div>
              <div className="comparison-cell">No ✗</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-cell">Mobile App</div>
              <div className="comparison-cell">PWA ✓</div>
              <div className="comparison-cell">Download Required ✗</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-cell">Data Privacy</div>
              <div className="comparison-cell">No Tracking ✓</div>
              <div className="comparison-cell">Ads & Tracking ✗</div>
            </div>
          </div>
        </section>

        <section className="pricing">
          <h2>Simple, Transparent Pricing</h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Free Forever</h3>
              <div className="price">$0/month</div>
              <ul className="pricing-features">
                <li>✓ Unlimited Habits</li>
                <li>✓ Streak Tracking</li>
                <li>✓ Progress Analytics</li>
                <li>✓ Mobile Access</li>
                <li>✓ Daily Reminders</li>
                <li>✓ Data Export</li>
              </ul>
              <Link to="/auth?mode=register" className="btn btn-primary">
                Get Started Free
              </Link>
            </div>
          </div>
          <p className="pricing-note">No credit card required • No hidden fees • Cancel anytime</p>
        </section>

        <section className="cta-features">
          <h2>Ready to Transform Your Habits?</h2>
          <p>Join thousands of users who have successfully built lasting habits with HabitStreak.</p>
          <div className="cta-buttons">
            <Link to="/auth?mode=register" className="btn btn-primary btn-large">
              Start Free Trial
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
