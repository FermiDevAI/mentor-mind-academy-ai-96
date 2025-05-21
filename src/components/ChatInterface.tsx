
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  mentorId: string;
  mentorName: string;
  mentorImage: string;
}

const ChatInterface = ({ mentorId, mentorName, mentorImage }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: `Hello! I am ${mentorName}. What would you like to learn about today?`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real implementation, this would connect to Sensay API
      // For now, we'll simulate a response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: `As ${mentorName}, I find your question about "${input}" fascinating. Let me explain...`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to get response from mentor. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-mentorpurple-500 text-white p-4 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-white">
          <img src={mentorImage} alt={mentorName} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-heading font-semibold">{mentorName}</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div 
              className={`max-w-[80%] ${
                msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              } animate-fade-in`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="chat-bubble-ai flex space-x-2 items-center">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${mentorName} a question...`}
            className="flex-grow focus-visible:ring-mentorpurple-500"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-mentorpurple-500 hover:bg-mentorpurple-600 transition-colors"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
