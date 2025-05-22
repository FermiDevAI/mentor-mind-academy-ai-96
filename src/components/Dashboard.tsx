
import React, { useState } from 'react';
import HistoricalFigureCard from './HistoricalFigureCard';
import ChatInterface from './ChatInterface';
import ProgressTracker from './ProgressTracker';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

// Interface for historical figure data
interface HistoricalFigure {
  id: string;
  name: string;
  image: string;
  description: string;
  era: string;
  specialty: string;
  isPrivate?: boolean; // Added to indicate if a mentor is part of private organization
}

// The Dashboard component is the main container for user's dashboard view
const Dashboard = () => {
  // State for historical figures data
  const [figures, setFigures] = useState<HistoricalFigure[]>([
    // Array of historical figure data used to populate cards
    {
      id: '1',
      name: 'Albert Einstein',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/1200px-Albert_Einstein_Head.jpg',
      description: 'Theoretical physicist who developed the theory of relativity and contributed to the development of quantum mechanics.',
      era: '20th Century',
      specialty: 'Physics',
    },
    {
      id: '2',
      name: 'Marie Curie',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/1200px-Marie_Curie_c1920.jpg',
      description: 'Physicist and chemist who conducted pioneering research on radioactivity, the first woman to win a Nobel Prize.',
      era: '19th-20th Century',
      specialty: 'Chemistry',
    },
    {
      id: '3',
      name: 'Nelson Mandela',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/800px-Nelson_Mandela_1994.jpg',
      description: 'Anti-apartheid revolutionary, political leader, and philanthropist who served as President of South Africa.',
      era: '20th-21st Century',
      specialty: 'Politics',
    },
    {
      id: '4',
      name: 'Leonardo da Vinci',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Portrait_of_Leonardo_da_Vinci_%28copy%29.jpg/800px-Portrait_of_Leonardo_da_Vinci_%28copy%29.jpg',
      description: 'Polymath of the High Renaissance: painter, sculptor, architect, musician, scientist, inventor, and more.',
      era: '15th-16th Century',
      specialty: 'Art and Science',
    },
    {
      id: '5',
      name: 'William Shakespeare',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/1200px-Shakespeare.jpg',
      description: 'English playwright, poet, and actor, widely regarded as the greatest writer in the English language.',
      era: '16th-17th Century',
      specialty: 'Literature',
    },
  ]);
  
  // Private organization mentors (coming soon)
  const [privateFigures, setPrivateFigures] = useState<HistoricalFigure[]>([
    {
      id: 'p1',
      name: 'Stephen Hawking',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg',
      description: 'Theoretical physicist known for his work on black holes and relativity, and for his bestselling book "A Brief History of Time".',
      era: '20th-21st Century',
      specialty: 'Theoretical Physics',
      isPrivate: true,
    },
    {
      id: 'p2',
      name: 'Jane Goodall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Jane_Goodall_2015.jpg/800px-Jane_Goodall_2015.jpg',
      description: 'Primatologist and anthropologist who has conducted groundbreaking studies on wild chimpanzees.',
      era: '20th-21st Century',
      specialty: 'Primatology',
      isPrivate: true,
    },
    {
      id: 'p3',
      name: 'Carl Sagan',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Carl_Sagan_Planetary_Society.JPG/800px-Carl_Sagan_Planetary_Society.JPG',
      description: 'Astronomer, planetary scientist, and science communicator known for his work on extraterrestrial life.',
      era: '20th Century',
      specialty: 'Astronomy',
      isPrivate: true,
    },
  ]);

  // State for currently selected mentor
  const [selectedMentor, setSelectedMentor] = useState<HistoricalFigure | null>(null);
  
  // Handler for starting a chat with a historical figure
  const handleStartChat = (id: string) => {
    // Find the selected figure by ID from both regular and private figures
    let mentor = figures.find(figure => figure.id === id);
    
    if (!mentor) {
      mentor = privateFigures.find(figure => figure.id === id);
    }
    
    if (mentor) {
      console.log(`Starting chat with: ${mentor.name}`);
      setSelectedMentor(mentor);
      
      // Scroll to chat section
      setTimeout(() => {
        document.getElementById('chat-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    } else {
      console.error(`No mentor found with ID: ${id}`);
    }
  };

  // Handler for joining the private organization waitlist
  const handleJoinWaitlist = () => {
    // This would normally open a form or modal to collect information
    alert("Thanks for your interest! You've been added to our waitlist. We'll contact you when private organization access is available.");
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-12">
      {/* Dashboard header */}
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold mb-2">Historical Mentors</h1>
        <p className="text-foreground/70 max-w-xl mx-auto">
          Connect with history's greatest minds. Select a historical figure below to start a conversation and learn directly from them.
        </p>
      </div>
      
      {/* Private Organization Mentors Section */}
      <div className="bg-mentorpurple-50 p-6 rounded-xl border border-mentorpurple-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-heading font-bold text-mentorpurple-700">
              <Users className="inline-block mr-2 h-6 w-6" /> Organization Mentors
            </h2>
            <p className="text-sm text-foreground/70 mt-1">
              Premium mentors available exclusively for organizations
            </p>
          </div>
          <Button onClick={handleJoinWaitlist} className="bg-mentorpurple-500 hover:bg-mentorpurple-600">
            Join the Waitlist
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {privateFigures.map(figure => (
            <div key={figure.id} className="relative">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="bg-mentorpurple-100 text-mentorpurple-800 text-xs px-3 py-2 rounded-full font-semibold">
                  Coming Soon
                </div>
              </div>
              <HistoricalFigureCard
                key={figure.id}
                {...figure}
                onStartChat={() => {}} // Disabled for now
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Public Mentors Section */}
      <div>
        <h2 className="text-2xl font-heading font-bold mb-6 text-center">Public Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {figures.map(figure => (
            <HistoricalFigureCard
              key={figure.id}
              {...figure}
              onStartChat={handleStartChat}
            />
          ))}
        </div>
      </div>
      
      {/* Chat interface section that appears when a mentor is selected */}
      {selectedMentor && (
        <div id="chat-section" className="pt-6">
          <h2 className="text-2xl font-heading font-bold mb-6 text-center">
            Chat with {selectedMentor.name}
          </h2>
          <div className="max-w-3xl mx-auto">
            <ChatInterface 
              mentorId={selectedMentor.id} 
              mentorName={selectedMentor.name} 
              mentorImage={selectedMentor.image} 
            />
          </div>
        </div>
      )}
      
      {/* Progress tracker component */}
      <ProgressTracker mentorId={selectedMentor ? selectedMentor.id : "default"} />
    </div>
  );
};

export default Dashboard;
