
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";

interface FuzzySliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: string;
  info: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const FuzzySlider: React.FC<FuzzySliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  unit,
  info,
  onChange,
  disabled = false
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">{label}</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-full p-1 text-gray-400 hover:text-gray-300">
                <InfoIcon className="h-3 w-3" />
                <span className="sr-only">Info</span>
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" align="start" className="w-80 p-3 text-sm">
              {info}
            </PopoverContent>
          </Popover>
        </div>
        <span className="text-sm font-mono bg-black/30 px-2 py-1 rounded">
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-fuzzy-purple"
        disabled={disabled}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default FuzzySlider;
