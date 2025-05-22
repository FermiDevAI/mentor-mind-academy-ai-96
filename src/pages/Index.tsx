
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Dashboard from '../components/Dashboard';
import AboutPage from '../components/AboutPage';
import { UserData } from '../components/Login';
import { MessageSquare, BookOpen, GraduationCap } from "lucide-react";

// Interface for Index component props
interface IndexProps {
  user: UserData | null;
  onLogout: () => void;
}

// Index component serves as the main landing page
const Index = ({ user, onLogout }: IndexProps) => {
  // State to track which page to display
  const [currentPage, setCurrentPage] = useState<'home' | 'mentors' | 'about'>('home');
  const navigate = useNavigate();

  // Function to handle navigation from navbar
  const handleNavigation = (page: 'home' | 'mentors' | 'about') => {
    setCurrentPage(page);
  };
  
  // Render dashboard if user is logged in, otherwise show landing page
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        onNavigation={handleNavigation}
        currentPage={currentPage}
      />
      
      <main className="flex-grow pt-16">
        {user ? (
          // Authenticated user view
          <div className="pt-4">
            {currentPage === 'mentors' && <Dashboard />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'home' && <Dashboard />} {/* Default to Dashboard for home */}
          </div>
        ) : (
          // Non-authenticated user view
          <div>
            {/* Show appropriate content based on current page */}
            {currentPage === 'home' && <HeroSection />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'mentors' && (
              <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="font-heading font-bold text-3xl mb-4">Historical Mentors</h2>
                <p className="mb-8">Please log in to access our historical mentors.</p>
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-mentorpurple-500 text-white px-6 py-3 rounded-lg hover:bg-mentorpurple-600"
                >
                  Login to Access
                </button>
              </div>
            )}
            
            {currentPage === 'home' && (
              <section id="features" className="py-20 bg-gradient-to-b from-background to-mentorpurple-50">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12">
                    Learn History Like Never <span className="gradient-text">Before</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg card-hover">
                      <div className="bg-mentorpurple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="h-8 w-8 text-mentorpurple-600" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl mb-4">Chat with Historical Figures</h3>
                      <p className="text-foreground/70">
                        Engage in meaningful conversations with AI replicas of history's greatest minds.
                      </p>
                    </div>
                    
                    <div className="bg-white p-8 rounded-xl shadow-lg card-hover">
                      <div className="bg-mentorpurple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="h-8 w-8 text-mentorpurple-600" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl mb-4">Personalized Learning</h3>
                      <p className="text-foreground/70">
                        Get tailored learning experiences based on your interactions and interests.
                      </p>
                    </div>
                    
                    <div className="bg-white p-8 rounded-xl shadow-lg card-hover">
                      <div className="bg-mentorpurple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <GraduationCap className="h-8 w-8 text-mentorpurple-600" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl mb-4">Track Your Progress</h3>
                      <p className="text-foreground/70">
                        Monitor your learning journey and see improvements across different subjects.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
