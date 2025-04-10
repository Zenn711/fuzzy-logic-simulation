import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FuzzySlider from "./FuzzySlider";
import PwmDisplay from "./PwmDisplay";
import { calculatePWM } from "@/lib/fuzzyLogic";
import { 
  mu_terlalu_dekat, 
  mu_target, 
  mu_dekat, 
  mu_jauh,
  mu_mendekat,
  mu_stabil,
  mu_menjauh,
  generateMembershipFunctionPoints
} from "@/lib/fuzzyLogic";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, Info, PlayCircle, PauseCircle, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

// Robot simulation visualization 
const RobotSimulation = ({ distance, pwm }: { distance: number; pwm: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Scale distance for visualization (0-20cm maps to canvas width)
    const maxCanvasWidth = canvas.width;
    const robotWidth = 60;
    const obstacleWidth = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw target zone
    const targetPos = maxCanvasWidth * 0.5;
    ctx.fillStyle = 'rgba(80, 250, 123, 0.1)';
    ctx.fillRect(targetPos - 10, 0, 20, canvas.height);
    ctx.strokeStyle = 'rgba(80, 250, 123, 0.5)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(targetPos, 0);
    ctx.lineTo(targetPos, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw obstacle
    const obsPosition = maxCanvasWidth - (distance / 20) * maxCanvasWidth;
    
    // Color based on distance
    let obsColor;
    if (distance < 8) {
      obsColor = '#ff5555';
    } else if (distance < 12) {
      obsColor = '#f1fa8c';
    } else {
      obsColor = '#50fa7b';
    }
    
    ctx.fillStyle = obsColor;
    ctx.fillRect(obsPosition - obstacleWidth/2, 10, obstacleWidth, canvas.height - 20);
    
    // Draw robot
    const robotPosition = 50; // Fixed position on the left
    ctx.fillStyle = '#7E69AB';
    ctx.fillRect(robotPosition - robotWidth/2, canvas.height/2 - 15, robotWidth, 30);
    
    // Draw sensor beam
    ctx.strokeStyle = 'rgba(155, 135, 245, 0.6)';
    ctx.beginPath();
    ctx.moveTo(robotPosition + robotWidth/2, canvas.height/2);
    ctx.lineTo(obsPosition - obstacleWidth/2, canvas.height/2);
    ctx.stroke();
    
    // Draw distance text
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    const distanceText = `${distance.toFixed(1)} cm`;
    const midPoint = (robotPosition + robotWidth/2 + obsPosition - obstacleWidth/2) / 2;
    ctx.fillText(distanceText, midPoint, canvas.height/2 - 10);
    
    // Draw PWM indicator (motor power)
    ctx.fillStyle = pwm > 0 ? '#50fa7b' : pwm < 0 ? '#ff5555' : '#aaaaaa';
    const pwmHeight = Math.abs(pwm) / 200 * 20;
    const pwmWidth = 10;
    ctx.fillRect(
      robotPosition - pwmWidth - 5, 
      canvas.height/2 - pwmHeight/2, 
      pwmWidth, 
      pwmHeight
    );
    
    // Direction arrow
    if (pwm !== 0) {
      ctx.fillStyle = pwm > 0 ? '#50fa7b' : '#ff5555';
      const arrowLength = 15;
      const arrowWidth = 5;
      const arrowAngle = Math.atan2(obsPosition - robotPosition, canvas.height/2 - pwmHeight/2);
      
      ctx.beginPath();
      if (pwm > 0) {
        // Right-pointing arrow
        ctx.moveTo(robotPosition + robotWidth/2 + arrowLength, canvas.height/2);
        ctx.lineTo(robotPosition + robotWidth/2 + arrowLength - arrowWidth, canvas.height/2 - arrowWidth);
        ctx.lineTo(robotPosition + robotWidth/2 + arrowLength - arrowWidth, canvas.height/2 + arrowWidth);
      } else {
        // Left-pointing arrow
        ctx.moveTo(robotPosition - robotWidth/2 - arrowLength, canvas.height/2);
        ctx.lineTo(robotPosition - robotWidth/2 - arrowLength + arrowWidth, canvas.height/2 - arrowWidth);
        ctx.lineTo(robotPosition - robotWidth/2 - arrowLength + arrowWidth, canvas.height/2 + arrowWidth);
      }
      ctx.fill();
    }
    
  }, [distance, pwm]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={600} 
      height={150} 
      className="w-full h-auto border border-gray-700 rounded-lg bg-black/20"
    />
  );
};

