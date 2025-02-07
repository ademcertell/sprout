"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Tree({ completedPomodoros }: { completedPomodoros: number }) {
  // Growth stages for the tree
  const growthStages = ["🌱", "🌿", "🌳", "🌲"]; // Different stages of growth

  // Determine the current stage based on completedPomodoros
  const currentStage =
    completedPomodoros >= growthStages.length
      ? growthStages[growthStages.length - 1] // If completedPomodoros exceeds stages, stick to the last stage
      : growthStages[completedPomodoros];

  return (
    <Card className="bg-background/5 backdrop-blur col-span-3">
      <CardHeader>
        <CardTitle>Your Tree</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="text-6xl">{currentStage}</div>
        <p className="text-sm text-gray-400">
          Complete more Pomodoros to grow your tree!
        </p>
      </CardContent>
    </Card>
  );
}
