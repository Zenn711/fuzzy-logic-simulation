
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const AboutTab = () => {
  const [codeTheme, setCodeTheme] = useState<'dark' | 'darker'>('darker');

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">About This Project</CardTitle>
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
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed">
            The Fuzzy Pulse Harmonizer is an interactive simulation of a fuzzy logic control system based on an Arduino implementation. This web application serves as both an educational tool and a validation platform for fuzzy logic algorithms before implementing them on physical hardware.
          </p>
          
          <h3 className="text-xl font-semibold text-fuzzy-purple-light mt-6 mb-3">Educational Purpose</h3>
          <p className="text-gray-300 leading-relaxed">
            This simulation was developed to help understand and demonstrate how fuzzy logic can be used in control systems. By providing a visual and interactive representation of fuzzy logic concepts, it makes complex control algorithms more accessible and easier to understand.
          </p>
          
          <h3 className="text-xl font-semibold text-fuzzy-purple-light mt-6 mb-3">Key Features</h3>
          <div className="rounded-md border border-fuzzy-purple/20 p-4 bg-black/20 mb-4">
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Interactive simulation of fuzzy logic control for distance regulation</li>
              <li>Real-time visualization of membership functions and their activation levels</li>
              <li>Step-by-step code explanation with detailed breakdowns of each component</li>
              <li>Historical data tracking for comparing different input configurations</li>
              <li>Responsive and modern user interface with dark theme</li>
            </ul>
          </div>
          
          <h3 className="text-xl font-semibold text-fuzzy-purple-light mt-6 mb-3">Technical Details</h3>
          <p className="text-gray-300 leading-relaxed">
            The simulation recreates a fuzzy logic control system that would typically run on an Arduino board. The system uses:
          </p>
          <div className="rounded-md border border-fuzzy-purple/20 p-4 bg-black/20 mb-4">
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li><strong className="text-fuzzy-purple-light">Linguistic Variables:</strong> Distance (s) and Delta Distance (ds)</li>
              <li><strong className="text-fuzzy-purple-light">Membership Functions:</strong> Categorizing inputs into fuzzy sets like "Too Close", "Target", "Approaching", etc.</li>
              <li><strong className="text-fuzzy-purple-light">Fuzzy Rules:</strong> 12 if-then rules that map input conditions to output actions</li>
              <li><strong className="text-fuzzy-purple-light">Defuzzification:</strong> Converting fuzzy outputs back to a crisp PWM value through weighted average method</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/40 rounded-md p-4 mb-6">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <h3 className="text-lg font-semibold text-white">Real-World Application</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              In a physical implementation, this fuzzy logic control would be used with:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-300 mt-2">
              <li>An ultrasonic distance sensor (HC-SR04) for measuring object distance</li>
              <li>A dual H-bridge motor driver (L298N) for controlling DC motors</li>
              <li>An Arduino microcontroller that runs the fuzzy logic algorithm</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-2">
              The system would maintain a target distance from an object by adjusting motor speed and direction based on the current distance and its rate of change.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-fuzzy-purple-light mt-6 mb-3">How to Use This Simulation</h3>
          <div className="rounded-md border border-fuzzy-purple/20 p-4 bg-black/20">
            <ol className="list-decimal pl-6 space-y-1 text-gray-300">
              <li className="relative pl-1">
                <span className="font-medium text-fuzzy-purple-light">Adjust the Distance (s) and Delta Distance (ds) sliders</span>
                <p className="text-sm mt-1">Simulate different scenarios to see how the system responds</p>
              </li>
              <li className="relative pl-1">
                <span className="font-medium text-fuzzy-purple-light">Observe PWM output changes</span>
                <p className="text-sm mt-1">See how different input combinations affect the control signal</p>
              </li>
              <li className="relative pl-1">
                <span className="font-medium text-fuzzy-purple-light">View membership function charts</span>
                <p className="text-sm mt-1">Understand how inputs are categorized into fuzzy sets</p>
              </li>
              <li className="relative pl-1">
                <span className="font-medium text-fuzzy-purple-light">Save configurations to history</span>
                <p className="text-sm mt-1">Compare different input combinations and their results</p>
              </li>
              <li className="relative pl-1">
                <span className="font-medium text-fuzzy-purple-light">Explore the code explanation</span>
                <p className="text-sm mt-1">Understand the underlying fuzzy logic implementation</p>
              </li>
            </ol>
          </div>
          
          <p className="mt-6 text-gray-300 leading-relaxed">
            This simulation was developed using React, Tailwind CSS, and Recharts for modern web technologies that provide an intuitive and responsive user experience.
          </p>
        </CardContent>
      </Card>
      
      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="fuzzy_logic_basics" className="border-fuzzy-purple/20">
          <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
            Fuzzy Logic Basics
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Fuzzy logic is a form of many-valued logic that deals with reasoning that is approximate rather than fixed and exact. Unlike classical logic, which requires a deep understanding of a system, precise inputs, and produces a definite output, fuzzy logic is capable of processing imprecise inputs to produce a definite output.
              </p>
              
              <div>
                <h4 className="font-medium text-sm text-fuzzy-purple-light mb-2">Key Concepts</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Fuzzy Sets:</strong> Unlike classical sets where an element either belongs to the set or not, fuzzy sets allow partial membership</li>
                  <li><strong>Membership Functions:</strong> Define the degree to which an element belongs to a fuzzy set (value between 0 and 1)</li>
                  <li><strong>Linguistic Variables:</strong> Variables whose values are words or sentences rather than numbers</li>
                  <li><strong>Fuzzy Rules:</strong> If-then statements that relate input fuzzy sets to output fuzzy sets</li>
                  <li><strong>Defuzzification:</strong> The process of converting fuzzy outputs back to crisp values</li>
                </ul>
              </div>
              
              <div className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md border border-gray-700 mt-4`}>
                <h4 className="font-medium text-sm text-fuzzy-purple-light mb-2">Applications</h4>
                <p>Fuzzy logic is widely used in:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Control systems (like this simulation)</li>
                  <li>Automotive systems (anti-lock braking, transmission control)</li>
                  <li>Home appliances (washing machines, air conditioners)</li>
                  <li>Medical diagnosis systems</li>
                  <li>Image processing and pattern recognition</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="resources" className="border-fuzzy-purple/20">
          <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
            Resources & References
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-sm text-fuzzy-purple-light mb-2">Learning Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.arduino.cc/reference/en/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Arduino Reference Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mathworks.com/help/fuzzy/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      MathWorks Fuzzy Logic Toolbox
                    </a>
                  </li>
                  <li>
                    <a href="https://en.wikipedia.org/wiki/Fuzzy_logic" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Wikipedia: Fuzzy Logic
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md border border-gray-700`}>
                  <h4 className="font-medium text-sm text-fuzzy-purple-light mb-2">Hardware Components</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="https://store.arduino.cc/products/arduino-uno-rev3" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Arduino Uno
                      </a>
                    </li>
                    <li>
                      <a href="https://components101.com/modules/ultrasonic-sensor-working-pinout-datasheet" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        HC-SR04 Ultrasonic Sensor
                      </a>
                    </li>
                    <li>
                      <a href="https://components101.com/modules/l293n-motor-driver-module" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        L298N Motor Driver
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md border border-gray-700`}>
                  <h4 className="font-medium text-sm text-fuzzy-purple-light mb-2">Technologies Used</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        React
                      </a>
                    </li>
                    <li>
                      <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Tailwind CSS
                      </a>
                    </li>
                    <li>
                      <a href="https://recharts.org/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Recharts
                      </a>
                    </li>
                    <li>
                      <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        shadcn/ui
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4 flex justify-center">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AboutTab;
