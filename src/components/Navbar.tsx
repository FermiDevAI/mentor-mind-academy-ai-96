
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserData } from './Login';
import { Github, Twitter } from 'lucide-react';

// Interface for Navbar component props
interface NavbarProps {
  user: UserData | null;
  onLogout: () => void;
  onNavigation?: (page: 'home' | 'mentors' | 'about') => void;
  currentPage?: 'home' | 'mentors' | 'about';
}

// Navbar component displays the top navigation bar
const Navbar = ({ user, onLogout, onNavigation, currentPage = 'home' }: NavbarProps) => {
  // Use navigate hook for page navigation
  const navigate = useNavigate();
  
  // State for tracking hover
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Handle navigation link clicks
  const handleNavClick = (page: 'home' | 'mentors' | 'about') => {
    if (onNavigation) {
      onNavigation(page);
    }
  };

  // Generate nav link class based on if it's active or hovered
  const navLinkClass = (page: string) => {
    const isActive = currentPage === page;
    const isHovered = hoveredItem === page;
    
    return `cursor-pointer px-3 py-2 transition-all duration-300 relative ${
      isActive 
        ? 'text-mentorpurple-600 font-medium' 
        : isHovered 
          ? 'text-mentorpurple-500' 
          : 'text-foreground/70'
    } ${isHovered ? 'scale-105' : ''}`;
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo and site name */}
        <div className="flex items-center space-x-2">
          <img src="/favicon.svg" alt="MentorMind Logo" className="h-8 w-8" />
          <span 
            className="font-heading font-bold text-lg cursor-pointer hover:text-mentorpurple-600 transition-colors"
            onClick={() => handleNavClick('home')}
          >
            MentorMind<span className="text-mentorpurple-600">.ai</span>
          </span>
          <span className="text-xs italic text-mentorpurple-400 hidden md:block">Powered by Wisdom Engine of Sensay</span>
        </div>
        
        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-8">
          <div 
            className={navLinkClass('home')}
            onClick={() => handleNavClick('home')}
            onMouseEnter={() => setHoveredItem('home')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mentorpurple-600 rounded-full"></span>
            )}
            {hoveredItem === 'home' && currentPage !== 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mentorpurple-400 rounded-full animate-fade-in"></span>
            )}
          </div>
          <div 
            className={navLinkClass('mentors')}
            onClick={() => handleNavClick('mentors')}
            onMouseEnter={() => setHoveredItem('mentors')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Mentors
            {currentPage === 'mentors' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mentorpurple-600 rounded-full"></span>
            )}
            {hoveredItem === 'mentors' && currentPage !== 'mentors' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mentorpurple-400 rounded-full animate-fade-in"></span>
            )}
          </div>
          <div 
            className={navLinkClass('about')}
            onClick={() => handleNavClick('about')}
            onMouseEnter={() => setHoveredItem('about')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            About
            {currentPage === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mentorpurple-600 rounded-full"></span>
            )}
            {hoveredItem === 'about' && currentPage !== 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-mentorpurple-400 rounded-full animate-fade-in"></span>
            )}
          </div>
        </nav>
        
        {/* User authentication section */}
        <div className="flex items-center space-x-4">
          {user ? (
            // If user is logged in, show user menu
            <div className="flex items-center space-x-3">
              <div className="hidden md:block">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-foreground/70 capitalize">{user.userType}</div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="border-mentorpurple-200 hover:border-mentorpurple-400 hover:text-mentorpurple-600"
              >
                Log out
              </Button>
            </div>
          ) : (
            // If user is not logged in, show login button
            <Button 
              onClick={() => navigate('/login')}
              className="bg-mentorpurple-500 hover:bg-mentorpurple-600"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
