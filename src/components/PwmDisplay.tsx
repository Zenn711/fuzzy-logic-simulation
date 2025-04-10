
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface PwmDisplayProps {
  pwm: number;
}

const PwmDisplay = ({ pwm }: PwmDisplayProps) => {
  const [animateChange, setAnimateChange] = useState(false);
  const normalizedPwm = Math.round(pwm);
  const absValue = Math.abs(normalizedPwm);
  const barWidth = (absValue / 200) * 100;
  
  const direction = normalizedPwm > 0 ? 'right' : normalizedPwm < 0 ? 'left' : 'none';
  
  useEffect(() => {
    setAnimateChange(true);
    const timer = setTimeout(() => setAnimateChange(false), 300);
    return () => clearTimeout(timer);
  }, [pwm]);

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">PWM Output</h3>
        <div 
          className={cn(
            "text-2xl font-bold transition-all duration-300",
            animateChange ? "text-fuzzy-purple-light scale-110" : "",
            normalizedPwm > 0 ? "text-green-400" : 
            normalizedPwm < 0 ? "text-red-400" : "text-gray-400"
          )}
        >
          {normalizedPwm}
        </div>
      </div>
      
      <div className="relative h-10 bg-gray-800 rounded-md overflow-hidden">
        {/* Center line */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-gray-600"></div>
        </div>
        
        {/* Bar indicator */}
        {direction !== 'none' && (
          <div 
            className={cn(
              "absolute top-0 bottom-0 transition-all duration-300 ease-out",
              direction === 'right' ? "left-1/2 bg-green-500/70" : "right-1/2 bg-red-500/70",
              animateChange ? "animate-pulse-glow" : ""
            )}
            style={{ 
              width: `${barWidth / 2}%` 
            }}
          ></div>
        )}
        
        {/* Direction arrows */}
        {direction === 'right' && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <span className="text-white text-xs">►</span>
          </div>
        )}
        {direction === 'left' && (
          <div className="absolute inset-y-0 left-2 flex items-center">
            <span className="text-white text-xs">◄</span>
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-400 flex justify-between">
        <span>-200</span>
        <span>0</span>
        <span>200</span>
      </div>
    </div>
  );
};

export default PwmDisplay;
