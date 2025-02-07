import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Maximize2 } from "lucide-react";

export function Settings({
  workDuration,
  breakDuration,
  longBreakInterval,
  onSettingsChange,
  onEnterFocusMode,
}: {
  workDuration: number;
  breakDuration: number;
  longBreakInterval: number;
  onSettingsChange: (settings: { workDuration: number; breakDuration: number; longBreakInterval: number }) => void;
  onEnterFocusMode: () => void;
}) {
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
              onValueChange={(value) => onSettingsChange({ workDuration: value[0], breakDuration, longBreakInterval })}
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
              onValueChange={(value) => onSettingsChange({ workDuration, breakDuration: value[0], longBreakInterval })}
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
              onValueChange={(value) => onSettingsChange({ workDuration, breakDuration, longBreakInterval: value[0] })}
              max={10}
              min={2}
              step={1}
            />
            <span className="w-12 text-sm">{longBreakInterval}</span>
          </div>
        </div>
        <Button className="w-full bg-[#f35021] hover:bg-[#f35021]/90" onClick={onEnterFocusMode}>
          <Maximize2 className="mr-2 h-4 w-4" />
          Enter Focus Mode
        </Button>
      </CardContent>
    </Card>
  );
}
