"use client";

import { Minus, Plus } from "lucide-react";

export interface CounterRowProps {
  value: number;
  label: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function CounterRow({ value, label, onIncrement, onDecrement }: CounterRowProps) {
  return (
    <div className="flex items-center justify-between bg-counter-bg rounded-full px-3 py-2 h-9 w-full">
      <button
        onClick={onDecrement}
        disabled={value === 0}
        aria-label={`Reducir ${label}`}
        className="text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus size={14} />
      </button>
      <span className="text-base text-black">
        {value} {label}
      </span>
      <button
        onClick={onIncrement}
        aria-label={`Aumentar ${label}`}
        className="text-slate-500 hover:text-slate-700"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
