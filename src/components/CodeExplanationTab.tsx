
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CodeExplanationTab = () => {
  const [codeTheme, setCodeTheme] = useState<'dark' | 'darker'>('darker');

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Fuzzy Logic Algorithm Explanation</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Theme:</span>
            <div className="flex border border-gray-700 rounded-md overflow-hidden">
              <button 
                className={`px-3 py-1 text-xs ${codeTheme === 'dark' ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400'}`}
                onClick={() => setCodeTheme('dark')}
              >
                Dark
              </button>
              <button 
                className={`px-3 py-1 text-xs ${codeTheme === 'darker' ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400'}`}
                onClick={() => setCodeTheme('darker')}
              >
                Darker
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-fuzzy-purple-light mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  This fuzzy logic control system maintains a target distance from obstacles by dynamically 
                  adjusting motor speed and direction based on distance sensor readings.
                </p>
                <div className="mt-4 rounded-md border border-fuzzy-purple/20 p-4 bg-black/20">
                  <h4 className="text-lg font-medium text-fuzzy-purple-light mb-2">Key Components</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li><strong>Input Variables:</strong> Distance (s) and Delta Distance (ds)</li>
                    <li><strong>Output:</strong> PWM control signal (-200 to +200)</li>
                    <li><strong>Membership Functions:</strong> Linguistic variables defining fuzzy sets</li>
                    <li><strong>Rule Base:</strong> 12 if-then rules mapping inputs to outputs</li>
                    <li><strong>Defuzzification:</strong> Weighted average method</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-fuzzy-purple-light mb-3">Control Flow</h3>
                <div className="rounded-md border border-fuzzy-purple/20 p-4 bg-black/20">
                  <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Distance Sensing</span>
                      <p className="text-sm mt-1">Read current distance from ultrasonic sensor</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Delta Calculation</span>
                      <p className="text-sm mt-1">Compare with previous reading to determine rate of change</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Fuzzification</span>
                      <p className="text-sm mt-1">Convert crisp inputs to fuzzy membership values</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Rule Evaluation</span>
                      <p className="text-sm mt-1">Apply 12 fuzzy rules to determine control actions</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Defuzzification</span>
                      <p className="text-sm mt-1">Convert fuzzy output to crisp PWM control signal</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Motor Control</span>
                      <p className="text-sm mt-1">Apply PWM to motors to adjust position</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/40 rounded-md p-4 mb-6">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <h3 className="text-lg font-semibold">How Fuzzy Logic Improves Control</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Unlike traditional control systems that use exact values and thresholds, fuzzy logic excels at handling the inherent 
                imprecision in real-world sensing. This approach allows for smooth transitions between different control actions,
                resulting in more stable and natural movement.
              </p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="membership_functions" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                Membership Functions
              </AccordionTrigger>
              <AccordionContent>
                <Tabs defaultValue="distance">
                  <TabsList className="mb-4 bg-gray-800/50">
                    <TabsTrigger value="distance">Distance</TabsTrigger>
                    <TabsTrigger value="delta">Delta Distance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="distance">
                    <div className="space-y-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-fuzzy-purple-light">mu_terlalu_dekat (Too Close)</h4>
                          <Badge variant="outline" className="text-red-400 border-red-400/30">Trapezoid</Badge>
                        </div>
                        <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 my-2 border border-gray-700`}>
                          <code>
{`// Returns 1.0 when distance ≤ 6cm, decreases linearly to 0 between 6-8cm
float mu_terlalu_dekat(float s) { 
  if (s <= 6) return 1.0; 
  else if (s < 8) return (8 - s) / 2.0; 
  else return 0.0; 
}`}
                          </code>
                        </pre>
                        <div className="flex mt-2 items-start">
                          <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                          <p className="text-sm text-gray-300">
                            This function identifies when the robot is too close to an obstacle. It returns a full membership value of 1.0
                            when the distance is 6cm or less, then gradually decreases to 0 between 6-8cm.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-fuzzy-purple-light">mu_target (Target Distance)</h4>
                          <Badge variant="outline" className="text-green-400 border-green-400/30">Gaussian</Badge>
                        </div>
                        <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 my-2 border border-gray-700`}>
                          <code>
{`// Gaussian membership function centered at 10cm
float mu_target(float s) { 
  return exp(-pow(s - 10, 2) / 2.0); 
}`}
                          </code>
                        </pre>
                        <div className="flex mt-2 items-start">
                          <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                          <p className="text-sm text-gray-300">
                            A Gaussian membership function that peaks at exactly 10cm (the ideal distance) and gradually falls off as 
                            the distance deviates from this target. The exponential function creates a smooth bell curve.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-fuzzy-purple-light">mu_dekat (Close)</h4>
                          <Badge variant="outline" className="text-purple-400 border-purple-400/30">Triangle</Badge>
                        </div>
                        <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 my-2 border border-gray-700`}>
                          <code>
{`// Triangular membership function peaking at 15cm
float mu_dekat(float s) { 
  if (s < 10) return 0.0; 
  else if (s <= 15) return (s - 10) / 5.0; 
  else if (s <= 20) return (20 - s) / 5.0; 
  else return 0.0; 
}`}
                          </code>
                        </pre>
                        <div className="flex mt-2 items-start">
                          <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                          <p className="text-sm text-gray-300">
                            A triangular membership function that represents distances that are slightly beyond the target but not yet "far".
                            The membership value increases linearly from 10-15cm, then decreases linearly from 15-20cm.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-fuzzy-purple-light">mu_jauh (Far)</h4>
                          <Badge variant="outline" className="text-pink-400 border-pink-400/30">Trapezoid</Badge>
                        </div>
                        <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 my-2 border border-gray-700`}>
                          <code>
{`// Returns 0 when distance ≤ 14cm, increases linearly to 1 at 18cm and beyond
float mu_jauh(float s) { 
  if (s <= 14) return 0.0; 
  else if (s < 18) return (s - 14) / 4.0; 
  else return 1.0; 
}`}
                          </code>
                        </pre>
                        <div className="flex mt-2 items-start">
                          <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                          <p className="text-sm text-gray-300">
                            This function identifies when the obstacle is far away. It returns 0 for distances of 14cm or less, 
                            then increases linearly to 1.0 between 14-18cm, remaining at 1.0 for all distances beyond 18cm.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="delta">
                    <div className="space-y-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-fuzzy-purple-light">mu_mendekat (Approaching)</h4>
                          <Badge variant="outline" className="text-red-400 border-red-400/30">Trapezoid</Badge>
                        </div>
                        <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 my-2 border border-gray-700`}>
                          <code>
{`// Negative delta means the object is getting closer
float mu_mendekat(float ds) { 
  if (ds >= -4 && ds < -1) return (-ds - 1) / 3.0; 
  else if (ds < -4) return 1.0; 
  else return 0.0; 
}`}
                          </code>
                        </pre>
                        <div className="flex mt-2 items-start">
                          <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                          <p className="text-sm text-gray-300">
                            A negative delta means the distance is decreasing (object getting closer). This function returns 1.0 
                            when the rate of approach is rapid (ds ≤ -4), then decreases linearly to 0 between -4 and -1.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-fuzzy-purple-light">mu_stabil (Stable)</h4>
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">Gaussian</Badge>
                        </div>
                        <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 my-2 border border-gray-700`}>
                          <code>
{`// Gaussian function centered at 0 (no change in distance)
float mu_stabil(float ds) { 
  return exp(-pow(ds, 2) / 2.0); 
}`}
                          </code>
                        </pre>
                        <div className="flex mt-2 items-start">
                          <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                          <p className="text-sm text-gray-300">
                            A Gaussian membership function centered at 0, which represents no change in distance. The function 
                            returns 1.0 when ds = 0 and decreases symmetrically as the rate of change increases in either direction.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-fuzzy-purple-light">mu_menjauh (Moving Away)</h4>
                          <Badge variant="outline" className="text-blue-400 border-blue-400/30">Trapezoid</Badge>
                        </div>
                        <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 my-2 border border-gray-700`}>
                          <code>
{`// Positive delta means the object is moving away
float mu_menjauh(float ds) { 
  if (ds > 1 && ds <= 4) return (ds - 1) / 3.0; 
  else if (ds > 4) return 1.0; 
  else return 0.0; 
}`}
                          </code>
                        </pre>
                        <div className="flex mt-2 items-start">
                          <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                          <p className="text-sm text-gray-300">
                            A positive delta means the distance is increasing (object moving away). This function returns 0 for 
                            changes of 1cm or less, increases linearly to 1.0 between 1-4cm, and remains at 1.0 for faster rates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="fuzzy_rules" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                Fuzzy Rules & Logic
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-4 p-3 bg-gray-800/50 rounded-md">
                  <p className="text-sm text-gray-300">
                    The system employs 12 IF-THEN rules that define how the robot should respond to different combinations of 
                    distance and delta values. Each rule takes the form:
                  </p>
                  <p className="text-sm text-fuzzy-purple-light italic mt-2">
                    IF (distance is X) AND (delta is Y) THEN (output is Z)
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/30 p-3 rounded-md border border-gray-700">
                    <h4 className="text-sm font-medium mb-2 text-fuzzy-purple-light">Rule Combination Method</h4>
                    <p className="text-xs text-gray-300">
                      The system uses the <span className="text-yellow-300">MIN operator</span> to combine antecedents, 
                      meaning the rule's activation level (alpha) is determined by the minimum membership value between 
                      the distance and delta inputs.
                    </p>
                    <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-2 rounded-md text-xs overflow-x-auto font-mono text-gray-300 mt-2 border border-gray-700`}>
                      <code>alpha = fminf(mu_terlalu_dekat(s), mu_mendekat(ds));</code>
                    </pre>
                  </div>
                  
                  <div className="bg-gray-800/30 p-3 rounded-md border border-gray-700">
                    <h4 className="text-sm font-medium mb-2 text-fuzzy-purple-light">Output Aggregation</h4>
                    <p className="text-xs text-gray-300">
                      The system accumulates weighted outputs using the <span className="text-yellow-300">weighted sum method</span>, 
                      where each rule's output is weighted by its alpha value.
                    </p>
                    <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-2 rounded-md text-xs overflow-x-auto font-mono text-gray-300 mt-2 border border-gray-700`}>
                      <code>sum_alpha_output += alpha * (-200); 
sum_alpha += alpha;</code>
                    </pre>
                  </div>
                </div>
                
                <div className="rounded-md border border-gray-700 overflow-hidden mb-6">
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <h4 className="font-medium text-sm">Rule Table</h4>
                  </div>
                  <div className="p-1">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gray-900">
                          <th className="p-2 border border-gray-700"></th>
                          <th className="p-2 border border-gray-700 text-red-400">Mendekat<br/>(Approaching)</th>
                          <th className="p-2 border border-gray-700 text-yellow-400">Stabil<br/>(Stable)</th>
                          <th className="p-2 border border-gray-700 text-blue-400">Menjauh<br/>(Moving Away)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-700 bg-gray-900 text-red-400">Terlalu Dekat<br/>(Too Close)</td>
                          <td className="p-2 border border-gray-700 text-center">-200<br/><span className="text-gray-500">Strong Reverse</span></td>
                          <td className="p-2 border border-gray-700 text-center">-100<br/><span className="text-gray-500">Moderate Reverse</span></td>
                          <td className="p-2 border border-gray-700 text-center">0<br/><span className="text-gray-500">Stop</span></td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-700 bg-gray-900 text-green-400">Target</td>
                          <td className="p-2 border border-gray-700 text-center">-100<br/><span className="text-gray-500">Moderate Reverse</span></td>
                          <td className="p-2 border border-gray-700 text-center">0<br/><span className="text-gray-500">Stop</span></td>
                          <td className="p-2 border border-gray-700 text-center">100<br/><span className="text-gray-500">Moderate Forward</span></td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-700 bg-gray-900 text-purple-400">Dekat<br/>(Close)</td>
                          <td className="p-2 border border-gray-700 text-center">-100<br/><span className="text-gray-500">Moderate Reverse</span></td>
                          <td className="p-2 border border-gray-700 text-center">0<br/><span className="text-gray-500">Stop</span></td>
                          <td className="p-2 border border-gray-700 text-center">50<br/><span className="text-gray-500">Slow Forward</span></td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-700 bg-gray-900 text-pink-400">Jauh<br/>(Far)</td>
                          <td className="p-2 border border-gray-700 text-center">100<br/><span className="text-gray-500">Moderate Forward</span></td>
                          <td className="p-2 border border-gray-700 text-center">200<br/><span className="text-gray-500">Fast Forward</span></td>
                          <td className="p-2 border border-gray-700 text-center">200<br/><span className="text-gray-500">Fast Forward</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <ScrollArea className="h-80 rounded-md border border-gray-700">
                  <div className="p-4">
                    <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light">Complete Rule Evaluation Code</h4>
                    <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                      <code>
{`// Initialize output accumulators
float sum_alpha_output = 0.0;
float sum_alpha = 0.0;
float alpha;

