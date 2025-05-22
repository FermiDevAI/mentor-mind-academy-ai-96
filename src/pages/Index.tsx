
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Dashboard from '../components/Dashboard';
import AboutPage from '../components/AboutPage';
import TeacherDashboard from '../components/TeacherDashboard';
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
            {/* Show different dashboard based on user type */}
            {user.userType === 'teacher' ? (
              // Teacher view
              <>
                {currentPage === 'mentors' && <TeacherDashboard />}
                {currentPage === 'about' && <AboutPage />}
                {currentPage === 'home' && <TeacherDashboard />}
              </>
            ) : (
              // Student view
              <>
                {currentPage === 'mentors' && <Dashboard />}
                {currentPage === 'about' && <AboutPage />}
                {currentPage === 'home' && <Dashboard />}
              </>
            )}
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
              <>
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
                
                <section className="py-16 bg-white">
                  <div className="container mx-auto px-4 text-center">
                    <h2 className="font-heading font-bold text-3xl mb-8">
                      MentorMind.ai
                    </h2>
                    <div className="max-w-3xl mx-auto mb-8">
                      <p className="text-lg mb-4">
                        Powered by Sensay – The World's Best AI Wisdom Engine
                      </p>
                      <p className="text-foreground/70 mb-6">
                        We're able to bring MentorMind.ai to life thanks to Sensay, the most advanced AI wisdom engine that creates digital replicas to preserve your knowledge and amplify your impact 24/7.
                      </p>
                    </div>
                    
                    <h3 className="font-heading text-xl font-semibold mb-6">Login Options:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      <div className="bg-mentorpurple-50 p-6 rounded-xl border border-mentorpurple-100">
                        <h4 className="font-heading font-semibold mb-2">Student (Public Access)</h4>
                        <p className="text-foreground/70 text-sm mb-4">Engage with AI mentors and historical figures.</p>
                        <button 
                          onClick={() => navigate('/login')}
                          className="bg-mentorpurple-500 text-white px-4 py-2 rounded hover:bg-mentorpurple-600 text-sm"
                        >
                          Login as Student
                        </button>
                      </div>
                      
                      <div className="bg-mentorpurple-50 p-6 rounded-xl border border-mentorpurple-100">
                        <h4 className="font-heading font-semibold mb-2">Teacher / Mentor (Public Access)</h4>
                        <p className="text-foreground/70 text-sm mb-4">Share your knowledge and build your AI replica.</p>
                        <button 
                          onClick={() => navigate('/login')}
                          className="bg-mentorpurple-500 text-white px-4 py-2 rounded hover:bg-mentorpurple-600 text-sm"
                        >
                          Login as Teacher
                        </button>
                      </div>
                      
                      <div className="bg-mentorpurple-50 p-6 rounded-xl border border-mentorpurple-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                          <div className="bg-mentorpurple-100 text-mentorpurple-800 text-xs px-3 py-2 rounded-full font-semibold">
                            Coming Soon
                          </div>
                        </div>
                        <h4 className="font-heading font-semibold mb-2">Organization (Private Access)</h4>
                        <p className="text-foreground/70 text-sm mb-4">Securely access internal knowledge and manage public-facing content.</p>
                        <button 
                          className="bg-gray-300 text-white px-4 py-2 rounded text-sm cursor-not-allowed"
                          disabled
                        >
                          Private Access
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground/70 mt-8 italic">
                      Organizational users can create AI replicas of their members, with full control over what knowledge is kept private or made public.
                    </p>
                  </div>
                </section>
              </>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
