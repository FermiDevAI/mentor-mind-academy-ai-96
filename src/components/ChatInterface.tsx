
// Import necessary dependencies from React and UI components
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { chatService, replicaService } from '@/services/sensayApi';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // Import Alert component for error display

// Define the Message interface for chat messages
interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Define the props interface for the ChatInterface component
interface ChatInterfaceProps {
  mentorId: string;
  mentorName: string;
  mentorImage: string;
}

// ChatInterface component for interacting with historical figures
const ChatInterface = ({ mentorId, mentorName, mentorImage }: ChatInterfaceProps) => {
  // State for managing user input
  const [input, setInput] = useState('');
  
  // State for tracking all messages in the conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: `Hello! I am ${mentorName}. What would you like to learn about today?`,
      timestamp: new Date()
    }
  ]);
  
  // State for tracking loading state during API calls
  const [isLoading, setIsLoading] = useState(false);
  
  // State to store the replica ID from the API
  const [replicaId, setReplicaId] = useState<string | null>(null);
  
  // State to track API connection errors
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  // Reference to automatically scroll to the bottom of chat
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Hook for displaying toast notifications
  const { toast } = useToast();
  
  // Initialize the replica when the component mounts
  useEffect(() => {
    const initializeReplica = async () => {
      try {
        setConnectionError(null);
        // In a real app, this would be the authenticated user's ID
        const userId = `user-${Date.now()}`;
        
        // Get or create a replica for this historical figure
        const replicaUuid = await replicaService.getOrCreateHistoricalFigureReplica(
          userId, 
          {
            name: mentorName,
            description: `Historical figure: ${mentorName}`,
            era: "Historical",
            specialty: "Various subjects"
          }
        );
        
        setReplicaId(replicaUuid);
        console.log(`Successfully initialized replica for ${mentorName} with ID: ${replicaUuid}`);
      } catch (error) {
        console.error("Failed to initialize replica:", error);
        setConnectionError("Failed to connect to the AI service. Please try again later.");
        toast({
          title: "Connection Error",
          description: "Failed to initialize the chat. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    // Call the initialization function
    initializeReplica();
  }, [mentorName, toast]);
  
  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message to the AI
  const handleSend = async () => {
    // Check if input is empty or if there's no replica ID yet
    if (!input.trim() || !replicaId) return;
    
    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput(''); // Clear input field
    setIsLoading(true); // Show loading indicator
    
    try {
      // In a real app, this would be the authenticated user's ID
      const userId = `user-${Date.now()}`;
      
      // Send message to Sensay API
      const response = await chatService.sendMessage(userId, replicaId, input);
      
      if (response.success) {
        // Add AI response to the chat
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: response.content || "I'm processing your request...",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        console.log("Received successful response from AI:", response);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      // Show toast notification
      toast({
        title: "Error",
        description: "Failed to get response from mentor. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };
  
  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-mentorpurple-300/30">
      {/* Header with mentor information */}
      <div className="bg-mentorpurple-500 text-white p-4 flex items-center transition-colors duration-300 hover:bg-mentorpurple-600">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-white border-2 border-transparent hover:border-white transition-all duration-300 transform hover:scale-110">
          <img src={mentorImage} alt={mentorName} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-heading font-semibold">{mentorName}</h3>
      </div>
      
      {/* Display connection error if present */}
      {connectionError && (
        <Alert variant="destructive" className="m-4">
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>{connectionError}</AlertDescription>
        </Alert>
      )}
      
      {/* Chat message container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-white to-mentorpurple-50/30">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div 
              className={`max-w-[80%] ${
                msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              } animate-fade-in transition-all duration-300 hover:shadow-lg ${
                msg.role === 'user' ? 'hover:bg-mentorpurple-600' : 'hover:bg-gray-300/80'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="chat-bubble-ai flex space-x-2 items-center">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        {/* Reference for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input area */}
      <div className="p-4 border-t border-gray-200 bg-white">
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
            className="flex-grow focus-visible:ring-mentorpurple-500 transition-all duration-300 hover:border-mentorpurple-300"
            disabled={isLoading || !!connectionError}
          />
          <Button 
            type="submit"
            disabled={isLoading || !input.trim() || !replicaId || !!connectionError}
            className="bg-mentorpurple-500 hover:bg-mentorpurple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-mentorpurple-300/50"
          >
            <Send className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
