import React from 'react';
import { Helmet } from 'react-helmet';

const SeoHead = ({ 
  title = 'HabitStreak - Build Daily Habits & Track Your Streaks | Free Habit Tracker',
  description = 'Track your daily habits, build streaks like GitHub contributions, and achieve your goals. Free habit tracker with streak calendar, progress analytics, and goal setting.',
  keywords = 'habit tracker, streak tracker, daily habits, productivity, goal setting, habit formation, motivation, progress tracker, GitHub streak, habit calendar',
  image = '/og-image.png',
  url = '/',
  type = 'website'
}) => {
  const siteUrl = 'https://habitstreak.app';
  const fullUrl = `${siteUrl}${url}`;
  const fullImageUrl = `${siteUrl}${image}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="HabitStreak" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SeoHead;
