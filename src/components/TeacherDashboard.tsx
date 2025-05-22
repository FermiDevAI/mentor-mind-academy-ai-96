
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { BookOpen, FileText, Plus, Upload, GraduationCap, Users } from "lucide-react";

interface CourseData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'draft' | 'published';
  createdAt: Date;
}

const TeacherDashboard = () => {
  // Sample courses data
  const [courses, setCourses] = useState<CourseData[]>([
    {
      id: '1',
      title: 'Introduction to Physics',
      description: 'Basic concepts of classical mechanics and modern physics.',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      status: 'published',
      createdAt: new Date('2023-11-15')
    },
    {
      id: '2',
      title: 'World History: Ancient Civilizations',
      description: 'Explore the rise and fall of ancient civilizations and their impact on our world.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      status: 'draft',
      createdAt: new Date('2023-12-05')
    }
  ]);
  
  // State for new course dialog
  const [showNewCourseDialog, setShowNewCourseDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
  });
  
  // State for transcript upload dialog
  const [showTranscriptDialog, setShowTranscriptDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [transcript, setTranscript] = useState('');
  
  // Handlers
  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new course
    const newCourseData: CourseData = {
      id: Math.random().toString(36).substring(2, 9),
      title: newCourse.title,
      description: newCourse.description,
      imageUrl: newCourse.imageUrl,
      status: 'draft',
      createdAt: new Date()
    };
    
    setCourses([...courses, newCourseData]);
    setNewCourse({ title: '', description: '', imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b' });
    setShowNewCourseDialog(false);
    
    toast({
      title: "Course created",
      description: "Your new course has been created successfully."
    });
  };
  
  const handleUploadTranscript = () => {
    if (!transcript) {
      toast({
        title: "No transcript",
        description: "Please enter your transcript content.",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Transcript uploaded for course:", selectedCourse?.title);
    console.log("Transcript content:", transcript);
    
    setShowTranscriptDialog(false);
    setTranscript('');
    setSelectedCourse(null);
    
    toast({
      title: "Transcript uploaded",
      description: "Your transcript has been added to your knowledge base."
    });
  };
  
  const openTranscriptDialog = (course: CourseData) => {
    setSelectedCourse(course);
    setShowTranscriptDialog(true);
  };
  
  // Stats data
  const stats = [
    { label: "Total Courses", value: courses.length, icon: BookOpen },
    { label: "Published", value: courses.filter(c => c.status === 'published').length, icon: FileText },
    { label: "Students", value: 23, icon: Users }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Teacher Dashboard</h1>
          <p className="text-foreground/70">Manage your courses and knowledge base</p>
          <p className="text-xs text-mentorpurple-500 italic">Powered by Wisdom Engine of Sensay</p>
        </div>
        <Button 
          onClick={() => setShowNewCourseDialog(true)}
          className="mt-4 md:mt-0 bg-mentorpurple-500 hover:bg-mentorpurple-600"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Course
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-mentorpurple-50">
            <CardContent className="p-6 flex items-center">
              <div className="bg-mentorpurple-100 p-3 rounded-full mr-4">
                <stat.icon className="h-6 w-6 text-mentorpurple-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Learning progress chart */}
      <Card className="mb-10">
        <CardContent className="p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Student Engagement</h2>
          <div className="h-[300px] bg-mentorpurple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <GraduationCap className="h-12 w-12 text-mentorpurple-300 mx-auto mb-4" />
              <p className="text-foreground/70">Student engagement visualization will appear here.</p>
              <p className="text-sm text-mentorpurple-400">Coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Courses list */}
      <h2 className="text-2xl font-heading font-semibold mb-6">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="h-40 overflow-hidden relative">
              <img 
                src={course.imageUrl} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  course.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {course.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-heading font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{course.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-foreground/50">
                  Created: {course.createdAt.toLocaleDateString()}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openTranscriptDialog(course)}
                  className="text-xs border-mentorpurple-200"
                >
                  <Upload className="h-3 w-3 mr-1" /> Upload Transcript
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* New Course Dialog */}
      <Dialog open={showNewCourseDialog} onOpenChange={setShowNewCourseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium mb-1 block">Course Title</label>
              <Input
                id="title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                placeholder="Enter course title"
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                id="description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                placeholder="Enter course description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowNewCourseDialog(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-mentorpurple-500 hover:bg-mentorpurple-600" 
              onClick={handleCreateCourse}
            >
              Create Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Transcript Upload Dialog */}
      <Dialog open={showTranscriptDialog} onOpenChange={setShowTranscriptDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Transcript for {selectedCourse?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-foreground/70 mb-4">
              Add your lecture transcript, notes, or knowledge to build your AI replica for this course.
              This content will be used to train the AI to respond like you.
            </p>
            <Textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your lecture transcript or notes here..."
              rows={10}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowTranscriptDialog(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-mentorpurple-500 hover:bg-mentorpurple-600" 
              onClick={handleUploadTranscript}
            >
              Upload Transcript
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
