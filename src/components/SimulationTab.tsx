
import { useState, useEffect } from "react";
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
import { HelpCircle, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SimulationTab = () => {
  const [distance, setDistance] = useState(10);
  const [deltaDistance, setDeltaDistance] = useState(0);
  const [pwm, setPwm] = useState(0);
  const [history, setHistory] = useState<{ distance: number; deltaDistance: number; pwm: number; timestamp: number }[]>([]);
  const [showDistanceChart, setShowDistanceChart] = useState(true);
  const [showDeltaChart, setShowDeltaChart] = useState(true);

  // Calculate PWM when inputs change
  useEffect(() => {
    const calculatedPwm = calculatePWM(distance, deltaDistance);
    setPwm(calculatedPwm);
  }, [distance, deltaDistance]);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Fuzzy Logic Inputs</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About the Inputs</h4>
                    <p className="text-sm">
                      <strong>Distance (s):</strong> Represents the sensor reading of distance to an object. In the Arduino implementation, this comes from an ultrasonic sensor.
                    </p>
                    <p className="text-sm">
                      <strong>Delta Distance (ds):</strong> Represents the change in distance between current and previous readings. Negative values mean the object is getting closer, positive means it's moving away.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
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
                    <span className="text-xs font-mono">{mu_terlalu_dekat(distance).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Target:</span>
                    <span className="text-xs font-mono">{mu_target(distance).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Dekat:</span>
                    <span className="text-xs font-mono">{mu_dekat(distance).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Jauh:</span>
                    <span className="text-xs font-mono">{mu_jauh(distance).toFixed(3)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Delta Memberships</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Mendekat:</span>
                    <span className="text-xs font-mono">{mu_mendekat(deltaDistance).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Stabil:</span>
                    <span className="text-xs font-mono">{mu_stabil(deltaDistance).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Menjauh:</span>
                    <span className="text-xs font-mono">{mu_menjauh(deltaDistance).toFixed(3)}</span>
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