// Rule 1: IF distance is too_close AND delta is approaching THEN output is strong_reverse
alpha = fminf(mu_terlalu_dekat(s), mu_mendekat(ds));
sum_alpha_output += alpha * (-200);
sum_alpha += alpha;

// Rule 2: IF distance is too_close AND delta is stable THEN output is moderate_reverse
alpha = fminf(mu_terlalu_dekat(s), mu_stabil(ds));
sum_alpha_output += alpha * (-100);
sum_alpha += alpha;

// Rule 3: IF distance is too_close AND delta is moving_away THEN output is stop
alpha = fminf(mu_terlalu_dekat(s), mu_menjauh(ds));
sum_alpha_output += alpha * 0;
sum_alpha += alpha;

// Rule 4: IF distance is target AND delta is stable THEN output is stop
alpha = fminf(mu_target(s), mu_stabil(ds));
sum_alpha_output += alpha * 0;
sum_alpha += alpha;

// Rule 5: IF distance is target AND delta is approaching THEN output is moderate_reverse
alpha = fminf(mu_target(s), mu_mendekat(ds));
sum_alpha_output += alpha * (-100);
sum_alpha += alpha;

// Rule 6: IF distance is target AND delta is moving_away THEN output is moderate_forward
alpha = fminf(mu_target(s), mu_menjauh(ds));
sum_alpha_output += alpha * 100;
sum_alpha += alpha;

