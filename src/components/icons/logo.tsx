import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="150"
      height="40"
      viewBox="0 0 150 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="10"
        y="28"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        Dreams
        <tspan fill="url(#gradient)">LMS</tspan>
      </text>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#FF725E' }} />
          <stop offset="100%" style={{ stopColor: '#F54B8D' }} />
        </linearGradient>
      </defs>
    </svg>
  );
}
