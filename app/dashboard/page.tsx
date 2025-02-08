"use client"

import { useState } from "react"
import { Timer, Settings2, TreePine, Activity, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Statistics } from "@/components/statistics"
import { Tree } from "@/components/tree"
import { PomodoroTimer } from "@/components/pomodoro-timer"

export default function Dashboard() {
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [focusMode, setFocusMode] = useState(false)

  const handlePomodoroComplete = () => {
    setCompletedPomodoros((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <header className="border-b border-[#4ADE80]/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4ADE80]/10 text-[#4ADE80]">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm font-medium">Focus Score: {completedPomodoros * 25}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your focus score increases as you complete Pomodoro sessions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Timer Section */}
          <Card className="md:col-span-2 lg:col-span-2 bg-[#0F172A]/80 border-[#4ADE80]/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-[#4ADE80]" />
                <CardTitle>Pomodoro Timer</CardTitle>
              </div>
              <CardDescription>Focus on your tasks in timed intervals</CardDescription>
            </CardHeader>
            <CardContent>
              <PomodoroTimer
                completedPomodoros={completedPomodoros}
                onPomodoroComplete={handlePomodoroComplete}
                workDuration={workDuration}
                breakDuration={breakDuration}
                longBreakInterval={longBreakInterval}
                focusMode={focusMode}
                onFocusModeChange={setFocusMode}
              />
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card className="bg-[#0F172A]/80 border-[#4ADE80]/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#4ADE80]" />
                <CardTitle>Statistics</CardTitle>
              </div>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Statistics
                completed={completedPomodoros}
                remaining={Math.max(0, longBreakInterval - completedPomodoros)}
              />
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="md:col-span-2 lg:col-span-2 bg-[#0F172A]/80 border-[#4ADE80]/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-[#4ADE80]" />
                <CardTitle>Timer Settings</CardTitle>
              </div>
              <CardDescription>Customize your work sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Work Duration</Label>
                    <span className="text-sm text-[#4ADE80]">{workDuration} minutes</span>
                  </div>
                  <Slider
                    value={[workDuration]}
                    onValueChange={(value) => setWorkDuration(value[0])}
                    max={60}
                    min={1}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Break Duration</Label>
                    <span className="text-sm text-[#4ADE80]">{breakDuration} minutes</span>
                  </div>
                  <Slider
                    value={[breakDuration]}
                    onValueChange={(value) => setBreakDuration(value[0])}
                    max={30}
                    min={1}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Sessions Until Long Break</Label>
                    <span className="text-sm text-[#4ADE80]">{longBreakInterval} sessions</span>
                  </div>
                  <Slider
                    value={[longBreakInterval]}
                    onValueChange={(value) => setLongBreakInterval(value[0])}
                    max={8}
                    min={2}
                    step={1}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tree Visualization */}
          <Card className="bg-[#0F172A]/80 border-[#4ADE80]/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-[#4ADE80]" />
                <CardTitle>Growth Tree</CardTitle>
              </div>
              <CardDescription>Watch your progress grow</CardDescription>
            </CardHeader>
            <CardContent>
              <Tree completedPomodoros={completedPomodoros} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}