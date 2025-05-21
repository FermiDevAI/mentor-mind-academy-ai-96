
import React from 'react';
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, MessageSquare } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Learn History from the <span className="gradient-text">Greatest Minds</span> Who Shaped It
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl">
              MentorMind creates AI replicas of historical figures, enabling students to chat with Einstein, Marie Curie, and other luminaries for an immersive learning experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-mentorpurple-500/30 hover:shadow-mentorpurple-500/50 transition-all animate-pulse-glow">
                Start Learning Now
              </Button>
              <Button variant="outline" className="text-mentorpurple-600 border-mentorpurple-500 hover:bg-mentorpurple-100/50 text-lg px-8 py-6 rounded-full">
                For Teachers
              </Button>
            </div>
            
            <div className="flex items-center mt-10 text-sm text-foreground/70">
              <div className="flex items-center mr-6">
                <GraduationCap className="h-5 w-5 text-mentorpurple-500 mr-2" />
                <span>100+ Historical Figures</span>
              </div>
              <div className="flex items-center mr-6">
                <Users className="h-5 w-5 text-mentorpurple-500 mr-2" />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-mentorpurple-500 mr-2" />
                <span>24/7 Learning</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-mentorpurple-500/20 animate-float">
              <div className="bg-gradient-to-br from-mentorpurple-400 to-mentorpurple-700 p-1">
                <div className="bg-white rounded-xl p-3">
                  <img 
                    src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NDkxNTMwMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" 
                    alt="Chat with Einstein" 
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-mentorpurple-100 rounded-full h-32 w-32 flex items-center justify-center z-0 animate-pulse-glow">
                <div className="text-mentorpurple-700 font-bold text-xl">AI</div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 bg-mentorpurple-200 rounded-full h-24 w-24 z-0"></div>
            <div className="absolute -top-10 -right-10 bg-mentororange-500 opacity-20 rounded-full h-24 w-24 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
