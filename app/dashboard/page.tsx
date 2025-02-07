"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Maximize2 } from "lucide-react"
import { Statistics } from "@/components/statistics"
import { Tree } from "@/components/tree"
import { PomodoroTimer } from "@/components/pomodoro-timer"

export default function Dashboard() {
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [workDuration, setWorkDuration] = useState(15)
  const [breakDuration, setBreakDuration] = useState(5)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [focusMode, setFocusMode] = useState(false)

  const handlePomodoroComplete = () => {
    setCompletedPomodoros((prev) => prev + 1)
  }

  return (
    <main className="container mx-auto p-4 min-h-screen bg-[#0d0d0f] text-white">
      <div className="grid gap-4 md:grid-cols-3">
        <PomodoroTimer
          completedPomodoros={completedPomodoros}
          onPomodoroComplete={handlePomodoroComplete}
          workDuration={workDuration}
          breakDuration={breakDuration}
          longBreakInterval={longBreakInterval}
          focusMode={focusMode}
          onFocusModeChange={setFocusMode}
        />

        <Statistics completed={completedPomodoros} remaining={Math.max(0, longBreakInterval - completedPomodoros)} />

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
            <Button onClick={() => setFocusMode(true)} className="w-full bg-[#f35021] hover:bg-[#f35021]/90">
              <Maximize2 className="mr-2 h-4 w-4" />
              Enter Focus Mode
            </Button>
          </CardContent>
        </Card>

        <Tree completedPomodoros={completedPomodoros} />
      </div>
    </main>
  )
}

