
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// AboutPage component: Displays information about MentorMind
const AboutPage = () => {
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Handler for joining the waitlist
  const handleJoinWaitlist = () => {
    setShowWaitlistDialog(true);
  };

  // Handler for submitting the waitlist email
  const handleSubmitEmail = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setEmailSubmitted(true);
    console.log("Email submitted to waitlist:", email);
    
    // Close the dialog after 3 seconds
    setTimeout(() => {
      setShowWaitlistDialog(false);
      setEmailSubmitted(false);
      setEmail('');
      
      toast({
        title: "Waitlist Confirmation",
        description: "Thank you for joining our waitlist! You are our top priority.",
      });
    }, 3000);
  };

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
          <p className="text-sm italic mt-2">Powered by Wisdom Engine of Sensay</p>
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
            <p className="text-xs text-mentorpurple-600 italic mt-2">Powered by Sensay – The World's Best AI Wisdom Engine</p>
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
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
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
          <Button 
            className="bg-mentorpurple-500 hover:bg-mentorpurple-600"
            onClick={handleJoinWaitlist}
          >
            Join the Waitlist
          </Button>
          <Button variant="outline" className="border-mentorpurple-300">
            <span className="mr-2">Coming Soon</span> 
            <span className="bg-mentorpurple-100 text-mentorpurple-800 text-xs px-2 py-1 rounded-full">Private</span>
          </Button>
        </div>
      </div>

      {/* Waitlist Dialog */}
      <Dialog open={showWaitlistDialog} onOpenChange={setShowWaitlistDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join the Organization Waitlist</DialogTitle>
            <DialogDescription>
              {!emailSubmitted 
                ? "Enter your email to join our waitlist for organization access." 
                : "Thank you! We will notify you when organization mentors become available."}
            </DialogDescription>
          </DialogHeader>

          {!emailSubmitted ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Input
                    id="email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-mentorpurple-500 hover:bg-mentorpurple-600"
                  onClick={handleSubmitEmail}
                >
                  Join Waitlist
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="inline-block rounded-full bg-green-100 p-3 mb-4">
                <svg 
                  className="h-6 w-6 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <p className="text-lg font-medium">Thank you for joining our waitlist!</p>
              <p className="mt-2 text-foreground/70">You are now on our top priority list. We'll send you an email as soon as our organization mentors service becomes available.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutPage;
