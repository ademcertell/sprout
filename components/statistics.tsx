"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Statistics({ completed, remaining }: { completed: number; remaining: number }) {
  const total = completed + remaining;
  const completedPercentage = (completed / total) * 100;
  const remainingPercentage = 100 - completedPercentage;

  return (
    <Card className="bg-background/5 backdrop-blur">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        {/* Donut Chart */}
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            {/* Background Circle */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke="#FFB86C"
              strokeWidth="2.5"
            />
            {/* Completed Circle */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke="#f35021"
              strokeWidth="2.5"
              strokeDasharray={`${completedPercentage} ${remainingPercentage}`}
              strokeDashoffset="25"
              strokeLinecap="round"
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
            {completedPercentage.toFixed(0)}%
          </div>
        </div>
        {/* Legend */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: "#f35021" }}
            ></span>
            <span className="text-sm text-white">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: "#FFB86C" }}
            ></span>
            <span className="text-sm text-white">Remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
