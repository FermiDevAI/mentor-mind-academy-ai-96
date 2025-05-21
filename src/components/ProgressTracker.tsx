
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Calendar } from "lucide-react";

interface ProgressTrackerProps {
  mentorId: string;
}

const ProgressTracker = ({ mentorId }: ProgressTrackerProps) => {
  // This would be fetched from an API in a real application
  const progressData = {
    sessionsCompleted: 5,
    totalTimeMinutes: 75,
    lastSession: new Date(),
    topicsExplored: ['Relativity', 'Quantum Mechanics', 'Photoelectric Effect'],
    knowledgeProgress: 68,
    engagementLevel: 85,
    retentionRate: 72,
  };
  
  return (
    <Card className="border border-mentorpurple-200">
      <CardHeader className="bg-mentorpurple-50 border-b border-mentorpurple-100">
        <CardTitle className="text-lg font-heading">Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-mentorpurple-100 p-2 rounded-full mr-3">
              <BookOpen className="h-4 w-4 text-mentorpurple-700" />
            </div>
            <span className="text-sm">Sessions</span>
          </div>
          <span className="font-semibold">{progressData.sessionsCompleted}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-mentorpurple-100 p-2 rounded-full mr-3">
              <Clock className="h-4 w-4 text-mentorpurple-700" />
            </div>
            <span className="text-sm">Time Spent</span>
          </div>
          <span className="font-semibold">{progressData.totalTimeMinutes} mins</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-mentorpurple-100 p-2 rounded-full mr-3">
              <Calendar className="h-4 w-4 text-mentorpurple-700" />
            </div>
            <span className="text-sm">Last Session</span>
          </div>
          <span className="font-semibold">Today</span>
        </div>
        
        <div className="pt-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-foreground/70">Knowledge Progress</span>
            <span className="text-sm font-medium">{progressData.knowledgeProgress}%</span>
          </div>
          <Progress value={progressData.knowledgeProgress} className="h-2" />
        </div>
        
        <div className="pt-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-foreground/70">Engagement Level</span>
            <span className="text-sm font-medium">{progressData.engagementLevel}%</span>
          </div>
          <Progress value={progressData.engagementLevel} className="h-2" />
        </div>
        
        <div className="pt-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-foreground/70">Retention Rate</span>
            <span className="text-sm font-medium">{progressData.retentionRate}%</span>
          </div>
          <Progress value={progressData.retentionRate} className="h-2" />
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Topics Explored</h4>
          <div className="flex flex-wrap gap-2">
            {progressData.topicsExplored.map((topic, index) => (
              <span key={index} className="text-xs bg-mentorpurple-100 text-mentorpurple-700 px-3 py-1 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
