
import React from 'react';
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, MessageSquare } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-mentorpurple-300/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-mentorpurple-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 relative group">
              Learn History from the{" "}
              <span className="gradient-text relative inline-block transition-all duration-700 group-hover:animate-character">
                Greatest Minds
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-mentorpurple-500 to-mentorpurple-300 group-hover:w-full transition-all duration-700"></span>
              </span>{" "}
              Who Shaped It
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl transition-all duration-300 hover:text-foreground/100">
              MentorMind creates AI replicas of historical figures, enabling students to chat with Einstein, Marie Curie, and other luminaries for an immersive learning experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-mentorpurple-500/30 hover:shadow-mentorpurple-500/50 transition-all duration-500 transform hover:translate-y-[-5px] relative overflow-hidden group">
                <span className="relative z-10">Start Learning Now</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-mentorpurple-600 to-mentorpurple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute -inset-1 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 bg-mentorpurple-300/30 delay-100"></span>
                <span className="absolute -inset-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 bg-mentorpurple-300/20 delay-150"></span>
              </Button>
              <Button variant="outline" className="text-mentorpurple-600 border-mentorpurple-500 hover:bg-mentorpurple-100/50 text-lg px-8 py-6 rounded-full transition-all duration-300 hover:border-mentorpurple-600 hover:text-mentorpurple-700 hover:shadow-md">
                For Teachers
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center mt-10 text-sm text-foreground/70">
              <div className="flex items-center mr-6 mb-2 transition-all duration-300 hover:text-foreground/90 hover:scale-105 group">
                <div className="p-1.5 rounded-full bg-mentorpurple-100 group-hover:bg-mentorpurple-200 transition-colors duration-300 mr-2">
                  <GraduationCap className="h-5 w-5 text-mentorpurple-500 group-hover:text-mentorpurple-600 transition-colors duration-300" />
                </div>
                <span>100+ Historical Figures</span>
              </div>
              <div className="flex items-center mr-6 mb-2 transition-all duration-300 hover:text-foreground/90 hover:scale-105 group">
                <div className="p-1.5 rounded-full bg-mentorpurple-100 group-hover:bg-mentorpurple-200 transition-colors duration-300 mr-2">
                  <Users className="h-5 w-5 text-mentorpurple-500 group-hover:text-mentorpurple-600 transition-colors duration-300" />
                </div>
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center mb-2 transition-all duration-300 hover:text-foreground/90 hover:scale-105 group">
                <div className="p-1.5 rounded-full bg-mentorpurple-100 group-hover:bg-mentorpurple-200 transition-colors duration-300 mr-2">
                  <MessageSquare className="h-5 w-5 text-mentorpurple-500 group-hover:text-mentorpurple-600 transition-colors duration-300" />
                </div>
                <span>24/7 Learning</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-mentorpurple-500/20 animate-float transition-all duration-500 hover:shadow-mentorpurple-500/40">
              <div className="bg-gradient-to-br from-mentorpurple-400 to-mentorpurple-700 p-1 transition-all duration-500 hover:from-mentorpurple-500 hover:to-mentorpurple-800 group">
                <div className="bg-white rounded-xl p-3">
                  <img 
                    src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NDkxNTMwMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" 
                    alt="Chat with Einstein" 
                    className="rounded-lg w-full h-auto transition-all duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-mentorpurple-100 rounded-full h-32 w-32 flex items-center justify-center z-0 animate-pulse-glow transition-all duration-500 hover:bg-mentorpurple-200 hover:scale-110 group">
                <div className="text-mentorpurple-700 font-bold text-xl group-hover:text-mentorpurple-800 transition-colors duration-300">AI</div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 bg-mentorpurple-200 rounded-full h-24 w-24 z-0 transition-all duration-500 hover:bg-mentorpurple-300 hover:scale-110"></div>
            <div className="absolute -top-10 -right-10 bg-mentororange-500 opacity-20 rounded-full h-24 w-24 z-0 transition-all duration-500 hover:opacity-30 hover:scale-110"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
