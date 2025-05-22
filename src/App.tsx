
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import { UserData } from "./components/Login";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<UserData | null>(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('mentorMindUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('mentorMindUser');
      }
    }
  }, []);

  const handleLogin = (userType: string, userData: UserData) => {
    setUser(userData);
    console.log(`${userType} logged in`);
  };

  const handleLogout = () => {
    localStorage.removeItem('mentorMindUser');
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index user={user} onLogout={handleLogout} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
