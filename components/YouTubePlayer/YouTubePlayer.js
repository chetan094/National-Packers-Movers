'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function YouTubePlayer({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    trackEvent('video_play', title);
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: 'inherit'
        }}
      />
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div 
      onClick={handlePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(rgba(8, 12, 18, 0.15), rgba(8, 12, 18, 0.45)), url(${thumbnailUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        overflow: 'hidden'
      }}
      title={`Play video: ${title}`}
    >
      {/* Theme aligned play badge (Gold and Dark Navy theme) */}
      <div 
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: isHovered ? 'var(--gold)' : 'rgba(8, 12, 18, 0.85)',
          border: `2px solid ${isHovered ? 'var(--white)' : 'var(--gold)'}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
          transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          fill={isHovered ? 'var(--navy-dark)' : 'var(--gold)'}
          style={{ 
            marginLeft: '4px',
            transition: 'all 0.2s ease'
          }}
        >
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
  );
}
