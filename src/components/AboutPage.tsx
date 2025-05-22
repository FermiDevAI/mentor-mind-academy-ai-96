
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// AboutPage component: Displays information about MentorMind
const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Main heading */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold mb-4">About <span className="gradient-text">MentorMind.ai</span></h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Knowledge Base powered by AI. Preserving world wisdom in the era of AI.
        </p>
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
        <div className="bg-mentorpurple-100 rounded-xl p-8 flex items-center justify-center">
          <div className="text-center">
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
        <Card className="card-hover">
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold text-xl mb-2">Sensay API</h3>
            <p className="text-muted-foreground">
              Powers our persona creation and knowledge management system, enabling realistic conversations with historical figures.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold text-xl mb-2">Gemini API</h3>
            <p className="text-muted-foreground">
              Enhances responses with additional context and factual information, ensuring accuracy and depth in conversations.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold text-xl mb-2">Knowledge Base</h3>
            <p className="text-muted-foreground">
              Combines publicly available information with personalized knowledge repositories for rich, authentic interactions.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* For educators section */}
      <div className="bg-mentorpurple-50 p-8 rounded-xl mb-16">
        <h2 className="font-heading text-2xl font-semibold mb-4 text-center">For Educators</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          As an educator, you can become a mentor on our platform. Add your expertise, upload transcripts and documents
          to your knowledge base, and help students learn from your experience.
        </p>
        <div className="flex justify-center">
          <Button className="bg-mentorpurple-500 hover:bg-mentorpurple-600">Learn More</Button>
        </div>
      </div>

      {/* Private organizations section */}
      <div className="border border-mentorpurple-200 p-8 rounded-xl text-center max-w-2xl mx-auto">
        <h2 className="font-heading text-2xl font-semibold mb-4">For Private Organizations</h2>
        <p className="text-muted-foreground mb-6">
          Be the first to access MentorMind.ai and revolutionize how your organization preserves knowledge.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
