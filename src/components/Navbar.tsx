
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
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
          <Button 
            onClick={() => navigate('/login')} 
            className="bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white rounded-full px-6"
          >
            Sign In
          </Button>
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
            <Button 
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }} 
              className="bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white w-full"
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