const SimulationTab = () => {
  const [distance, setDistance] = useState(10);
  const [deltaDistance, setDeltaDistance] = useState(0);
  const [pwm, setPwm] = useState(0);
  const [history, setHistory] = useState<{ distance: number; deltaDistance: number; pwm: number; timestamp: number }[]>([]);
  const [showDistanceChart, setShowDistanceChart] = useState(true);
  const [showDeltaChart, setShowDeltaChart] = useState(true);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(500); // ms between updates
  const [simulationTime, setSimulationTime] = useState(0);
  const [simulationPath, setSimulationPath] = useState<{time: number; distance: number}[]>([]);

  // Initialize simulation path
  useEffect(() => {
    // Generate a random path for the simulation
    const generateRandomPath = () => {
      const path: {time: number; distance: number}[] = [];
      let currentTime = 0;
      let currentDistance = 15; // Start at 15cm
      
      // Generate 30 seconds of path data
      while (currentTime < 30000) {
        path.push({time: currentTime, distance: currentDistance});
        
        // Calculate next point (random walk with boundaries)
        const step = (Math.random() - 0.5) * 0.5;
        currentDistance = Math.max(2, Math.min(18, currentDistance + step));
        currentTime += 100;
      }
      
      return path;
    };
    
    setSimulationPath(generateRandomPath());
  }, []);

  // Calculate PWM when inputs change
  useEffect(() => {
    const calculatedPwm = calculatePWM(distance, deltaDistance);
    setPwm(calculatedPwm);
  }, [distance, deltaDistance]);

  // Simulation effect - update distance and delta based on PWM and time
  useEffect(() => {
    if (!simulationRunning) return;
    
    const interval = setInterval(() => {
      setSimulationTime(prev => {
        const newTime = prev + simulationSpeed;
        
        // Find closest path point to current time
        const pathIndex = Math.floor(newTime / 100);
        if (pathIndex < simulationPath.length) {
          const targetDistance = simulationPath[pathIndex].distance;
          
          // Update distance - consider PWM effect
          setDistance(prev => {
            // PWM effect: positive PWM moves robot forward (reduces distance)
            const pwmEffect = -pwm * 0.001 * simulationSpeed; 
            const naturalChange = (targetDistance - prev) * 0.1; // Natural trend toward path
            return Math.max(1, Math.min(20, prev + pwmEffect + naturalChange));
          });
          
          // Update delta after distance changed
          setDeltaDistance(prev => {
            // Calculate new delta based on previous distance
            const oldDistance = distance;
            return distance - oldDistance;
          });
          
          // Add to history periodically (every 1 second)
          if (newTime % 1000 < simulationSpeed) {
            handleAddToHistory();
          }
        }
        
        return newTime;
      });
    }, simulationSpeed);
    
    return () => clearInterval(interval);
  }, [simulationRunning, simulationPath, simulationSpeed, distance, pwm]);

  const handleAddToHistory = () => {
    const newEntry = {
      distance,
      deltaDistance,
      pwm,
      timestamp: Date.now()
    };
    setHistory(prev => [...prev, newEntry]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };
  
  const handleResetSimulation = () => {
    setSimulationTime(0);
    setDistance(10);
    setDeltaDistance(0);
  };

  // Generate data for membership function charts
  const distanceData = [
    ...generateMembershipFunctionPoints(mu_terlalu_dekat, 0, 20, 100).map(p => ({ ...p, category: "Terlalu Dekat" })),
    ...generateMembershipFunctionPoints(mu_target, 0, 20, 100).map(p => ({ ...p, category: "Target" })),
    ...generateMembershipFunctionPoints(mu_dekat, 0, 20, 100).map(p => ({ ...p, category: "Dekat" })),
    ...generateMembershipFunctionPoints(mu_jauh, 0, 20, 100).map(p => ({ ...p, category: "Jauh" }))
  ];

  const deltaData = [
    ...generateMembershipFunctionPoints(mu_mendekat, -10, 10, 100).map(p => ({ ...p, category: "Mendekat" })),
    ...generateMembershipFunctionPoints(mu_stabil, -10, 10, 100).map(p => ({ ...p, category: "Stabil" })),
    ...generateMembershipFunctionPoints(mu_menjauh, -10, 10, 100).map(p => ({ ...p, category: "Menjauh" }))
  ];
  
  // Format time for display
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    return `${seconds}.${ms.toString().padStart(3, '0')}s`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Fuzzy Logic Control Simulation</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About the Simulation</h4>
                    <p className="text-sm">
                      This simulation shows how fuzzy logic controls a robot's movement to maintain a target distance from an obstacle.
                    </p>
                    <p className="text-sm">
                      <strong>Manual mode:</strong> Adjust sliders to see how the system responds.
                    </p>
                    <p className="text-sm">
                      <strong>Auto mode:</strong> Watch the system automatically control the robot along a predefined path.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <RobotSimulation distance={distance} pwm={pwm} />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSimulationRunning(!simulationRunning)}
                  className="flex items-center gap-1"
                >
                  {simulationRunning ? 
                    <><PauseCircle className="h-4 w-4" /> Pause</> : 
                    <><PlayCircle className="h-4 w-4" /> Run</>
                  }
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleResetSimulation}
                >
                  Reset
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs">Slow</span>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="100"
                  value={simulationSpeed}
                  onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                  className="w-24 accent-fuzzy-purple"
                />
                <span className="text-xs">Fast</span>
              </div>
              
              <div className="text-sm font-mono">
                Time: {formatTime(simulationTime)}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <FuzzySlider
              label="Distance (s)"
              min={0}
              max={20}
              step={0.1}
              value={distance}
              unit="cm"
              info="Sensor reading of distance (0-20cm). The target is around 10cm."
              onChange={setDistance}
            />
            <FuzzySlider
              label="Delta Distance (ds)"
              min={-10}
              max={10}
              step={0.1}
              value={deltaDistance}
              unit="cm"
              info="Change in distance. Negative means getting closer, positive means moving away."
              onChange={setDeltaDistance}
            />
            <Separator className="my-4" />
            <PwmDisplay pwm={pwm} />
            
            <div className="flex mt-6 space-x-2">
              <Button 
                onClick={handleAddToHistory} 
                className="flex-1 bg-fuzzy-purple hover:bg-fuzzy-purple-dark"
              >
                Add to History
              </Button>
              {history.length > 0 && (
                <Button 
                  onClick={handleClearHistory} 
                  variant="outline" 
                  className="flex-1"
                >
                  Clear History
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {history.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Simulation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left pb-2">#</th>
                      <th className="text-left pb-2">Distance (cm)</th>
                      <th className="text-left pb-2">Delta (cm)</th>
                      <th className="text-left pb-2">PWM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry, index) => (
                      <tr key={entry.timestamp} className="border-b border-gray-800">
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">{entry.distance.toFixed(1)}</td>
                        <td className="py-2">{entry.deltaDistance.toFixed(1)}</td>
                        <td className={`py-2 ${entry.pwm > 0 ? "text-green-400" : entry.pwm < 0 ? "text-red-400" : ""}`}>
                          {Math.round(entry.pwm)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Membership Functions</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={showDistanceChart ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowDistanceChart(!showDistanceChart)}
                  className="text-xs h-7"
                >
                  Distance
                </Button>
                <Button
                  variant={showDeltaChart ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowDeltaChart(!showDeltaChart)}
                  className="text-xs h-7"
                >
                  Delta
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {showDistanceChart && (
              <div>
                <h3 className="text-sm font-medium mb-2">Distance Membership</h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="x" 
                        domain={[0, 20]}
                        type="number"
                        ticks={[0, 5, 10, 15, 20]}
                        label={{ value: 'Distance (cm)', position: 'bottom', offset: 0 }}
                      />
                      <YAxis domain={[0, 1]} ticks={[0, 0.5, 1]} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const dataPoint = payload[0].payload;
                            return (
                              <div className="bg-black p-2 rounded text-xs border border-gray-700">
                                <p>Distance: {dataPoint.x.toFixed(1)} cm</p>
                                <p>Membership: {dataPoint.y.toFixed(2)}</p>
                                <p>Category: {dataPoint.category}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      {distanceData.filter(d => d.category === "Terlalu Dekat").length > 0 && (
                        <Line 
                          data={distanceData.filter(d => d.category === "Terlalu Dekat")}
                          type="monotone" 
                          dataKey="y" 
                          stroke="#ff5555" 
                          dot={false} 
                          name="Terlalu Dekat"
                          isAnimationActive={false}
                        />
                      )}
                      {distanceData.filter(d => d.category === "Target").length > 0 && (
                        <Line 
                          data={distanceData.filter(d => d.category === "Target")}
                          type="monotone" 
                          dataKey="y" 
                          stroke="#50fa7b" 
                          dot={false} 
                          name="Target"
                          isAnimationActive={false}
                        />
                      )}
                      {distanceData.filter(d => d.category === "Dekat").length > 0 && (
                        <Line 
                          data={distanceData.filter(d => d.category === "Dekat")}
                          type="monotone" 
                          dataKey="y" 
                          stroke="#bd93f9" 
                          dot={false} 
                          name="Dekat"
                          isAnimationActive={false}
                        />
                      )}
                      {distanceData.filter(d => d.category === "Jauh").length > 0 && (
                        <Line 
                          data={distanceData.filter(d => d.category === "Jauh")}
                          type="monotone" 
                          dataKey="y" 
                          stroke="#ff79c6" 
                          dot={false} 
                          name="Jauh"
                          isAnimationActive={false}
                        />
                      )}
                      {/* Current distance line */}
                      <Line 
                        data={[{x: distance, y: 0}, {x: distance, y: 1}]}
                        type="monotone" 
                        dataKey="y" 
                        stroke="#f8f8f2" 
                        strokeDasharray="3 3"
                        dot={false} 
                        name="Current"
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {showDeltaChart && (
              <div>
                <h3 className="text-sm font-medium mb-2">Delta Distance Membership</h3>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="x" 
                        domain={[-10, 10]}
                        type="number"
                        ticks={[-10, -5, 0, 5, 10]}
                        label={{ value: 'Delta Distance (cm)', position: 'bottom', offset: 0 }}
                      />
                      <YAxis domain={[0, 1]} ticks={[0, 0.5, 1]} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const dataPoint = payload[0].payload;
                            return (
                              <div className="bg-black p-2 rounded text-xs border border-gray-700">
                                <p>Delta: {dataPoint.x.toFixed(1)} cm</p>
                                <p>Membership: {dataPoint.y.toFixed(2)}</p>
                                <p>Category: {dataPoint.category}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      {deltaData.filter(d => d.category === "Mendekat").length > 0 && (
                        <Line 
                          data={deltaData.filter(d => d.category === "Mendekat")}
                          type="monotone" 
                          dataKey="y" 
                          stroke="#ff5555" 
                          dot={false} 
                          name="Mendekat"
                          isAnimationActive={false}
                        />
                      )}
                      {deltaData.filter(d => d.category === "Stabil").length > 0 && (
                        <Line 
                          data={deltaData.filter(d => d.category === "Stabil")}
                          type="monotone" 
                          dataKey="y" 
                          stroke="#f1fa8c" 
                          dot={false} 
                          name="Stabil"
                          isAnimationActive={false}
                        />
                      )}
                      {deltaData.filter(d => d.category === "Menjauh").length > 0 && (
                        <Line 
                          data={deltaData.filter(d => d.category === "Menjauh")}
                          type="monotone" 
                          dataKey="y" 
                          stroke="#8be9fd" 
                          dot={false} 
                          name="Menjauh"
                          isAnimationActive={false}
                        />
                      )}
                      {/* Current delta line */}
                      <Line 
                        data={[{x: deltaDistance, y: 0}, {x: deltaDistance, y: 1}]}
                        type="monotone" 
                        dataKey="y" 
                        stroke="#f8f8f2" 
                        strokeDasharray="3 3"
                        dot={false} 
                        name="Current"
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Current Memberships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Distance Memberships</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Terlalu Dekat:</span>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-red-500" style={{width: `${mu_terlalu_dekat(distance) * 50}px`}}></div>
                      <span className="text-xs font-mono">{mu_terlalu_dekat(distance).toFixed(3)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Target:</span>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-green-500" style={{width: `${mu_target(distance) * 50}px`}}></div>
                      <span className="text-xs font-mono">{mu_target(distance).toFixed(3)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Dekat:</span>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-purple-500" style={{width: `${mu_dekat(distance) * 50}px`}}></div>
                      <span className="text-xs font-mono">{mu_dekat(distance).toFixed(3)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Jauh:</span>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-pink-500" style={{width: `${mu_jauh(distance) * 50}px`}}></div>
                      <span className="text-xs font-mono">{mu_jauh(distance).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Delta Memberships</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Mendekat:</span>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-red-500" style={{width: `${mu_mendekat(deltaDistance) * 50}px`}}></div>
                      <span className="text-xs font-mono">{mu_mendekat(deltaDistance).toFixed(3)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Stabil:</span>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-yellow-300" style={{width: `${mu_stabil(deltaDistance) * 50}px`}}></div>
                      <span className="text-xs font-mono">{mu_stabil(deltaDistance).toFixed(3)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Menjauh:</span>
                    <div className="flex items-center gap-2">
                      <div className="h-3 bg-blue-300" style={{width: `${mu_menjauh(deltaDistance) * 50}px`}}></div>
                      <span className="text-xs font-mono">{mu_menjauh(deltaDistance).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimulationTab;
