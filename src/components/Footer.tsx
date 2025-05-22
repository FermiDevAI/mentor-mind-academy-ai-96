
import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 bg-mentorpurple-50 border-t border-mentorpurple-100 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-4">
          <p className="text-xs text-gray-500 italic">Powered by Wisdom Engine of Sensay</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} MentorMind.ai All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/cryptdarkhorse/mentor-mind-academy-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-mentorpurple-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only md:not-sr-only md:inline-block text-sm ml-1">GitHub</span>
            </a>
            
            <a 
              href="https://x.com/MentorMind_Ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-gray-600 hover:text-mentorpurple-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only md:not-sr-only md:inline-block text-sm ml-1">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
