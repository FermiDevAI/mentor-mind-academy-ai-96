
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// AboutPage component: Displays information about MentorMind
const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero section with background image */}
      <div className="relative rounded-2xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-mentorpurple-900/90 to-mentorpurple-600/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
          alt="Scenic mountain view" 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">About <span className="gradient-text">MentorMind.ai</span></h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Knowledge Base powered by AI. Preserving world wisdom in the era of AI.
          </p>
        </div>
      </div>

      {/* Mission section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="font-heading text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At MentorMind.ai, we are developing tools that enhance teaching and learning by leveraging
            artificial intelligence. Our mission is to preserve human wisdom and knowledge in the era of AI.
          </p>
          <p className="text-muted-foreground">
            We believe that knowledge should be accessible to everyone, and our platform enables anyone to learn
            from the wisdom of historical figures and contemporary experts alike.
          </p>
        </div>
        <div className="bg-mentorpurple-100 rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
            alt="Technology representation" 
            className="w-full h-[200px] object-cover"
          />
          <div className="p-8">
            <h3 className="font-heading text-xl font-semibold mb-2">Wisdom AI Engine</h3>
            <p className="text-muted-foreground">
              Our proprietary technology combines multiple AI models to deliver authentic, accurate, and
              personalized learning experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Technology section */}
      <h2 className="font-heading text-2xl font-semibold mb-6 text-center">Our Technology</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="card-hover overflow-hidden">
          <div className="h-32 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Sensay API" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold text-xl mb-2">Sensay API</h3>
            <p className="text-muted-foreground">
              Powers our persona creation and knowledge management system, enabling realistic conversations with historical figures.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover overflow-hidden">
          <div className="h-32 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
              alt="Gemini API" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold text-xl mb-2">Gemini API</h3>
            <p className="text-muted-foreground">
              Enhances responses with additional context and factual information, ensuring accuracy and depth in conversations.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover overflow-hidden">
          <div className="h-32 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
              alt="Knowledge Base" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold text-xl mb-2">Knowledge Base</h3>
            <p className="text-muted-foreground">
              Combines publicly available information with personalized knowledge repositories for rich, authentic interactions.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* For educators section */}
      <div className="bg-mentorpurple-50 p-8 rounded-xl mb-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h2 className="font-heading text-2xl font-semibold mb-4 text-center">For Educators</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            As an educator, you can become a mentor on our platform. Add your expertise, upload transcripts and documents
            to your knowledge base, and help students learn from your experience.
          </p>
          <div className="flex justify-center">
            <Button className="bg-mentorpurple-500 hover:bg-mentorpurple-600">Learn More</Button>
          </div>
        </div>
      </div>

      {/* Private organizations section */}
      <div className="border border-mentorpurple-200 p-8 rounded-xl text-center max-w-2xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mentorpurple-50/50 to-transparent pointer-events-none"></div>
        <h2 className="font-heading text-2xl font-semibold mb-4 relative z-10">For Private Organizations</h2>
        <p className="text-muted-foreground mb-6 relative z-10">
          Be the first to access MentorMind.ai and revolutionize how your organization preserves knowledge.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <Button className="bg-mentorpurple-500 hover:bg-mentorpurple-600">Join the Waitlist</Button>
          <Button variant="outline" className="border-mentorpurple-300">
            <span className="mr-2">Coming Soon</span> 
            <span className="bg-mentorpurple-100 text-mentorpurple-800 text-xs px-2 py-1 rounded-full">Private</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
