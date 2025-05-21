import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Search, BookOpen, GraduationCap } from "lucide-react";
import HistoricalFigureCard from './HistoricalFigureCard';
import ChatInterface from './ChatInterface';
import ProgressTracker from './ProgressTracker';

// Sample data for historical figures
const historicalFigures = [
  {
    id: '1',
    name: 'Albert Einstein',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.',
    era: '20th Century',
    specialty: 'Physics',
  },
  {
    id: '2',
    name: 'Marie Curie',
    image: 'https://images.unsplash.com/photo-1488861859915-4b5a5e57649f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Physicist and chemist who conducted pioneering research on radioactivity. The first woman to win a Nobel Prize.',
    era: '19th-20th Century',
    specialty: 'Chemistry',
  },
  {
    id: '3',
    name: 'Leonardo da Vinci',
    image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Italian Renaissance polymath: painter, sculptor, architect, musician, mathematician, engineer, inventor, anatomist, geologist, cartographer, botanist, and writer.',
    era: 'Renaissance',
    specialty: 'Art & Science',
  },
  {
    id: '4',
    name: 'Ada Lovelace',
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer, the Analytical Engine.',
    era: '19th Century',
    specialty: 'Computing',
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeFigure, setActiveFigure] = useState<any | null>(null);
  
  const filteredFigures = historicalFigures.filter(figure => 
    figure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    figure.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    figure.era.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleStartChat = (id: string) => {
    const figure = historicalFigures.find(fig => fig.id === id);
    if (figure) {
      setActiveChatId(id);
      setActiveFigure(figure);
    }
  };
  
  const handleBackToBrowse = () => {
    setActiveChatId(null);
    setActiveFigure(null);
  };
  
  return (
    <div className="container mx-auto p-6">
      {activeChatId ? (
        <div className="animate-fade-in">
          <Button 
            variant="outline" 
            onClick={handleBackToBrowse}
            className="mb-4"
          >
            ← Back to Browse
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ChatInterface 
                mentorId={activeFigure.id} 
                mentorName={activeFigure.name} 
                mentorImage={activeFigure.image} 
              />
            </div>
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-3">{activeFigure.name}</h3>
                  <p className="text-foreground/70 mb-4">{activeFigure.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-mentorpurple-600 font-medium">{activeFigure.era}</span>
                    <span className="text-sm bg-mentorpurple-100 text-mentorpurple-700 px-3 py-1 rounded-full">
                      {activeFigure.specialty}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <ProgressTracker mentorId={activeFigure.id} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="font-heading font-bold text-3xl mb-4 md:mb-0">
              Historical <span className="gradient-text">Mentors</span>
            </h1>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, era, specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Mentors</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="arts">Arts & Literature</TabsTrigger>
              <TabsTrigger value="history">History & Politics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFigures.map(figure => (
                  <HistoricalFigureCard 
                    key={figure.id}
                    {...figure}
                    onStartChat={handleStartChat}
                  />
                ))}
              </div>
            </TabsContent>
            
            {/* Other tabs would have filtered content */}
            <TabsContent value="science" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFigures.filter(f => f.specialty.includes('Physics') || f.specialty.includes('Chemistry')).map(figure => (
                  <HistoricalFigureCard 
                    key={figure.id}
                    {...figure}
                    onStartChat={handleStartChat}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="arts" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFigures.filter(f => f.specialty.includes('Art')).map(figure => (
                  <HistoricalFigureCard 
                    key={figure.id}
                    {...figure}
                    onStartChat={handleStartChat}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <p className="text-center text-muted-foreground my-10">
                No mentors found in this category. Check back soon!
              </p>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-12 border-mentorpurple-200 bg-mentorpurple-50/50">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <GraduationCap className="h-10 w-10 text-mentorpurple-500 mr-4" />
                <div>
                  <h3 className="font-heading font-semibold text-lg">Your Learning Journey</h3>
                  <p className="text-muted-foreground">Track your progress across different subjects</p>
                </div>
              </div>
              <Button className="bg-mentorpurple-500 hover:bg-mentorpurple-600">
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
