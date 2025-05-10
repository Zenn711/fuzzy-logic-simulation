import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  LayoutGrid, 
  Sliders, 
  Code2, 
  PanelLeft, 
  ToggleLeft 
} from "lucide-react";

const UITab = () => {
  const [codeTheme, setCodeTheme] = useState<'dark' | 'darker'>('darker');

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <Card className="glass-card">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center">
            <LayoutGrid className="w-5 h-5 mr-2 text-fuzzy-purple" />
            <CardTitle className="text-lg text-gradient">User Interface Components</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Theme:</span>
            <div className="flex border border-gray-700 rounded-md overflow-hidden">
              <button 
                className={`px-2 sm:px-3 py-1 text-xs transition-colors duration-200 ${codeTheme === 'dark' ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400 hover:bg-gray-600/20'}`}
                onClick={() => setCodeTheme('dark')}
              >
                Dark
              </button>
              <button 
                className={`px-2 sm:px-3 py-1 text-xs transition-colors duration-200 ${codeTheme === 'darker' ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400 hover:bg-gray-600/20'}`}
                onClick={() => setCodeTheme('darker')}
              >
                Darker
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="components">
            <TabsList className="mb-4 bg-gray-800/50">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="styling">Styling</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            {/* Components Tab */}
            <TabsContent value="components">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Fields Section */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-3 text-fuzzy-purple-light flex items-center">
                      <Sliders className="w-4 h-4 mr-2" />
                      Input Controls
                    </h3>
                    <div className="space-y-4">
                      <div className="glass-card p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-fuzzy-purple-light">Distance Input</h4>
                          <Badge variant="outline" className="text-xs">Number Input</Badge>
                        </div>
                        <div className="rounded-md bg-black/20 p-3">
                          <input 
                            type="number" 
                            className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm"
                            placeholder="Enter distance..."
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Accepts numerical values (0-100) for distance measurement
                        </p>
                      </div>

                      <div className="glass-card p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-fuzzy-purple-light">Speed Control</h4>
                          <Badge variant="outline" className="text-xs">Slider</Badge>
                        </div>
                        <div className="rounded-md bg-black/20 p-3">
                          <input 
                            type="range" 
                            className="w-full accent-fuzzy-purple"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Slow</span>
                          <span>Fast</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Control Panel Section */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-3 text-fuzzy-purple-light flex items-center">
                      <PanelLeft className="w-4 h-4 mr-2" />
                      Control Panel
                    </h3>
                    <div className="space-y-4">
                      <div className="glass-card p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-fuzzy-purple-light">Operation Mode</h4>
                          <Badge variant="outline" className="text-xs">Toggle Group</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1.5 text-xs rounded-md bg-fuzzy-purple text-white">Auto</button>
                          <button className="px-3 py-1.5 text-xs rounded-md bg-gray-800 text-gray-400">Manual</button>
                        </div>
                      </div>

                      <div className="glass-card p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-fuzzy-purple-light">System Status</h4>
                          <Badge variant="outline" className="text-xs">Status Display</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-300">System Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Styling Tab */}
            <TabsContent value="styling">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Color Scheme Section */}
                  <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-3 text-fuzzy-purple-light">Color Scheme</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div className="h-12 rounded-md bg-fuzzy-purple"></div>
                        <p className="text-xs text-center text-gray-400">Primary</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 rounded-md bg-gray-800"></div>
                        <p className="text-xs text-center text-gray-400">Secondary</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 rounded-md bg-green-500"></div>
                        <p className="text-xs text-center text-gray-400">Success</p>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 rounded-md bg-red-500"></div>
                        <p className="text-xs text-center text-gray-400">Error</p>
                      </div>
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-3 text-fuzzy-purple-light">Typography</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Headings</h4>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-white">Heading 1</p>
                          <p className="text-xl font-semibold text-white">Heading 2</p>
                          <p className="text-lg font-medium text-white">Heading 3</p>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2">Body Text</h4>
                        <p className="text-sm text-gray-300">
                          Regular paragraph text with <span className="text-fuzzy-purple">highlighted</span> and 
                          <span className="font-medium"> bold </span> variations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animation Examples */}
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-3 text-fuzzy-purple-light">Animations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-3 rounded-md hover:scale-105 transition-transform">
                      <h4 className="text-sm font-medium mb-2">Hover Scale</h4>
                      <p className="text-xs text-gray-400">Elements scale up on hover</p>
                    </div>
                    <div className="glass-card p-3 rounded-md animate-pulse">
                      <h4 className="text-sm font-medium mb-2">Pulse</h4>
                      <p className="text-xs text-gray-400">Subtle pulsing animation</p>
                    </div>
                    <div className="glass-card p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Fade In</h4>
                      <p className="text-xs text-gray-400">Smooth fade in transition</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Grid System */}
                  <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-3 text-fuzzy-purple-light">Grid System</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-12 rounded-md bg-gray-800 flex items-center justify-center">
                          <span className="text-xs text-gray-400">{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spacing */}
                  <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-3 text-fuzzy-purple-light">Spacing</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-md bg-gray-800"></div>
                        <div className="w-8 h-8 rounded-md bg-gray-800"></div>
                        <div className="w-8 h-8 rounded-md bg-gray-800"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-md bg-gray-800"></div>
                        <div className="w-6 h-6 rounded-md bg-gray-800"></div>
                        <div className="w-6 h-6 rounded-md bg-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Responsive Design */}
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-3 text-fuzzy-purple-light">Responsive Design</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 rounded-md bg-gray-800 flex items-center justify-center">
                          <span className="text-xs text-gray-400">Responsive Block {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UITab;
