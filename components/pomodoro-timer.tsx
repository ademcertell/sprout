import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Maximize2 } from "lucide-react";

export function PomodoroTimer({
  completedPomodoros,
  onPomodoroComplete,
  workDuration,
  breakDuration,
  longBreakInterval,
}: {
  completedPomodoros: number;
  onPomodoroComplete: () => void;
  workDuration: number;
  breakDuration: number;
  longBreakInterval: number;
}) {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    setTimeLeft(workDuration * 60);
  }, [workDuration]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      onPomodoroComplete();
      setTimeLeft(breakDuration * 60);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, breakDuration, onPomodoroComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <Card className="bg-background/5 backdrop-blur">
      {isFocusMode ? (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl mb-4">Focus Mode</h1>
            <div className="text-white text-6xl font-bold mb-6">{formatTime(timeLeft)}</div>
            <Button
              onClick={() => setIsFocusMode(false)}
              className="bg-[#f35021] hover:bg-[#f35021]/90"
            >
              Exit Focus Mode
            </Button>
          </div>
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Pomodoro Timer</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="text-6xl font-bold tabular-nums">{formatTime(timeLeft)}</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsRunning(!isRunning)}
                className="h-12 w-12"
              >
                {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTimeLeft(workDuration * 60)}
                className="h-12 w-12"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
            </div>
            <Button
              className="mt-4 bg-[#f35021] hover:bg-[#f35021]/90"
              onClick={() => setIsFocusMode(true)}
            >
              <Maximize2 className="mr-2 h-4 w-4" /> Enter Focus Mode
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}
