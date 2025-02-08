"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Maximize2 } from "lucide-react"

export function Settings() {
  const [workDuration, setWorkDuration] = useState(15)
  const [breakDuration, setBreakDuration] = useState(5)
  const [longBreakInterval, setLongBreakInterval] = useState(4)

  const enterFocusMode = () => {
    // Implementation for focus mode
  }

  return (
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
              max={8}
              min={2}
              step={1}
            />
            <span className="w-12 text-sm">{longBreakInterval}</span>
          </div>
        </div>
        <Button className="w-full bg-[#4ADE80] hover:bg-[#22C55E] text-[#0F172A]" onClick={enterFocusMode}>
          <Maximize2 className="mr-2 h-4 w-4" />
          Enter Focus Mode
        </Button>
      </CardContent>
    </Card>
  )
}