// Rule 7: IF distance is close AND delta is approaching THEN output is moderate_reverse
alpha = fminf(mu_dekat(s), mu_mendekat(ds));
sum_alpha_output += alpha * (-100);
sum_alpha += alpha;

// Rule 8: IF distance is close AND delta is stable THEN output is stop
alpha = fminf(mu_dekat(s), mu_stabil(ds));
sum_alpha_output += alpha * 0;
sum_alpha += alpha;

// Rule 9: IF distance is close AND delta is moving_away THEN output is slow_forward
alpha = fminf(mu_dekat(s), mu_menjauh(ds));
sum_alpha_output += alpha * 50;
sum_alpha += alpha;

// Rule 10: IF distance is far AND delta is approaching THEN output is moderate_forward
alpha = fminf(mu_jauh(s), mu_mendekat(ds));
sum_alpha_output += alpha * 100;
sum_alpha += alpha;

// Rule 11: IF distance is far AND delta is stable THEN output is fast_forward
alpha = fminf(mu_jauh(s), mu_stabil(ds));
sum_alpha_output += alpha * 200;
sum_alpha += alpha;

// Rule 12: IF distance is far AND delta is moving_away THEN output is fast_forward
alpha = fminf(mu_jauh(s), mu_menjauh(ds));
sum_alpha_output += alpha * 200;
sum_alpha += alpha;`}
                      </code>
                    </pre>
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="defuzzification" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                Defuzzification & Motor Control
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light">Defuzzification Method</h4>
                    <div className="bg-gray-800/30 p-4 rounded-md border border-gray-700">
                      <p className="text-sm text-gray-300 mb-3">
                        The system uses the <span className="text-yellow-300 font-medium">weighted average method</span> to convert 
                        the fuzzy output into a crisp PWM value.
                      </p>
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`// Defuzzification - weighted average
if (sum_alpha > 0) 
  return sum_alpha_output / sum_alpha; 
