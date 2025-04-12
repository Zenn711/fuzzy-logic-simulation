import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, useTexture } from "@react-three/drei";
import { useToast } from "@/hooks/use-toast";
import * as THREE from "three";

const RobotModel = ({ pwm = 0, position = [0, 0, 0] }: { pwm: number; position: THREE.Vector3 | [number, number, number] }) => {
  const bodyRef = useRef<THREE.Group>(null);
  const wheelFLRef = useRef<THREE.Mesh>(null);
  const wheelFRRef = useRef<THREE.Mesh>(null);
  const wheelBLRef = useRef<THREE.Mesh>(null);
  const wheelBRRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
    }
    
    if (wheelFLRef.current && wheelFRRef.current && wheelBLRef.current && wheelBRRef.current) {
      const rotationSpeed = pwm / 2000;
      wheelFLRef.current.rotation.x += rotationSpeed;
      wheelFRRef.current.rotation.x += rotationSpeed;
      wheelBLRef.current.rotation.x += rotationSpeed;
      wheelBRRef.current.rotation.x += rotationSpeed;
    }
  }, [pwm]);

  return (
    <group ref={bodyRef} position={position}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.5, 2]} />
        <meshStandardMaterial color="#6E59A5" />
      </mesh>
      
      <mesh position={[0, 0.3, 1.0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#9b87f5" />
      </mesh>
      
      <mesh ref={wheelFLRef} position={[0.8, -0.3, 0.6]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh ref={wheelFRRef} position={[-0.8, -0.3, 0.6]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh ref={wheelBLRef} position={[0.8, -0.3, -0.6]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh ref={wheelBRRef} position={[-0.8, -0.3, -0.6]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
};

const Environment = ({ distance = 10, direction = 0 }: { distance: number; direction: number }) => {
  const obstacleColor = distance < 8 
    ? "#ff5555" 
    : distance < 15 
      ? "#f1fa8c" 
      : "#50fa7b";

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      <mesh position={[0, -0.95, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 0.1]} />
        <meshStandardMaterial color="#50fa7b" opacity={0.6} transparent={true} />
      </mesh>
      
      <Text position={[-6, -0.9, 5]} rotation={[-Math.PI / 2, 0, 0]} color="#fff" fontSize={0.5}>
        10cm (target)
      </Text>
      
      <mesh position={[0, 0, 10]}>
        <boxGeometry args={[10, 2, 0.5]} />
        <meshStandardMaterial color={obstacleColor} />
      </mesh>
      
      <mesh position={[0, -0.9, 5 + distance/2]}>
        <boxGeometry args={[0.02, 0.02, distance]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      
      <Text 
        position={[0.5, -0.9, 5 + distance/2]} 
        color="#fff" 
        fontSize={0.3} 
        anchorX="left"
      >
        {distance.toFixed(1)}cm
      </Text>
    </group>
  );
};

const PWMVisualizer = ({ pwm = 0 }: { pwm: number }) => {
  const normalizedPWM = Math.abs(pwm) / 255;
  const ringRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01 * Math.sign(pwm);
      ringRef.current.scale.x = ringRef.current.scale.y = ringRef.current.scale.z = 2 + normalizedPWM;
    }
  }, [pwm, normalizedPWM]);

  return (
    <group position={[4, 2, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial 
          color={pwm > 0 ? "#6E59A5" : "#ff5555"} 
          wireframe={true} 
        />
      </mesh>
      
      {pwm !== 0 && (
        <mesh position={[0, 0, 0.1]} rotation={[0, 0, pwm > 0 ? 0 : Math.PI]}>
          <coneGeometry args={[0.4, 1, 12]} />
          <meshStandardMaterial color={pwm > 0 ? "#50fa7b" : "#ff5555"} />
        </mesh>
      )}
      
      <Text position={[0, -1.5, 0]} color="#fff" fontSize={0.5}>
        PWM: {pwm.toFixed(0)}
      </Text>
    </group>
  );
};

const VisualizationTab = () => {
  const [pwm, setPwm] = useState(0);
  const [distance, setDistance] = useState(10);
  const [delta, setDelta] = useState(0);
  const { toast } = useToast();
  const [autoMode, setAutoMode] = useState(false);
  const [lastDistances, setLastDistances] = useState<number[]>([]);
  const [robotPosition, setRobotPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [simulationMode, setSimulationMode] = useState<"regular" | "oscillating" | "approaching">("regular");

  useEffect(() => {
    localStorage.setItem('visualization-pwm', pwm.toString());
    localStorage.setItem('visualization-distance', distance.toString());
    localStorage.setItem('visualization-delta', delta.toString());
    localStorage.setItem('visualization-autoMode', autoMode.toString());
    localStorage.setItem('visualization-simulationMode', simulationMode);
  }, [pwm, distance, delta, autoMode, simulationMode]);

  useEffect(() => {
    const savedPwm = localStorage.getItem('visualization-pwm');
    const savedDistance = localStorage.getItem('visualization-distance');
    const savedDelta = localStorage.getItem('visualization-delta');
    const savedAutoMode = localStorage.getItem('visualization-autoMode');
    const savedSimulationMode = localStorage.getItem('visualization-simulationMode');

    if (savedPwm) setPwm(parseFloat(savedPwm));
    if (savedDistance) setDistance(parseFloat(savedDistance));
    if (savedDelta) setDelta(parseFloat(savedDelta));
    if (savedAutoMode) setAutoMode(savedAutoMode === 'true');
    if (savedSimulationMode) setSimulationMode(savedSimulationMode as "regular" | "oscillating" | "approaching");
  }, []);

  useEffect(() => {
    const fuzzyLogic = async () => {
      try {
        const fuzzyModule = await import("@/lib/fuzzyLogic");
        const calculatedPWM = fuzzyModule.calculatePWM(distance, delta);
        setPwm(calculatedPWM);
      } catch (error) {
        console.error("Error in fuzzy logic calculation", error);
      }
    };
    
    fuzzyLogic();

    setLastDistances(prev => {
      const newDistances = [...prev, distance].slice(-10);
      return newDistances;
    });
  }, [distance, delta]);

  useEffect(() => {
    if (!autoMode) return;
    
    const interval = setInterval(() => {
      if (simulationMode === "regular") {
        setDistance(prev => {
          const pwmEffect = -pwm * 0.001;
          const newDistance = Math.max(1, Math.min(30, prev + pwmEffect));
          return newDistance;
        });
      } else if (simulationMode === "oscillating") {
        setDistance(prev => {
          const oscillation = Math.sin(Date.now() * 0.001) * 3;
          return Math.max(5, Math.min(15, 10 + oscillation));
        });
      } else if (simulationMode === "approaching") {
        setDistance(prev => {
          if (prev > 5) {
            return prev - 0.1;
          } else {
            return 20;
          }
        });
      }
      
      if (lastDistances.length >= 2) {
        const newDelta = lastDistances[lastDistances.length - 1] - lastDistances[lastDistances.length - 2];
        setDelta(newDelta);
      }
      
      setRobotPosition(prev => {
        const newPosition = prev.clone();
        newPosition.z = 10 - distance * 0.3;
        newPosition.z = Math.max(0, Math.min(9, newPosition.z));
        return newPosition;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [autoMode, pwm, lastDistances, simulationMode]);

  useEffect(() => {
    if (!autoMode) {
      setRobotPosition(prev => {
        const newPosition = prev.clone();
        newPosition.z = 10 - distance * 0.3;
        newPosition.z = Math.max(0, Math.min(9, newPosition.z));
        return newPosition;
      });
    }
  }, [distance, autoMode]);

  return (
    <div className="glass-card rounded-xl p-6 overflow-hidden">
      <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuzzy-purple-light to-fuzzy-purple">
        3D Visualization
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Control Panel</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Simulation</span>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${autoMode ? 'bg-fuzzy-purple' : 'bg-gray-700'}`}
                onClick={() => setAutoMode(!autoMode)}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${autoMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm">{autoMode ? 'Auto' : 'Manual'}</span>
            </div>
          </div>
          
          {autoMode && (
            <div className="p-3 bg-black/20 border border-fuzzy-purple/20 rounded-lg">
              <label className="block text-sm font-medium mb-2">Simulation Mode</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`py-1 px-2 text-xs rounded ${simulationMode === "regular" ? "bg-fuzzy-purple text-white" : "bg-gray-800 text-gray-300"}`}
                  onClick={() => setSimulationMode("regular")}
                >
                  Regular
                </button>
                <button
                  className={`py-1 px-2 text-xs rounded ${simulationMode === "oscillating" ? "bg-fuzzy-purple text-white" : "bg-gray-800 text-gray-300"}`}
                  onClick={() => setSimulationMode("oscillating")}
                >
                  Oscillating
                </button>
                <button
                  className={`py-1 px-2 text-xs rounded ${simulationMode === "approaching" ? "bg-fuzzy-purple text-white" : "bg-gray-800 text-gray-300"}`}
                  onClick={() => setSimulationMode("approaching")}
                >
                  Approaching
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {simulationMode === "regular" ? "Responds to PWM values" : 
                 simulationMode === "oscillating" ? "Distance oscillates around target" : 
                 "Gradually approaches the wall"}
              </p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Distance (s): {distance.toFixed(1)} cm
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value))}
              disabled={autoMode}
              className={`w-full accent-fuzzy-purple ${autoMode ? 'opacity-50' : ''}`}
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
              disabled={autoMode}
              className={`w-full accent-fuzzy-purple ${autoMode ? 'opacity-50' : ''}`}
            />
          </div>
          
          <div className="text-center p-4 border border-fuzzy-purple/20 rounded-lg bg-black/20 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">PWM Output</h3>
              <span className={`font-medium px-2 py-1 rounded text-xs ${
                pwm > 0 ? "bg-green-500/20 text-green-300" : 
                pwm < 0 ? "bg-red-500/20 text-red-300" : 
                "bg-gray-500/20 text-gray-300"
              }`}>
                {pwm > 0 ? "FORWARD" : pwm < 0 ? "BACKWARD" : "STOPPED"}
              </span>
            </div>
            <div className="h-6 w-full bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${pwm > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ 
                  width: `${Math.min(100, Math.abs(pwm) / 2)}%`,
                  marginLeft: pwm > 0 ? '50%' : '',
                  marginRight: pwm < 0 ? '50%' : '',
                  transition: 'all 0.3s ease'
                }}
              ></div>
            </div>
            <p className="text-4xl font-bold text-fuzzy-purple mt-2">{pwm.toFixed(0)}</p>
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
        
        <div className="h-[500px] bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden relative">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 3, 6]} fov={50} />
            <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} />
            <fog attach="fog" args={['#1a1a1a', 5, 20]} />
            
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <hemisphereLight args={['#9b87f5', '#000000', 0.3]} />
            
            <RobotModel pwm={pwm} position={robotPosition} />
            <Environment distance={distance} direction={Math.sign(pwm)} />
            <PWMVisualizer pwm={pwm} />
          </Canvas>
          
          {autoMode && (
            <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white p-2 rounded">
              Autonomous Mode: {
                simulationMode === "regular" ? "Following fuzzy logic rules" :
                simulationMode === "oscillating" ? "Testing system stability" :
                "Testing approach response"
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualizationTab;
