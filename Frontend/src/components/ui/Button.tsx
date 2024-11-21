import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const Button = ({ children, href, onClick, variant = 'primary', className = '' }: ButtonProps) => {
  const baseStyles = "px-6 py-2 rounded-full font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
    secondary: "bg-white text-black hover:bg-gray-100",
    outline: "border-2 border-white text-white hover:bg-white/10"
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link to={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;