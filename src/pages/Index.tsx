import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Dashboard from '../components/Dashboard';
import { UserData } from '../components/Login';

interface IndexProps {
  user: UserData | null;
  onLogout: () => void;
}

const Index = ({ user, onLogout }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      {user ? (
        <>
          <Navbar user={user} onLogout={onLogout} />
          <div className="pt-20">
            <Dashboard />
          </div>
        </>
      ) : (
        <div>
          <Navbar user={null} onLogout={() => {}} />
          <HeroSection />
          
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
          
          {/* You can add more sections here, like testimonials, about, etc. */}
        </div>
      )}
    </div>
  );
};

export default Index;

// Import these from lucide-react
const MessageSquare = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const GraduationCap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);
