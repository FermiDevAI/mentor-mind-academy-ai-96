
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserData } from './Login';

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

  // Handle navigation link clicks
  const handleNavClick = (page: 'home' | 'mentors' | 'about') => {
    if (onNavigation) {
      onNavigation(page);
    }
  };

  // Generate nav link class based on if it's active
  const navLinkClass = (page: string) => 
    `cursor-pointer px-3 py-2 transition-colors hover:text-mentorpurple-600 ${
      currentPage === page ? 'text-mentorpurple-600 font-medium' : 'text-foreground/70'
    }`;

  return (
    <header className="fixed w-full bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo and site name */}
        <div className="flex items-center space-x-2">
          <img src="/favicon.svg" alt="MentorMind Logo" className="h-8 w-8" />
          <span 
            className="font-heading font-bold text-lg cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            MentorMind<span className="text-mentorpurple-600">.ai</span>
          </span>
        </div>
        
        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-8">
          <div 
            className={navLinkClass('home')}
            onClick={() => handleNavClick('home')}
          >
            Home
          </div>
          <div 
            className={navLinkClass('mentors')}
            onClick={() => handleNavClick('mentors')}
          >
            Mentors
          </div>
          <div 
            className={navLinkClass('about')}
            onClick={() => handleNavClick('about')}
          >
            About
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
