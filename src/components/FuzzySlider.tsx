
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface FuzzySliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  info?: string;
  onChange: (value: number) => void;
}

const FuzzySlider = ({
  label,
  min,
  max,
  step,
  value,
  unit = "",
  info,
  onChange,
}: FuzzySliderProps) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleSliderChange = (values: number[]) => {
    const newValue = values[0];
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  const handleInputBlur = () => {
    const newValue = parseFloat(inputValue);
    
    if (isNaN(newValue)) {
      setInputValue(value.toString());
    } else {
      const constrainedValue = Math.max(min, Math.min(max, newValue));
      setInputValue(constrainedValue.toString());
      onChange(constrainedValue);
    }
  };

  return (
    <div className="space-y-2 mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">{label}</label>
          {info && (
            <div className="relative group">
              <span className="cursor-help text-xs rounded-full border border-gray-400 inline-flex items-center justify-center w-4 h-4">?</span>
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-black p-2 rounded text-xs w-48 z-10">
                {info}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <Input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            step={step}
            min={min}
            max={max}
            className="h-8 w-20 text-right text-sm"
          />
          {unit && <span className="ml-1 text-sm">{unit}</span>}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleSliderChange}
        className="mt-2"
      />
    </div>
  );
};

export default FuzzySlider;
