
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from './Login';

interface NavbarProps {
  user: UserData | null;
  onLogout?: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <nav className="w-full py-4 z-50 bg-background/80 backdrop-blur-md fixed top-0">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/favicon.svg" alt="MentorMind" className="h-8 w-8 mr-2" />
          <span className="font-heading font-bold text-xl sm:text-2xl gradient-text">MentorMind</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-foreground/80 hover:text-mentorpurple-500 transition-colors">
            Features
          </a>
          <a href="#mentors" className="text-foreground/80 hover:text-mentorpurple-500 transition-colors">
            Mentors
          </a>
          <a href="#about" className="text-foreground/80 hover:text-mentorpurple-500 transition-colors">
            About
          </a>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-mentorpurple-500 font-medium">
                Hello, {user.name} ({user.userType})
              </span>
              <Button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white rounded-full px-6"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate('/login')} 
              className="bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white rounded-full px-6"
            >
              Sign In
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white shadow-lg animate-fade-in absolute w-full">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-foreground/80 hover:text-mentorpurple-500 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#mentors" 
              className="text-foreground/80 hover:text-mentorpurple-500 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mentors
            </a>
            <a 
              href="#about" 
              className="text-foreground/80 hover:text-mentorpurple-500 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            
            {user ? (
              <>
                <div className="text-mentorpurple-500 font-medium py-2">
                  Hello, {user.name} ({user.userType})
                </div>
                <Button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }} 
                  className="bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white w-full flex items-center justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }} 
                className="bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white w-full"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