else 
  return 0;`}
                        </code>
                      </pre>
                      <div className="flex mt-3 items-start">
                        <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                        <p className="text-xs text-gray-300">
                          This calculation divides the sum of all weighted outputs by the sum of all rule activation levels (alphas).
                          It produces a continuous PWM value that smoothly transitions between different control actions.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light">PWM Processing</h4>
                    <div className="bg-gray-800/30 p-4 rounded-md border border-gray-700">
                      <p className="text-sm text-gray-300 mb-3">
                        After defuzzification, the PWM value is constrained and a dead zone is applied to prevent motor jitter.
                      </p>
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`// Get fuzzy logic output
float pwm = fuzzyLogic(jarak, delta_s);

// Constrain to valid range
pwm = constrain(pwm, -200, 200);

// Apply dead zone to prevent motor jitter
if (abs(pwm) < 20) pwm = 0;`}
                        </code>
                      </pre>
                      <div className="flex mt-3 items-start">
                        <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                        <p className="text-xs text-gray-300">
                          The dead zone (values between -20 and 20) helps prevent constant small adjustments that could cause 
                          motor jitter and unnecessary power consumption.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light">Motor Control Implementation</h4>
                  <div className="rounded-md border border-gray-700 overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                      <span className="font-medium text-sm">gerakMotor Function</span>
                      <Badge variant="outline" className="text-gray-400">PWM to H-Bridge Conversion</Badge>
                    </div>
                    <div className="p-4">
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`void gerakMotor(int pwm) { 
  // Convert PWM to motor speed (0-255)
  int kecepatan = constrain(abs(pwm), 0, 255); 

  // Set direction based on PWM sign
  if (pwm > 0) { 
    // Forward direction
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH); 
  } else if (pwm < 0) { 
    // Reverse direction
    digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH); 
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW); 
  } else { 
    // Stop motors
    digitalWrite(IN1, LOW);  digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, LOW); 
  } 

  // Apply speed to both motors
  analogWrite(ENA, kecepatan); 
  analogWrite(ENB, kecepatan); 
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-800/30 p-3 rounded-md border border-gray-700">
                      <h5 className="text-xs font-medium mb-2 text-green-400">Forward Motion (PWM {`>`} 0)</h5>
                      <div className="flex justify-center my-2">
                        <svg width="100" height="60" viewBox="0 0 100 60">
                          <rect x="10" y="20" width="80" height="20" fill="#333" />
                          <circle cx="25" cy="40" r="10" fill="#555" />
                          <circle cx="75" cy="40" r="10" fill="#555" />
                          <path d="M50 10 L60 20 L40 20 Z" fill="#50fa7b" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-300">
                        Both motors spin in the forward direction, propelling the robot toward the obstacle.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/30 p-3 rounded-md border border-gray-700">
                      <h5 className="text-xs font-medium mb-2 text-red-400">Reverse Motion (PWM {`<`} 0)</h5>
                      <div className="flex justify-center my-2">
                        <svg width="100" height="60" viewBox="0 0 100 60">
                          <rect x="10" y="20" width="80" height="20" fill="#333" />
                          <circle cx="25" cy="40" r="10" fill="#555" />
                          <circle cx="75" cy="40" r="10" fill="#555" />
                          <path d="M50 50 L60 40 L40 40 Z" fill="#ff5555" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-300">
                        Both motors spin in the reverse direction, moving the robot away from the obstacle.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/30 p-3 rounded-md border border-gray-700">
                      <h5 className="text-xs font-medium mb-2 text-gray-400">Stopped (PWM = 0)</h5>
                      <div className="flex justify-center my-2">
                        <svg width="100" height="60" viewBox="0 0 100 60">
                          <rect x="10" y="20" width="80" height="20" fill="#333" />
                          <circle cx="25" cy="40" r="10" fill="#555" />
                          <circle cx="75" cy="40" r="10" fill="#555" />
                          <rect x="40" y="30" width="20" height="2" fill="#888" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-300">
                        All motor inputs are set LOW, stopping the robot and maintaining its current position.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light">System Control Loop</h4>
                  <div className="bg-gray-800/30 p-4 rounded-md border border-gray-700">
                    <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                      <code>
{`void loop() {
  // Read current distance from sensor
  float jarak = bacaSensor();
  
  // Calculate delta (change in distance)
  float delta_s = jarak - jarakSebelumnya;

  // Get PWM value from fuzzy logic system
  float pwm = fuzzyLogic(jarak, delta_s);
  pwm = constrain(pwm, -200, 200);
  
  // Apply dead zone
  if (abs(pwm) < 20) pwm = 0;

  // Control motors based on PWM
  gerakMotor(pwm);

  // Debug output to serial monitor
  Serial.print(jarak); Serial.print("\\t");
  Serial.print(delta_s); Serial.print("\\t");
  Serial.println(pwm);

  // Store current distance for next iteration
  jarakSebelumnya = jarak;

  // Wait before next iteration
  delay(100);
}`}
                      </code>
                    </pre>
                    
                    <div className="flex mt-3 items-start">
                      <div className="mr-2 mt-1 text-yellow-400">ℹ️</div>
                      <p className="text-xs text-gray-300">
                        This main control loop runs continuously at 10Hz (every 100ms). It reads the distance sensor, 
                        calculates the change in distance, applies fuzzy logic to determine the control action, and 
                        updates the motor state accordingly.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Full Arduino Code</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] rounded-md border border-gray-700">
            <pre className={`p-4 text-xs font-mono leading-relaxed ${codeTheme === 'darker' ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-gray-200'}`}>
              <code>
{`#include <Arduino.h> 
#include <math.h> 

// Definisi pin 
#define IN1 6 
#define IN2 7 
#define IN3 5 
#define IN4 4 
#define ENA 9 
#define ENB 10 
#define TRIG 2 
#define ECHO 3 

float jarakSebelumnya = 0; 

// Fungsi Keanggotaan 
float mu_terlalu_dekat(float s) { 
  if (s <= 6) return 1.0; 
  else if (s < 8) return (8 - s) / 2.0; 
  else return 0.0; 
} 

float mu_target(float s) { 
  return exp(-pow(s - 10, 2) / 2.0); 
} 

float mu_dekat(float s) { 
  if (s < 10) return 0.0; 
  else if (s <= 15) return (s - 10) / 5.0; 
  else if (s <= 20) return (20 - s) / 5.0; 
  else return 0.0; 
} 

float mu_jauh(float s) { 
  if (s <= 14) return 0.0; 
  else if (s < 18) return (s - 14) / 4.0; 
  else return 1.0; 
} 

float mu_mendekat(float ds) { 
  if (ds >= -4 && ds < -1) return (-ds - 1) / 3.0; 
  else if (ds < -4) return 1.0; 
  else return 0.0; 
} 

float mu_stabil(float ds) { 
  return exp(-pow(ds, 2) / 2.0); 
} 

float mu_menjauh(float ds) { 
  if (ds > 1 && ds <= 4) return (ds - 1) / 3.0; 
  else if (ds > 4) return 1.0; 
  else return 0.0; 
} 

// Logika Fuzzy 
float fuzzyLogic(float s, float ds) { 
  float sum_alpha_output = 0.0; 
  float sum_alpha = 0.0; 
  float alpha; 

  // Aturan Fuzzy dengan nilai output yang disesuaikan 
  alpha = fminf(mu_terlalu_dekat(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-200); sum_alpha += alpha; 

  alpha = fminf(mu_terlalu_dekat(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  alpha = fminf(mu_terlalu_dekat(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  alpha = fminf(mu_target(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  alpha = fminf(mu_target(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  alpha = fminf(mu_target(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 100; sum_alpha += alpha; 

  alpha = fminf(mu_dekat(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  alpha = fminf(mu_dekat(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  alpha = fminf(mu_dekat(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 50; sum_alpha += alpha; 

  alpha = fminf(mu_jauh(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * 100; sum_alpha += alpha; 

  alpha = fminf(mu_jauh(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 200; sum_alpha += alpha; 

  alpha = fminf(mu_jauh(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 200; sum_alpha += alpha; 

  // Defuzzifikasi 
  if (sum_alpha > 0) return sum_alpha_output / sum_alpha; 
  else return 0; 
} 

// Kontrol Motor 
void gerakMotor(int pwm) { 
  int kecepatan = constrain(abs(pwm), 0, 255); 

  if (pwm > 0) { 
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH); 
  } else if (pwm < 0) { 
    digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH); 
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW); 
  } else { 
    digitalWrite(IN1, LOW);  digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, LOW); 
  } 

  analogWrite(ENA, kecepatan); 
  analogWrite(ENB, kecepatan); 
} 

// Baca Sensor 
float bacaSensor() { 
  digitalWrite(TRIG, LOW); 
  delayMicroseconds(2); 
  digitalWrite(TRIG, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(TRIG, LOW); 

  long duration = pulseIn(ECHO, HIGH); 
  return duration * 0.0343 / 2; 
} 

// Visualisasi PWM 
void tampilkanBarPWM(int pwm) { 
  int barLength = map(abs(pwm), 0, 255, 0, 20); 
  Serial.print("PWM: "); 

  if (pwm > 0) for (int i = 0; i < barLength; i++) Serial.print(">"); 
  else if (pwm < 0) for (int i = 0; i < barLength; i++) Serial.print("<"); 
  else Serial.print("0"); 

  Serial.println(); 
} 

// Setup 
void setup() { 
  Serial.begin(9600); 

  pinMode(TRIG, OUTPUT); 
  pinMode(ECHO, INPUT); 

  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT); 
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT); 
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT); 

  gerakMotor(0); 
} 

// Loop 
void loop() { 
  float jarak = bacaSensor(); 
  float delta_s = jarak - jarakSebelumnya; 

  float pwm = fuzzyLogic(jarak, delta_s); 
  pwm = constrain(pwm, -200, 200); 

  if (abs(pwm) < 20) pwm = 0; 

  gerakMotor(pwm); 

  Serial.print(jarak); Serial.print("\\t"); 
  Serial.print(delta_s); Serial.print("\\t"); 
  Serial.println(pwm); 

  jarakSebelumnya = jarak; 

  delay(100); 
}`}
              </code>
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeExplanationTab;
