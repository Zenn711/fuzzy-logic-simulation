
import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useToast } from "@/hooks/use-toast";
import * as THREE from "three";

const FuzzyObject = ({ pwm = 0 }: { pwm: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.z = pwm / 1000;
    }
  }, [pwm]);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#9b87f5"} />
    </mesh>
  );
};

const PWMRing = ({ pwm = 0 }: { pwm: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const normalizedPWM = Math.abs(pwm) / 255; // Normalize to 0-1 range
  
  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.scale.x = 2 + normalizedPWM;
      ringRef.current.scale.y = 2 + normalizedPWM;
      ringRef.current.scale.z = 2 + normalizedPWM;
    }
  }, [normalizedPWM]);

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[1, 0.1, 16, 100]} />
      <meshStandardMaterial 
        color={pwm > 0 ? "#6E59A5" : "#7E69AB"} 
        wireframe={true} 
      />
    </mesh>
  );
};

const VisualizationTab = () => {
  const [pwm, setPwm] = useState(0);
  const [distance, setDistance] = useState(10);
  const [delta, setDelta] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fuzzyLogic = async () => {
      try {
        // Importing from lib/fuzzyLogic.ts
        const fuzzyModule = await import("@/lib/fuzzyLogic");
        const calculatedPWM = fuzzyModule.calculatePWM(distance, delta);
        setPwm(calculatedPWM);
      } catch (error) {
        console.error("Error in fuzzy logic calculation", error);
      }
    };
    
    fuzzyLogic();
  }, [distance, delta]);

  return (
    <div className="glass-card rounded-xl p-6 overflow-hidden">
      <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuzzy-purple-light to-fuzzy-purple">
        3D Visualization
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Distance (s): {distance} cm
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value))}
              className="w-full accent-fuzzy-purple"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Delta (ds): {delta.toFixed(1)}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={delta}
              onChange={(e) => setDelta(parseFloat(e.target.value))}
              className="w-full accent-fuzzy-purple"
            />
          </div>
          
          <div className="text-center p-4 border border-fuzzy-purple/20 rounded-lg">
            <h3 className="text-lg font-semibold">PWM Output</h3>
            <p className="text-4xl font-bold text-fuzzy-purple">{pwm.toFixed(0)}</p>
          </div>
          
          <button 
            className="bg-fuzzy-purple hover:bg-fuzzy-purple-dark text-white py-2 px-4 rounded-md transition-colors"
            onClick={() => {
              toast({
                title: "Visualization Info",
                description: `Direction: ${pwm > 0 ? "Forward" : pwm < 0 ? "Backward" : "Stationary"}, PWM: ${Math.abs(pwm).toFixed(0)}`,
              })
            }}
          >
            Show Details
          </button>
        </div>
        
        <div className="h-[400px] bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls enableZoom={true} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <FuzzyObject pwm={pwm} />
            <PWMRing pwm={pwm} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default VisualizationTab;
