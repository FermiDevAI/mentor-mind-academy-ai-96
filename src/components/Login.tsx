
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, School } from "lucide-react";

interface LoginProps {
  onLogin: (userType: string, userData: UserData) => void;
}

export interface UserData {
  name: string;
  email: string;
  userType: 'student' | 'teacher';
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // For demo, we'll simulate login with validation
    setTimeout(() => {
      setLoading(false);
      
      if (email && password) {
        // In a real app, you would validate credentials against a server
        const userData: UserData = {
          name: email.split('@')[0], // Using part of email as name for demo
          email,
          userType
        };
        
        // Store user in localStorage for persistence
        localStorage.setItem('mentorMindUser', JSON.stringify(userData));
        
        toast({
          title: "Logged in successfully",
          description: `Welcome back to MentorMind!`,
        });
        
        onLogin(userType, userData);
        navigate('/');
      } else {
        toast({
          title: "Login failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      if (name && email && password) {
        // In a real app, you would send registration data to a server
        const userData: UserData = {
          name,
          email,
          userType
        };
        
        // Store user in localStorage for persistence
        localStorage.setItem('mentorMindUser', JSON.stringify(userData));
        
        toast({
          title: "Account created successfully",
          description: "Welcome to MentorMind! Your adventure begins now.",
        });
        
        onLogin(userType, userData);
        navigate('/');
      } else {
        toast({
          title: "Registration failed",
          description: "Please fill all required fields",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-mentorpurple-50 to-mentorpurple-100">
      <Card className="w-[400px] shadow-xl bg-white/90 backdrop-blur-md animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="/favicon.svg" alt="MentorMind" className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl font-heading gradient-text">Welcome to MentorMind</CardTitle>
          <CardDescription>Sign in to continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={userType === 'student' ? 'default' : 'outline'}
                    className={`flex-1 ${userType === 'student' ? 'bg-mentorpurple-500' : ''}`}
                    onClick={() => setUserType('student')}
                  >
                    <User className="mr-2 h-4 w-4" /> Student
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'teacher' ? 'default' : 'outline'}
                    className={`flex-1 ${userType === 'teacher' ? 'bg-mentorpurple-500' : ''}`}
                    onClick={() => setUserType('teacher')}
                  >
                    <School className="mr-2 h-4 w-4" /> Teacher
                  </Button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-mentorpurple-500 hover:bg-mentorpurple-600" 
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={userType === 'student' ? 'default' : 'outline'}
                    className={`flex-1 ${userType === 'student' ? 'bg-mentorpurple-500' : ''}`}
                    onClick={() => setUserType('student')}
                  >
                    <User className="mr-2 h-4 w-4" /> Student
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'teacher' ? 'default' : 'outline'}
                    className={`flex-1 ${userType === 'teacher' ? 'bg-mentorpurple-500' : ''}`}
                    onClick={() => setUserType('teacher')}
                  >
                    <School className="mr-2 h-4 w-4" /> Teacher
                  </Button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-mentorpurple-500 hover:bg-mentorpurple-600" 
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center text-xs text-muted-foreground">
          By continuing, you agree to MentorMind's Terms and Privacy Policy
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
