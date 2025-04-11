
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const AboutTab = () => {
  const [theme, setTheme] = useState<'dark' | 'darker'>('darker');

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">About Fuzzy Pulse Harmonizer</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Theme:</span>
            <div className="flex border border-gray-700 rounded-md overflow-hidden">
              <button 
                className={`px-3 py-1 text-xs ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400'}`}
                onClick={() => setTheme('dark')}
              >
                Dark
              </button>
              <button 
                className={`px-3 py-1 text-xs ${theme === 'darker' ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400'}`}
                onClick={() => setTheme('darker')}
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
                <h3 className="text-xl font-semibold text-fuzzy-purple-light mb-3">Project Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  The Fuzzy Pulse Harmonizer is an interactive simulation tool designed to demonstrate 
                  how fuzzy logic can be applied to control systems. This project showcases the implementation 
                  of a distance-maintaining robot that uses fuzzy logic algorithms to make real-time decisions.
                </p>
                <div className="mt-4 rounded-md border border-fuzzy-purple/20 p-4 bg-black/20">
                  <h4 className="text-lg font-medium text-fuzzy-purple-light mb-2">Key Features</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li><strong>Interactive Simulation:</strong> Visualize robot behavior in real-time</li>
                    <li><strong>3D Visualization:</strong> Explore the system in a three-dimensional space</li>
                    <li><strong>Membership Function Graphs:</strong> See how fuzzy logic interprets input data</li>
                    <li><strong>Detailed Code Explanation:</strong> Learn the implementation details</li>
                    <li><strong>Multiple Simulation Modes:</strong> Test different scenarios and patterns</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-fuzzy-purple-light mb-3">Educational Value</h3>
                <div className="rounded-md border border-fuzzy-purple/20 p-4 bg-black/20">
                  <p className="text-gray-300 mb-3">
                    This application serves as an educational tool for understanding:
                  </p>
                  <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Fuzzy Logic Principles</span>
                      <p className="text-sm mt-1">Learn about membership functions, rules, and defuzzification</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Control Systems</span>
                      <p className="text-sm mt-1">See how feedback loops and sensors drive decision-making</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Arduino Implementation</span>
                      <p className="text-sm mt-1">Understand how theoretical concepts translate to embedded systems</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light">Real-time Visualization</span>
                      <p className="text-sm mt-1">Visualize abstract concepts through interactive simulations</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/40 rounded-md p-4 mb-6">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <h3 className="text-lg font-semibold">Why Fuzzy Logic?</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Fuzzy logic excels in systems where traditional binary logic falls short. By allowing degrees 
                of truth rather than simple true/false values, fuzzy systems can handle imprecision, uncertainty, 
                and partial truths that exist in real-world scenarios. This makes it ideal for control systems 
                that must operate in environments with noisy sensor data and changing conditions.
              </p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="technical_details" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                Technical Implementation
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-fuzzy-purple-light">Frontend Technologies</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-black/30">React</Badge>
                      <Badge variant="outline" className="bg-black/30">TypeScript</Badge>
                      <Badge variant="outline" className="bg-black/30">TailwindCSS</Badge>
                      <Badge variant="outline" className="bg-black/30">Three.js</Badge>
                      <Badge variant="outline" className="bg-black/30">React Three Fiber</Badge>
                      <Badge variant="outline" className="bg-black/30">Recharts</Badge>
                    </div>
                    <p className="text-sm text-gray-300">
                      The application is built using React and TypeScript, with TailwindCSS for styling.
                      Three.js and React Three Fiber power the 3D visualizations, while Recharts is used
                      for creating interactive graphs and charts.
                    </p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-fuzzy-purple-light">Simulation Architecture</h4>
                    <div className={`${theme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-3 rounded-md text-xs font-mono text-gray-300 my-2 border border-gray-700`}>
                      <pre>
{`┌─────────────────────────┐
│       User Interface     │
└───────────┬─────────────┘
            │
┌───────────▼─────────────┐      ┌─────────────────────────┐
│   Simulation Controller  │◄────►│    Fuzzy Logic Engine   │
└───────────┬─────────────┘      └─────────────────────────┘
            │
┌───────────▼─────────────┐
│   Visualization Engine  │
└─────────────────────────┘`}
                      </pre>
                    </div>
                    <p className="text-sm text-gray-300 mt-3">
                      The application follows a modular architecture with clear separation of concerns.
                      The user interface component handles interactions, the simulation controller manages
                      state and logic flow, the fuzzy logic engine processes the core algorithms, and the
                      visualization engine renders the output across multiple formats.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="practical_applications" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                Practical Applications
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-md border border-gray-700 overflow-hidden">
                    <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
                      <h4 className="font-medium text-sm">Robotics</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-300">
                        Similar fuzzy logic systems are used in obstacle avoidance, 
                        line following robots, automated guided vehicles, and robotic arms.
                        The ability to handle imprecise measurements makes fuzzy logic ideal for
                        robotics applications in dynamic environments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-gray-700 overflow-hidden">
                    <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
                      <h4 className="font-medium text-sm">Home Automation</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-300">
                        Smart thermostats, HVAC systems, and lighting control often 
                        use fuzzy logic to make gradual adjustments based on multiple inputs 
                        rather than abrupt changes. This results in more comfortable environments
                        and energy efficiency.
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-gray-700 overflow-hidden">
                    <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
                      <h4 className="font-medium text-sm">Automotive Systems</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-300">
                        From anti-lock braking systems to intelligent cruise control, 
                        fuzzy logic helps vehicles make split-second decisions based on multiple 
                        sensor inputs. These systems improve safety and efficiency in modern vehicles.
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-gray-700 overflow-hidden">
                    <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
                      <h4 className="font-medium text-sm">Industrial Control</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-300">
                        Process control in manufacturing, chemical plants, and other industrial 
                        settings often employs fuzzy logic to maintain optimal conditions.
                        These systems can handle the non-linearity and complexity of industrial processes.
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
          <CardTitle className="text-lg">Project References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border border-gray-700 p-4">
              <h3 className="font-medium text-sm mb-3 text-fuzzy-purple-light">Academic Resources</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>
                  <span className="font-medium">Zadeh, L.A. (1965).</span> "Fuzzy sets," 
                  <span className="italic"> Information and Control</span>, 8(3): 338-353.
                </li>
                <li>
                  <span className="font-medium">Mamdani, E.H. (1974).</span> "Application of fuzzy algorithms for control of simple dynamic plant," 
                  <span className="italic"> Proceedings of the Institution of Electrical Engineers</span>, 121(12): 1585-1588.
                </li>
                <li>
                  <span className="font-medium">Driankov, D., Hellendoorn, H., & Reinfrank, M. (1993).</span> 
                  <span className="italic"> An Introduction to Fuzzy Control</span>. Springer-Verlag.
                </li>
              </ul>
            </div>
            
            <div className="rounded-md border border-gray-700 p-4">
              <h3 className="font-medium text-sm mb-3 text-fuzzy-purple-light">Development Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors text-center">
                  <span className="block text-xs text-gray-400">React</span>
                </a>
                <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors text-center">
                  <span className="block text-xs text-gray-400">TypeScript</span>
                </a>
                <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors text-center">
                  <span className="block text-xs text-gray-400">Tailwind CSS</span>
                </a>
                <a href="https://threejs.org/" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors text-center">
                  <span className="block text-xs text-gray-400">Three.js</span>
                </a>
                <a href="https://docs.pmnd.rs/react-three-fiber" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors text-center">
                  <span className="block text-xs text-gray-400">React Three Fiber</span>
                </a>
                <a href="https://recharts.org/" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors text-center">
                  <span className="block text-xs text-gray-400">Recharts</span>
                </a>
                <a href="https://www.arduino.cc/" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors text-center">
                  <span className="block text-xs text-gray-400">Arduino</span>
                </a>
                <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-md bg-black/30 hover:bg-black/50 transition-colors text-center">
                  <span className="block text-xs text-gray-400">shadcn/ui</span>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutTab;
