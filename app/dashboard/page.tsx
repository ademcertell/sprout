"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Play, Pause, RotateCcw, Maximize2 } from "lucide-react";
import { Statistics } from "@/components/statistics";
import { Tree } from "@/components/tree";

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // Default: 15 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [workDuration, setWorkDuration] = useState(15);
  const [breakDuration, setBreakDuration] = useState(5);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    // Reset timeLeft whenever workDuration changes
    setTimeLeft(workDuration * 60);
  }, [workDuration]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setCompletedPomodoros((prev) => prev + 1);
      setTimeLeft(workDuration * 60); // Reset to work duration
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, workDuration]);

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(workDuration * 60);
  };
  const enterFocusMode = () => setFocusMode(true);
  const exitFocusMode = () => setFocusMode(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const statisticsData = [
    { name: "Completed", value: completedPomodoros },
    { name: "Remaining", value: Math.max(0, longBreakInterval - completedPomodoros) },
  ];

  const COLORS = ["#f35021", "#FFB86C"];

  return (
    <main className="container mx-auto p-4 min-h-screen bg-[#0d0d0f] text-white">
      {focusMode ? (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50">
          <h1 className="text-3xl font-bold mb-4">Focus Mode</h1>
          <div className="text-6xl font-bold mb-6">{formatTime(timeLeft)}</div>
          <Button onClick={exitFocusMode} className="bg-[#f35021] hover:bg-[#f35021]/90">
            Exit Focus Mode
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {/* Pomodoro Timer */}
          <Card className="bg-background/5 backdrop-blur">
            <CardHeader>
              <CardTitle>Pomodoro Timer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="text-6xl font-bold tabular-nums">{formatTime(timeLeft)}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleStartPause} className="h-12 w-12">
                  {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button variant="outline" size="icon" onClick={handleReset} className="h-12 w-12">
                  <RotateCcw className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Statistics completed={completedPomodoros} remaining={Math.max(0, longBreakInterval - completedPomodoros)} />


          {/* Settings */}
          <Card className="bg-background/5 backdrop-blur">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Work Duration</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[workDuration]}
                    onValueChange={(value) => setWorkDuration(value[0])}
                    max={60}
                    min={1}
                    step={1}
                  />
                  <span className="w-12 text-sm">{workDuration}m</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Break Duration</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[breakDuration]}
                    onValueChange={(value) => setBreakDuration(value[0])}
                    max={30}
                    min={1}
                    step={1}
                  />
                  <span className="w-12 text-sm">{breakDuration}m</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Long Break Interval</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[longBreakInterval]}
                    onValueChange={(value) => setLongBreakInterval(value[0])}
                    max={10}
                    min={1}
                    step={1}
                  />
                  <span className="w-12 text-sm">{longBreakInterval}</span>
                </div>
              </div>
              <Button onClick={enterFocusMode} className="w-full bg-[#f35021] hover:bg-[#f35021]/90">
                <Maximize2 className="mr-2 h-4 w-4" />
                Enter Focus Mode
              </Button>
            </CardContent>
          </Card>

          {/* Tree */}
          <Tree completedPomodoros={completedPomodoros} />

        </div>
      )}
    </main>
  );
}
