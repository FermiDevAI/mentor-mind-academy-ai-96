import React, { useState } from 'react';
import HistoricalFigureCard from './HistoricalFigureCard';
import ChatInterface from './ChatInterface';
import ProgressTracker from './ProgressTracker';

interface HistoricalFigure {
  id: string;
  name: string;
  image: string;
  description: string;
  era: string;
  specialty: string;
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Nelson_Mandela_1994.jpg/1200px-Nelson_Mandela_1994.jpg',
      description: 'Anti-apartheid revolutionary, political leader, and philanthropist who served as President of South Africa.',
      era: '20th-21st Century',
      specialty: 'Politics',
    },
    {
      id: '4',
      name: 'Leonardo da Vinci',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Leonardo_da_Vinci_self-portrait_c._1512.jpg/1200px-Leonardo_da_Vinci_self-portrait_c._1512.jpg',
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

  // State for currently selected mentor
  const [selectedMentor, setSelectedMentor] = useState<HistoricalFigure | null>(null);
  
  // Handler for starting a chat with a historical figure
  const handleStartChat = (id: string) => {
    // Find the selected figure by ID
    const mentor = figures.find(figure => figure.id === id);
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

  return (
    <div className="container mx-auto px-4 py-6 space-y-12">
      {/* Dashboard header */}
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold mb-2">Historical Mentors</h1>
        <p className="text-foreground/70 max-w-xl mx-auto">
          Connect with history's greatest minds. Select a historical figure below to start a conversation and learn directly from them.
        </p>
      </div>
      
      {/* Grid of historical figure cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {figures.map(figure => (
          <HistoricalFigureCard
            key={figure.id}
            {...figure}
            onStartChat={handleStartChat}
          />
        ))}
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
      <ProgressTracker />
    </div>
  );
};

export default Dashboard;
