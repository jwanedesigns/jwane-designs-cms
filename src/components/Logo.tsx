import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* High-end minimalist 'J' path */}
      <path 
        d="M65 20V65C65 76.0457 56.0457 85 45 85H40C28.9543 85 20 76.0457 20 65V60M65 20H55" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

export default Logo;
