import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Stars, Float } from "@react-three/drei";
import { useToast } from "@/hooks/use-toast";
import * as THREE from "three";

// Komponen SonicWaves
const SonicWaves = ({ position = [0, 0, 0] as [number, number, number], active = true, distance = 10 }: { position?: [number, number, number]; active?: boolean; distance?: number }) => {
  const [waves, setWaves] = useState<{ id: number; scale: number; opacity: number }[]>([]);
  const maxWaves = 3;
  const waveSpeed = 0.1;
  const waveInterval = 0.8;
  const maxScale = distance * 0.1;

  useEffect(() => {
    if (!active) return;

    let waveIndex = 0;
    const timer = setInterval(() => {
      setWaves(prevWaves => {
        const newWaves = [
          ...prevWaves,
          { id: waveIndex, scale: 0.1, opacity: 0.8 }
        ].slice(-maxWaves);

        waveIndex++;
        return newWaves;
      });
    }, waveInterval * 1000);

    return () => clearInterval(timer);
  }, [active]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setWaves(prevWaves =>
        prevWaves
          .map(wave => ({
            ...wave,
            scale: wave.scale + waveSpeed,
            opacity: Math.max(0, 0.8 - (wave.scale / maxScale) * 0.8)
          }))
          .filter(wave => wave.opacity > 0)
      );
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [maxScale]);

  return (
    <group position={position}>
      {waves.map((wave) => (
        <mesh key={wave.id} position={[0, 0, 1]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[wave.scale, wave.scale * 2, 16, 1, true]} />
          <meshStandardMaterial
            color="#9b87f5"
            transparent={true}
            opacity={wave.opacity}
            side={THREE.DoubleSide}
            wireframe={true}
            metalness={0.6}
            roughness={0.2}
            emissive="#9b87f5"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Komponen ParticlesEffect
const ParticlesEffect = ({ pwm = 0, position = [0, 0, 0] as [number, number, number] }: { pwm?: number; position?: [number, number, number] }) => {
  const [particles, setParticles] = useState<{ id: number; position: [number, number, number]; velocity: [number, number, number]; size: number; opacity: number }[]>([]);

  useEffect(() => {
    if (Math.abs(pwm) < 20) return;

    const direction = Math.sign(pwm);
    const intensity = Math.min(1, Math.abs(pwm) / 200);

    const interval = setInterval(() => {
      if (Math.random() > 0.7 - intensity * 0.3) {
        setParticles(prev => {
          const randomOffset: [number, number, number] = [
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.1,
            -direction * (0.7 + Math.random() * 0.3)
          ];

          const newParticle = {
            id: Date.now() + Math.random(),
            position: [
              position[0] + randomOffset[0],
              position[1] + randomOffset[1],
              position[2] + randomOffset[2]
            ] as [number, number, number],
            velocity: [
              (Math.random() - 0.5) * 0.05,
              (Math.random() + 0.1) * 0.05,
              -direction * (0.05 + Math.random() * 0.05 * intensity)
            ] as [number, number, number],
            size: 0.05 + Math.random() * 0.1,
            opacity: 0.8
          };

          return [...prev, newParticle].slice(-15);
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pwm, position]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setParticles(prev =>
        prev
          .map(particle => ({
            ...particle,
            position: [
              particle.position[0] + particle.velocity[0],
              particle.position[1] + particle.velocity[1],
              particle.position[2] + particle.velocity[2]
            ] as [number, number, number],
            opacity: particle.opacity - 0.02,
            size: particle.size * 0.97
          }))
          .filter(particle => particle.opacity > 0)
      );

      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <group>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshStandardMaterial
            color={pwm > 0 ? "#50fa7b" : "#ff5555"}
            transparent={true}
            opacity={particle.opacity}
            emissive={pwm > 0 ? "#50fa7b" : "#ff5555"}
            emissiveIntensity={0.5}
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Komponen AnimatedGrid
const AnimatedGrid = ({ pwm = 0 }: { pwm?: number }) => {
  const gridRef = useRef<THREE.GridHelper>(null);
  const speed = pwm / 1000;

  useEffect(() => {
    if (!gridRef.current) return;

    const animate = () => {
      if (gridRef.current) {
        gridRef.current.position.z += speed;
        if (Math.abs(gridRef.current.position.z) > 1) {
          gridRef.current.position.z = 0;
        }
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <>
      <gridHelper
        ref={gridRef}
        args={[30, 30, "#6E59A5", "#333"]}
        position={[0, -0.99, 0]}
        rotation={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#222"
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>
    </>
  );
};

// Komponen RobotModel
const RobotModel = ({ pwm = 0, position = [0, 0, 0] as [number, number, number], distance }: { pwm: number; position: [number, number, number]; distance: number }) => {
  const bodyRef = useRef<THREE.Group>(null);
  const wheelFLRef = useRef<THREE.Mesh>(null);
  const wheelFRRef = useRef<THREE.Mesh>(null);
  const wheelBLRef = useRef<THREE.Mesh>(null);
  const wheelBRRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.8);
      } else if (width < 768) {
        setScale(0.9);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const robotZ = position[2];
  const actualDistanceToWall = 7.5 - robotZ;
  const lineLength = Math.min(distance, actualDistanceToWall);

  useEffect(() => {
    if (wheelFLRef.current && wheelFRRef.current && wheelBLRef.current && wheelBRRef.current) {
      const rotationSpeed = pwm / 2000;
      wheelFLRef.current.rotation.x += rotationSpeed;
      wheelFRRef.current.rotation.x += rotationSpeed;
      wheelBLRef.current.rotation.x += rotationSpeed;
      wheelBRRef.current.rotation.x += rotationSpeed;
    }
  }, [pwm]);

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0}>
      <group ref={bodyRef} position={[position[0], -0.43, position[2]]} scale={[scale, scale, scale]}> {/* Atur y=-0.65 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.5, 2]} />
          <meshStandardMaterial
            color="#6E59A5"
            metalness={0.5}
            roughness={0.3}
            emissive="#6E59A5"
            emissiveIntensity={0.05}
          />
        </mesh>

        <mesh position={[0, 0.3, 1.0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
          <meshStandardMaterial
            color="#9b87f5"
            metalness={0.6}
            roughness={0.2}
            emissive="#9b87f5"
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh ref={wheelFLRef} position={[0.8, -0.3, 0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#444"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={wheelFRRef} position={[-0.8, -0.3, 0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#444"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={wheelBLRef} position={[0.8, -0.3, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#444"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={wheelBRRef} position={[-0.8, -0.3, -0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial
            color="#444"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0.2, 1 + lineLength / 2 - 0.05]}>
          <boxGeometry args={[0.02, 0.02, lineLength]} />
          <meshStandardMaterial
            color="#fff"
            emissive="#fff"
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text position={[0.5, -0.3, 1 + lineLength / 2 - 0.05]} color="#fff" fontSize={0.3 * scale} anchorX="left">
            {distance.toFixed(1)}cm
          </Text>
        </Float>

        <SonicWaves position={[0, 0.3, 1.0]} active={true} distance={distance} />
        <ParticlesEffect pwm={pwm} position={[0, 0, -1.1]} />
      </group>
    </Float>
  );
};

// Komponen Environment
const Environment = ({ distance = 10, direction = 0 }: { distance: number; direction: number }) => {
  const obstacleColor = distance < 8 ? "#ff5555" : distance < 15 ? "#f1fa8c" : "#50fa7b";
  const [scale, setScale] = useState(1); // Tambahkan state scale

  // Logika responsif untuk skala
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.8); // Layar kecil
      } else if (width < 768) {
        setScale(0.9); // Layar sedang
      } else {
        setScale(1); // Layar besar
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <group scale={[scale, scale, scale]}> {/* Terapkan scale */}
      <AnimatedGrid pwm={direction * 50} />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text position={[-6, -0.9, 5]} rotation={[-Math.PI / 2, 0, 0]} color="#fff" fontSize={0.5}>
          10cm (target)
        </Text>
      </Float>

      <mesh position={[0, -0.95, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 0.1]} />
        <meshStandardMaterial
          color="#50fa7b"
          opacity={0.6}
          transparent={true}
          emissive="#50fa7b"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      <mesh position={[0, 0, 7.5]}>
        <boxGeometry args={[10, 2, 0.5]} />
        <meshStandardMaterial
          color={obstacleColor}
          metalness={0.3}
          roughness={0.7}
          emissive={obstacleColor}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Komponen PWMVisualizer
const PWMVisualizer = ({ pwm = 0 }: { pwm: number }) => {
  const normalizedPWM = Math.abs(pwm) / 255;
  const ringRef = useRef<THREE.Mesh>(null);
  const [glowing, setGlowing] = useState(false);
  const [position, setPosition] = useState<[number, number, number]>([4, 2, 0]); // Tambahkan state position

  // Logika responsif untuk posisi
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setPosition(isMobile ? [0, 3.5, 0] : [4, 2, 0]);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01 * Math.sign(pwm);
      ringRef.current.scale.x = ringRef.current.scale.y = ringRef.current.scale.z = 2 + normalizedPWM;
    }
    setGlowing(Math.abs(pwm) > 100);
  }, [pwm, normalizedPWM]);

  return (
    <group position={position}> {/* Gunakan state position */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={pwm > 0 ? "#6E59A5" : "#ff5555"}
          wireframe={true}
          emissive={pwm > 0 ? "#6E59A5" : "#ff5555"}
          emissiveIntensity={glowing ? 0.8 : 0.3}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {pwm !== 0 && (
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[0, 0, 0.1]} rotation={[0, 0, pwm > 0 ? 0 : Math.PI]}>
            <coneGeometry args={[0.4, 1, 12]} />
            <meshStandardMaterial
              color={pwm > 0 ? "#50fa7b" : "#ff5555"}
              emissive={pwm > 0 ? "#50fa7b" : "#ff5555"}
              emissiveIntensity={0.5}
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>
        </Float>
      )}

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text position={[0, -1.5, 0]} color="#fff" fontSize={0.5}>
          PWM: {pwm.toFixed(0)}
        </Text>
      </Float>
    </group>
  );
};

// Komponen VisualizationTab
const VisualizationTab = () => {
  const [pwm, setPwm] = useState(0);
  const [distance, setDistance] = useState(10);
  const [delta, setDelta] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [lastDistances, setLastDistances] = useState<number[]>([]);
  const [robotPosition, setRobotPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [simulationMode, setSimulationMode] = useState<"regular" | "oscillating" | "approaching">("regular");
  const [showStars, setShowStars] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('visualization-pwm', pwm.toString());
    localStorage.setItem('visualization-distance', distance.toString());
    localStorage.setItem('visualization-delta', delta.toString());
    localStorage.setItem('visualization-autoMode', autoMode.toString());
    localStorage.setItem('visualization-simulationMode', simulationMode);
    localStorage.setItem('visualization-showStars', showStars.toString());
  }, [pwm, distance, delta, autoMode, simulationMode, showStars]);

  useEffect(() => {
    const savedPwm = localStorage.getItem('visualization-pwm');
    const savedDistance = localStorage.getItem('visualization-distance');
    const savedDelta = localStorage.getItem('visualization-delta');
    const savedAutoMode = localStorage.getItem('visualization-autoMode');
    const savedSimulationMode = localStorage.getItem('visualization-simulationMode');
    const savedShowStars = localStorage.getItem('visualization-showStars');

    if (savedPwm) setPwm(parseFloat(savedPwm));
    if (savedDistance) setDistance(parseFloat(savedDistance));
    if (savedDelta) setDelta(parseFloat(savedDelta));
    if (savedAutoMode) setAutoMode(savedAutoMode === 'true');
    if (savedSimulationMode) setSimulationMode(savedSimulationMode as "regular" | "oscillating" | "approaching");
    if (savedShowStars) setShowStars(savedShowStars === 'true');
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
        newPosition.z = 7.5 - distance * 0.3;
        newPosition.z = Math.max(0, Math.min(5, newPosition.z)); // Perketat batas ke 7.4
        return newPosition;
      });
    }, 100);
  
    return () => clearInterval(interval);
  }, [autoMode, pwm, lastDistances, simulationMode, distance]);
  
  useEffect(() => {
    if (!autoMode) {
      setRobotPosition(prev => {
        const newPosition = prev.clone();
        newPosition.z = 7.5 - distance * 0.3;
        newPosition.z = Math.max(0, Math.min(5, newPosition.z)); // Perketat batas ke 7.4
        return newPosition;
      });
    }
  }, [autoMode, distance]);

  return (
    <div className="glass-card rounded-xl p-3 sm:p-6 overflow-hidden">
       <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuzzy-purple-light to-fuzzy-purple">
        3D Visualization
      </h2>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8"> {/* Ubah ke flex untuk mobile, grid untuk lg */}
        <div className="flex flex-col space-y-4 sm:space-y-6 order-2 lg:order-1"> {/* Order untuk responsivitas */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="text-lg font-medium">Control Panel</h3>
            <div className="flex items-center space-x-4">
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
              <div className="flex items-center space-x-2">
                <span className="text-sm">Stars</span>
                <button
                  className={`relative inline-flex h-5 w-9 items-center rounded-full ${showStars ? 'bg-fuzzy-purple' : 'bg-gray-700'}`}
                  onClick={() => setShowStars(!showStars)}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${showStars ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {autoMode && (
            <div className="p-3 sm:p-4 bg-black/20 border border-fuzzy-purple/20 rounded-lg group transition-all duration-300 hover:scale-[1.01]">
              <label className="block text-sm font-medium mb-2">Simulation Mode</label>
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2"> {/* Tambahkan xs: untuk mobile */}
                <button
                  className={`py-1 px-2 text-xs rounded ${simulationMode === "regular" ? "bg-fuzzy-purple text-white" : "bg-gray-800 text-gray-300"} transition-all duration-300 hover:scale-105`}
                  onClick={() => setSimulationMode("regular")}
                >
                  Regular
                </button>
                <button
                  className={`py-1 px-2 text-xs rounded ${simulationMode === "oscillating" ? "bg-fuzzy-purple text-white" : "bg-gray-800 text-gray-300"} transition-all duration-300 hover:scale-105`}
                  onClick={() => setSimulationMode("oscillating")}
                >
                  Oscillating
                </button>
                <button
                  className={`py-1 px-2 text-xs rounded ${simulationMode === "approaching" ? "bg-fuzzy-purple text-white" : "bg-gray-800 text-gray-300"} transition-all duration-300 hover:scale-105`}
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

          <div className="group transition-all duration-300 hover:scale-[1.01]">
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

          <div className="group transition-all duration-300 hover:scale-[1.01]">
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

          <div className="text-center p-4 border border-fuzzy-purple/20 rounded-lg bg-black/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:border-fuzzy-purple/40 hover:shadow-[0_0_15px_rgba(155,135,245,0.1)]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">PWM Output</h3>
              <span className={`font-medium px-2 py-1 rounded text-xs ${pwm > 0 ? "bg-green-500/20 text-green-300" : pwm < 0 ? "bg-red-500/20 text-red-300" : "bg-gray-500/20 text-gray-300"}`}>
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
            className="bg-fuzzy-purple hover:bg-fuzzy-purple-dark text-white py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(155,135,245,0.3)] w-full sm:w-auto" // Responsif untuk tombol
            onClick={() => {
              toast({
                title: "Visualization Info",
                description: `Direction: ${pwm > 0 ? "Forward" : pwm < 0 ? "Backward" : "Stationary"}, PWM: ${Math.abs(pwm).toFixed(0)}`,
              });
            }}
          >
            Show Details
          </button>
        </div>

        <div className="h-[300px] sm:h-[400px] lg:h-[600px] bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden relative transition-all duration-500 transform hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(155,135,245,0.2)] order-1 lg:order-2"> {/* Responsif tinggi */}
          <Canvas>
            <PerspectiveCamera
              makeDefault
              position={[0, 3, 6]}
              fov={window.innerWidth < 640 ? 60 : 50}
            />
            <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2 - 0.1} />
            <fog attach="fog" args={['#1a1a1a', 5, 20]} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <hemisphereLight args={['#9b87f5', '#000000', 0.3]} />

            {showStars && (
              <Stars
                radius={50}
                depth={50}
                count={1000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
              />
            )}

            <RobotModel pwm={pwm} position={[robotPosition.x, robotPosition.y, robotPosition.z]} distance={distance} />
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