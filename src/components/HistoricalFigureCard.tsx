
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HistoricalFigureProps {
  id: string;
  name: string;
  image: string;
  description: string;
  era: string;
  specialty: string;
  onStartChat: (id: string) => void;
}

const HistoricalFigureCard = ({ 
  id, 
  name, 
  image, 
  description, 
  era, 
  specialty, 
  onStartChat 
}: HistoricalFigureProps) => {
  const { toast } = useToast();
  
  const handleStartChat = () => {
    toast({
      title: `Starting chat with ${name}`,
      description: "Connecting to historical figure...",
    });
    onStartChat(id);
  };

  return (
    <Card className="overflow-hidden border-mentorpurple-200/50 relative group transition-all duration-500 hover:shadow-xl hover:shadow-mentorpurple-300/30 hover:-translate-y-2">
      <div className="overflow-hidden h-48 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-mentorpurple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      <CardContent className="p-5 bg-gradient-to-br from-white to-mentorpurple-50/10 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-mentorpurple-100/30">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading font-bold text-xl transition-colors duration-300 group-hover:text-mentorpurple-700">{name}</h3>
          <Badge variant="outline" className="bg-mentorpurple-100 text-mentorpurple-700 border-mentorpurple-300 transition-all duration-300 group-hover:bg-mentorpurple-200 group-hover:border-mentorpurple-400">
            {era}
          </Badge>
        </div>
        
        <p className="text-foreground/70 text-sm mb-4 line-clamp-3 transition-colors duration-300 group-hover:text-foreground/90">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <Badge className="bg-mentorpurple-500 transition-all duration-300 hover:bg-mentorpurple-600 transform hover:scale-105">
            {specialty}
          </Badge>
          
          <Button 
            onClick={handleStartChat}
            size="sm" 
            className="bg-mentorpurple-500 text-white transition-all duration-500 hover:bg-mentorpurple-600 hover:shadow-lg hover:shadow-mentorpurple-400/30 group/btn"
          >
            <MessageCircle className="h-4 w-4 mr-2 transition-all duration-300 group-hover/btn:animate-pulse" />
            <span className="relative overflow-hidden">
              <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-y-[-100%] inline-block">
                Chat
              </span>
              <span className="absolute inset-0 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300">
                Start
              </span>
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalFigureCard;
