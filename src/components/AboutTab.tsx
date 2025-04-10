
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const AboutTab = () => {
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">About This Project</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p>
            The Fuzzy Pulse Harmonizer is an interactive simulation of a fuzzy logic control system based on an Arduino implementation. This web application serves as both an educational tool and a validation platform for fuzzy logic algorithms before implementing them on physical hardware.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Educational Purpose</h3>
          <p>
            This simulation was developed to help understand and demonstrate how fuzzy logic can be used in control systems. By providing a visual and interactive representation of fuzzy logic concepts, it makes complex control algorithms more accessible and easier to understand.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">Key Features</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Interactive simulation of fuzzy logic control for distance regulation</li>
            <li>Real-time visualization of membership functions and their activation levels</li>
            <li>Step-by-step code explanation with detailed breakdowns of each component</li>
            <li>Historical data tracking for comparing different input configurations</li>
            <li>Responsive and modern user interface with dark theme</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6">Technical Details</h3>
          <p>
            The simulation recreates a fuzzy logic control system that would typically run on an Arduino board. The system uses:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Linguistic Variables:</strong> Distance (s) and Delta Distance (ds)</li>
            <li><strong>Membership Functions:</strong> Categorizing inputs into fuzzy sets like "Too Close", "Target", "Approaching", etc.</li>
            <li><strong>Fuzzy Rules:</strong> 12 if-then rules that map input conditions to output actions</li>
            <li><strong>Defuzzification:</strong> Converting fuzzy outputs back to a crisp PWM value through weighted average method</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6">Real-World Application</h3>
          <p>
            In a physical implementation, this fuzzy logic control would be used with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>An ultrasonic distance sensor (HC-SR04) for measuring object distance</li>
            <li>A dual H-bridge motor driver (L298N) for controlling DC motors</li>
            <li>An Arduino microcontroller that runs the fuzzy logic algorithm</li>
          </ul>
          <p>
            The system would maintain a target distance from an object by adjusting motor speed and direction based on the current distance and its rate of change.
          </p>
          
          <h3 className="text-xl font-semibold mt-6">How to Use This Simulation</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Adjust the Distance (s) and Delta Distance (ds) sliders to simulate different scenarios</li>
            <li>Observe how the PWM output changes in response to different input combinations</li>
            <li>View the membership function charts to understand how inputs are categorized</li>
            <li>Save interesting configurations to the history for comparison</li>
            <li>Explore the Code Explanation tab to understand the underlying logic</li>
          </ol>
          
          <p className="mt-6">
            This simulation was developed using React, Tailwind CSS, and Recharts for modern web technologies that provide an intuitive and responsive user experience.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Fuzzy Logic Basics</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p>
              Fuzzy logic is a form of many-valued logic that deals with reasoning that is approximate rather than fixed and exact. Unlike classical logic, which requires a deep understanding of a system, precise inputs, and produces a definite output, fuzzy logic is capable of processing imprecise inputs to produce a definite output.
            </p>
            
            <h4 className="font-semibold mt-4">Key Concepts</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Fuzzy Sets:</strong> Unlike classical sets where an element either belongs to the set or not, fuzzy sets allow partial membership</li>
              <li><strong>Membership Functions:</strong> Define the degree to which an element belongs to a fuzzy set (value between 0 and 1)</li>
              <li><strong>Linguistic Variables:</strong> Variables whose values are words or sentences rather than numbers</li>
              <li><strong>Fuzzy Rules:</strong> If-then statements that relate input fuzzy sets to output fuzzy sets</li>
              <li><strong>Defuzzification:</strong> The process of converting fuzzy outputs back to crisp values</li>
            </ul>
            
            <h4 className="font-semibold mt-4">Applications</h4>
            <p>
              Fuzzy logic is widely used in:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Control systems (like this simulation)</li>
              <li>Automotive systems (anti-lock braking, transmission control)</li>
              <li>Home appliances (washing machines, air conditioners)</li>
              <li>Medical diagnosis systems</li>
              <li>Image processing and pattern recognition</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Resources & References</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Learning Resources</h4>
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
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Hardware Components</h4>
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
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Technologies Used</h4>
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
              
              <div className="pt-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutTab;
