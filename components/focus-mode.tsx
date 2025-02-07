import React from "react";

export default function FocusMode({
  timeLeft,
  exitFocusMode,
}: {
  timeLeft: number;
  exitFocusMode: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Focus Mode</h1>
        <p className="text-6xl font-mono">{timeLeft}</p>
        <button
          className="mt-6 bg-orange-500 text-white px-6 py-3 rounded"
          onClick={exitFocusMode}
        >
          Exit Focus Mode
        </button>
      </div>
    </div>
  );
}
