
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

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
  return (
    <Card className="overflow-hidden card-hover border-mentorpurple-200/50 relative">
      <div className="overflow-hidden h-48">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading font-bold text-xl">{name}</h3>
          <Badge variant="outline" className="bg-mentorpurple-100 text-mentorpurple-700 border-mentorpurple-300">
            {era}
          </Badge>
        </div>
        
        <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <Badge className="bg-mentorpurple-500">
            {specialty}
          </Badge>
          
          <Button 
            onClick={() => onStartChat(id)}
            size="sm" 
            className="bg-mentorpurple-500 hover:bg-mentorpurple-600 text-white group transition-all"
          >
            <MessageCircle className="h-4 w-4 mr-2 group-hover:animate-pulse" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalFigureCard;
