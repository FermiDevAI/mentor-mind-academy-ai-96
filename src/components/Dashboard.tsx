
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Search, BookOpen, GraduationCap, ArrowLeft } from "lucide-react";
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
            className="mb-4 transform transition-all duration-300 hover:bg-mentorpurple-100 hover:border-mentorpurple-300 hover:scale-105 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Browse
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 transition-all duration-500 hover:shadow-lg hover:shadow-mentorpurple-200/30">
              <ChatInterface 
                mentorId={activeFigure.id} 
                mentorName={activeFigure.name} 
                mentorImage={activeFigure.image} 
              />
            </div>
            <div>
              <Card className="mb-6 transform transition-all duration-500 hover:shadow-lg hover:shadow-mentorpurple-300/30 hover:-translate-y-1 overflow-hidden group">
                <CardContent className="p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-mentorpurple-50/0 to-mentorpurple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="font-heading font-bold text-xl mb-3 transition-colors duration-300 group-hover:text-mentorpurple-700">{activeFigure.name}</h3>
                    <p className="text-foreground/70 mb-4 transition-colors duration-300 group-hover:text-foreground/90">{activeFigure.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-mentorpurple-600 font-medium transition-all duration-300 hover:text-mentorpurple-800 hover:font-semibold">{activeFigure.era}</span>
                      <span className="text-sm bg-mentorpurple-100 text-mentorpurple-700 px-3 py-1 rounded-full transition-all duration-300 hover:bg-mentorpurple-200 hover:text-mentorpurple-800">
                        {activeFigure.specialty}
                      </span>
                    </div>
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
            <h1 className="font-heading font-bold text-3xl mb-4 md:mb-0 group">
              Historical <span className="gradient-text transition-all duration-500 group-hover:animate-character">Mentors</span>
            </h1>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all duration-300 group-hover:text-mentorpurple-500" />
              <Input
                placeholder="Search by name, era, specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-300 border-gray-200 focus:border-mentorpurple-300 hover:border-mentorpurple-200 group-hover:shadow-sm group-hover:shadow-mentorpurple-200/30"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6 bg-mentorpurple-100/50 p-1">
              {["all", "science", "arts", "history"].map(tab => (
                <TabsTrigger 
                  key={tab} 
                  value={tab} 
                  className="data-[state=active]:bg-mentorpurple-500 data-[state=active]:text-white transition-all duration-300 hover:bg-mentorpurple-200/70 data-[state=active]:hover:bg-mentorpurple-600"
                >
                  {tab === "all" ? "All Mentors" : 
                   tab === "science" ? "Science" : 
                   tab === "arts" ? "Arts & Literature" : 
                   "History & Politics"}
                </TabsTrigger>
              ))}
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
              <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-mentorpurple-200 rounded-lg bg-mentorpurple-50/30 transition-all duration-300 hover:bg-mentorpurple-50 hover:border-mentorpurple-300">
                <p className="text-center text-muted-foreground mb-4">
                  No mentors found in this category. Check back soon!
                </p>
                <Button 
                  variant="outline" 
                  className="border-mentorpurple-300 text-mentorpurple-600 hover:bg-mentorpurple-100 hover:text-mentorpurple-700 transition-all duration-300 hover:scale-105"
                >
                  Request a Historical Figure
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-12 border-mentorpurple-200 bg-mentorpurple-50/50 transition-all duration-500 hover:bg-mentorpurple-100/50 hover:shadow-lg hover:shadow-mentorpurple-200/30 group">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <GraduationCap className="h-10 w-10 text-mentorpurple-500 mr-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                <div>
                  <h3 className="font-heading font-semibold text-lg transition-colors duration-300 group-hover:text-mentorpurple-700">Your Learning Journey</h3>
                  <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">Track your progress across different subjects</p>
                </div>
              </div>
              <Button className="bg-mentorpurple-500 hover:bg-mentorpurple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
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
