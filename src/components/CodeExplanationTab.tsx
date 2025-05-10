import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  ZapIcon, 
  InfoIcon, 
  FileCodeIcon, 
  EyeIcon, 
  XCircleIcon, 
  CheckCircleIcon, 
  BrainCircuitIcon,
  BarChart2Icon,
  GaugeIcon,
  CodeIcon,
  BookIcon,
  GithubIcon,
  BugIcon
} from "lucide-react";

const CodeExplanationTab = () => {
  const [codeTheme, setCodeTheme] = useState<'dark' | 'darker'>('darker');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [highlightSyntax, setHighlightSyntax] = useState(true);

  // Animation variants for code blocks
  const codeBlockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const renderCodeBlock = (code: string, language = "cpp", title?: string) => {
    const lines = code.split('\n');
    
    return (
      <motion.div
        variants={codeBlockVariants}
        initial="hidden"
        animate="visible"
        className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} relative rounded-md overflow-hidden border border-gray-700 my-2 group`}
      >
        {title && (
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800/70 border-b border-gray-700">
            <div className="flex items-center">
              <FileCodeIcon className="w-4 h-4 mr-2 text-fuzzy-purple-light" />
              <span className="text-xs font-medium text-gray-200">{title}</span>
            </div>
            <div className="flex space-x-1">
              <Badge variant="outline" className="text-xs bg-gray-800 border-fuzzy-purple/30">
                {language}
              </Badge>
            </div>
          </div>
        )}
        
        <div className="relative">
          <ScrollArea className={`${showLineNumbers ? 'pl-8' : 'pl-4'} pr-4 py-3 max-h-[400px] overflow-x-auto font-mono text-xs`}>
            {lines.map((line, i) => {
              // Very basic syntax highlighting - in a real app you'd use a proper syntax highlighter
              const highlightedLine = highlightSyntax ? 
                line
                  .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')
                  .replace(/(".*?")/g, '<span class="text-yellow-300">$1</span>')
                  .replace(/\b(if|else|return|void|float|int|for|while)\b/g, '<span class="text-purple-400">$1</span>')
                  .replace(/\b(HIGH|LOW|INPUT|OUTPUT|true|false|null|nullptr)\b/g, '<span class="text-blue-400">$1</span>')
                  .replace(/\b([0-9]+(\.[0-9]+)?)\b/g, '<span class="text-green-400">$1</span>') 
                : line;
              
              return (
                <div key={i} className="flex hover:bg-gray-800/30">
                  {showLineNumbers && (
                    <span className="absolute left-0 w-8 text-right pr-2 select-none text-gray-500 text-opacity-50">
                      {i + 1}
                    </span>
                  )}
                  <span 
                    className="text-gray-300"
                    dangerouslySetInnerHTML={{ __html: highlightedLine }}
                  />
                </div>
              );
            })}
          </ScrollArea>
          
          <div className="hidden group-hover:flex absolute top-2 right-2 space-x-1">
            <button 
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white"
              title={showLineNumbers ? "Hide line numbers" : "Show line numbers"}
            >
              <EyeIcon size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card overflow-hidden border-fuzzy-purple/20">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center">
            <ZapIcon className="w-5 h-5 mr-2 text-fuzzy-purple" />
            <CardTitle className="text-lg text-gradient">Fuzzy Logic Algorithm Explanation</CardTitle>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Highlight:</span>
              <button
                className={`p-1 rounded-md ${highlightSyntax ? 'bg-fuzzy-purple/20 text-fuzzy-purple' : 'bg-gray-800 text-gray-400'}`}
                onClick={() => setHighlightSyntax(!highlightSyntax)}
                title="Toggle syntax highlighting"
              >
                {highlightSyntax ? <CheckCircleIcon size={14} /> : <XCircleIcon size={14} />}
              </button>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            {/* Theoretical Background Section */}
            <motion.div 
              className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-4 mb-6 border-l-4 border-fuzzy-purple"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-3">
                <BrainCircuitIcon className="w-5 h-5 mr-2 text-fuzzy-purple animate-pulse" />
                <h3 className="text-lg font-semibold">Fuzzy Logic: Theoretical Background</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Fuzzy logic, introduced by Lotfi Zadeh in 1965, extends classical boolean logic to handle the concept of partial truth. 
                Unlike classical logic where variables are either 0 or 1, fuzzy logic allows variables to have a membership value 
                between 0 and 1, making it ideal for systems with imprecise inputs and outputs.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-3 rounded-md">
                  <h4 className="text-sm font-medium text-fuzzy-purple-light mb-2">Classical vs Fuzzy</h4>
                  <p className="text-xs text-gray-300">
                    Classical logic: A distance is either "far" or "near".<br/>
                    Fuzzy logic: A distance can be 70% "far" and 30% "near" simultaneously.
                  </p>
                </div>
                <div className="glass-card p-3 rounded-md">
                  <h4 className="text-sm font-medium text-fuzzy-purple-light mb-2">Human-Like Reasoning</h4>
                  <p className="text-xs text-gray-300">
                    Mimics human decision-making by allowing for degrees of truth rather than strict binary values, enabling more 
                    nuanced control strategies.
                  </p>
                </div>
                <div className="glass-card p-3 rounded-md">
                  <h4 className="text-sm font-medium text-fuzzy-purple-light mb-2">Applications</h4>
                  <p className="text-xs text-gray-300">
                    Used in control systems, AI, pattern recognition, and decision support systems where precise mathematical 
                    models are difficult to derive.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1">
                <motion.h3 
                  className="text-xl font-semibold text-fuzzy-purple-light mb-3 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <ZapIcon className="w-5 h-5 mr-2 text-fuzzy-purple animate-pulse" />
                  Overview
                </motion.h3>
                <p className="text-gray-300 leading-relaxed">
                  This fuzzy logic control system maintains a target distance from obstacles by dynamically 
                  adjusting motor speed and direction based on distance sensor readings.
                </p>
                <motion.div 
                  className="mt-4 rounded-md border border-fuzzy-purple/20 p-4 bg-black/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h4 className="text-lg font-medium text-fuzzy-purple-light mb-2 flex items-center">
                    <InfoIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                    Key Components
                  </h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li><strong className="text-white">Input Variables:</strong> Distance (s) and Delta Distance (ds)</li>
                    <li><strong className="text-white">Output:</strong> PWM control signal (-200 to +200)</li>
                    <li><strong className="text-white">Membership Functions:</strong> Linguistic variables defining fuzzy sets</li>
                    <li><strong className="text-white">Rule Base:</strong> 12 if-then rules mapping inputs to outputs</li>
                    <li><strong className="text-white">Defuzzification:</strong> Weighted average method</li>
                  </ul>
                </motion.div>
              </div>
              
              <div className="flex-1">
                <motion.h3 
                  className="text-xl font-semibold text-fuzzy-purple-light mb-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="flex items-center">
                    <ZapIcon className="w-5 h-5 mr-2 text-fuzzy-purple animate-pulse" />
                    Control Flow
                  </span>
                </motion.h3>
                <motion.div 
                  className="rounded-md border border-fuzzy-purple/20 p-4 bg-black/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <ol className="list-decimal pl-6 space-y-3 text-gray-300">
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light flex items-center">
                        <span className="inline-block w-5 h-5 rounded-full bg-fuzzy-purple/30 border border-fuzzy-purple/50 text-center text-xs mr-2">1</span>
                        Distance Sensing
                      </span>
                      <p className="text-sm mt-1">Read current distance from ultrasonic sensor</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light flex items-center">
                        <span className="inline-block w-5 h-5 rounded-full bg-fuzzy-purple/30 border border-fuzzy-purple/50 text-center text-xs mr-2">2</span>
                        Delta Calculation
                      </span>
                      <p className="text-sm mt-1">Compare with previous reading to determine rate of change</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light flex items-center">
                        <span className="inline-block w-5 h-5 rounded-full bg-fuzzy-purple/30 border border-fuzzy-purple/50 text-center text-xs mr-2">3</span>
                        Fuzzification
                      </span>
                      <p className="text-sm mt-1">Convert crisp inputs to fuzzy membership values</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light flex items-center">
                        <span className="inline-block w-5 h-5 rounded-full bg-fuzzy-purple/30 border border-fuzzy-purple/50 text-center text-xs mr-2">4</span>
                        Rule Evaluation
                      </span>
                      <p className="text-sm mt-1">Apply 12 fuzzy rules to determine control actions</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light flex items-center">
                        <span className="inline-block w-5 h-5 rounded-full bg-fuzzy-purple/30 border border-fuzzy-purple/50 text-center text-xs mr-2">5</span>
                        Defuzzification
                      </span>
                      <p className="text-sm mt-1">Convert fuzzy output to crisp PWM control signal</p>
                    </li>
                    <li className="relative pl-1">
                      <span className="font-medium text-fuzzy-purple-light flex items-center">
                        <span className="inline-block w-5 h-5 rounded-full bg-fuzzy-purple/30 border border-fuzzy-purple/50 text-center text-xs mr-2">6</span>
                        Motor Control
                      </span>
                      <p className="text-sm mt-1">Apply PWM to motors to adjust position</p>
                    </li>
                  </ol>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              className="bg-gradient-to-r from-gray-800/40 to-gray-800/60 rounded-md p-4 mb-6 border-l-4 border-fuzzy-purple"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <h3 className="text-lg font-semibold">How Fuzzy Logic Improves Control</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Unlike traditional control systems that use exact values and thresholds, fuzzy logic excels at handling the inherent 
                imprecision in real-world sensing. This approach allows for smooth transitions between different control actions,
                resulting in more stable and natural movement.
              </p>
            </motion.div>

            {/* New section: Fuzzy Logic Process Visualization */}
            <motion.div 
              className="mb-8 border border-fuzzy-purple/20 rounded-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="bg-gradient-to-r from-gray-800/70 to-gray-800/50 p-3 border-b border-fuzzy-purple/20">
                <h3 className="text-lg font-semibold flex items-center">
                  <BarChart2Icon className="w-5 h-5 mr-2 text-fuzzy-purple" />
                  Fuzzy Logic Process Visualization
                </h3>
              </div>
              <div className="p-4 bg-black/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Step 1: Fuzzification */}
                  <div className="glass-card p-3 rounded-md border border-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-fuzzy-purple/30 flex items-center justify-center text-xs font-bold mr-2">1</div>
                      <h4 className="text-sm font-medium text-fuzzy-purple-light">Fuzzification</h4>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">
                      Converts crisp input values into degrees of membership in fuzzy sets.
                    </p>
                    <div className="relative h-28 w-full bg-gray-900 rounded overflow-hidden p-2">
                      {/* Simple visualization of fuzzification */}
                      <div className="absolute bottom-0 w-full flex items-end h-full">
                        <div className="relative w-1/4 h-4/5 mx-auto bg-gradient-to-t from-red-500/50 to-transparent rounded-t">
                          <div className="absolute top-1 left-0 right-0 text-[8px] text-center text-white">Too Close</div>
                        </div>
                        <div className="relative w-1/4 h-3/5 mx-auto bg-gradient-to-t from-green-500/50 to-transparent rounded-t">
                          <div className="absolute top-1 left-0 right-0 text-[8px] text-center text-white">Target</div>
                        </div>
                        <div className="relative w-1/4 h-2/5 mx-auto bg-gradient-to-t from-blue-500/50 to-transparent rounded-t">
                          <div className="absolute top-1 left-0 right-0 text-[8px] text-center text-white">Far</div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30"></div>
                      <div className="absolute bottom-1 left-2/4 -translate-x-1/2 w-0.5 h-4 bg-yellow-400"></div>
                      <div className="absolute bottom-0 left-2/4 -translate-x-1/2 text-[8px] text-yellow-400">Input</div>
                    </div>
                  </div>
                  
                  {/* Step 2: Rule Evaluation */}
                  <div className="glass-card p-3 rounded-md border border-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-fuzzy-purple/30 flex items-center justify-center text-xs font-bold mr-2">2</div>
                      <h4 className="text-sm font-medium text-fuzzy-purple-light">Rule Evaluation</h4>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">
                      Applies fuzzy rules to determine control actions based on input conditions.
                    </p>
                    <div className="relative h-28 w-full bg-gray-900 rounded overflow-hidden p-2">
                      {/* Simple visualization of rule evaluation */}
                      <div className="absolute top-2 left-2 right-2 h-5 bg-gray-800 rounded px-1 flex items-center">
                        <span className="text-[8px] text-gray-400">IF distance is </span>
                        <span className="text-[8px] mx-1 text-green-400">Target</span>
                        <span className="text-[8px] text-gray-400">AND delta is </span>
                        <span className="text-[8px] mx-1 text-blue-400">Stable</span>
                      </div>
                      <div className="absolute top-9 left-2 right-2 h-5 bg-gray-800 rounded px-1 flex items-center">
                        <span className="text-[8px] text-gray-400">THEN output is </span>
                        <span className="text-[8px] mx-1 text-yellow-400">Stop</span>
                        <span className="text-[8px] text-gray-400 ml-1">(α = 0.8)</span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 h-5 bg-gray-800/50 rounded px-1 flex items-center">
                        <span className="text-[8px] text-gray-400">Evaluating 12 rules...</span>
                      </div>
                      <div className="absolute bottom-9 right-2 w-3 h-3">
                        <div className="w-full h-full border-t-2 border-r-2 border-fuzzy-purple/50 rounded-tr"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3: Defuzzification */}
                  <div className="glass-card p-3 rounded-md border border-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-fuzzy-purple/30 flex items-center justify-center text-xs font-bold mr-2">3</div>
                      <h4 className="text-sm font-medium text-fuzzy-purple-light">Defuzzification</h4>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">
                      Converts the fuzzy output into a crisp control value.
                    </p>
                    <div className="relative h-28 w-full bg-gray-900 rounded overflow-hidden p-2">
                      {/* Simple visualization of defuzzification */}
                      <div className="absolute top-3 left-2 right-2 h-10">
                        <div className="flex w-full justify-between items-center h-full">
                          <div className="h-full w-1/4 bg-gradient-to-r from-red-500/50 to-transparent rounded-l"></div>
                          <div className="h-full w-1/4 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                          <div className="h-full w-1/4 bg-gradient-to-l from-green-500/50 to-transparent rounded-r"></div>
                        </div>
                      </div>
                      <div className="absolute top-15 left-0 right-0 text-[8px] text-center text-gray-400">Aggregated Output</div>
                      
                      <div className="absolute bottom-6 left-2/4 -translate-x-1/2 h-6 w-0.5 bg-fuzzy-purple"></div>
                      <div className="absolute bottom-2 left-2/4 -translate-x-1/2 text-[8px] text-fuzzy-purple-light text-center">PWM = 50</div>
                      
                      <div className="absolute bottom-1 left-0 right-0 flex justify-between px-4">
                        <span className="text-[8px] text-gray-500">-200</span>
                        <span className="text-[8px] text-gray-500">0</span>
                        <span className="text-[8px] text-gray-500">+200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="membership_functions" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                <div className="flex items-center">
                  <ZapIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                  Membership Functions
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Tabs defaultValue="distance">
                  <TabsList className="mb-4 bg-gray-800/50">
                    <TabsTrigger value="distance">Distance</TabsTrigger>
                    <TabsTrigger value="delta">Delta Distance</TabsTrigger>
                    <TabsTrigger value="theory">Theory</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="distance">
                    <div className="space-y-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-fuzzy-purple-light">mu_terlalu_dekat (Too Close)</h4>
                          <Badge variant="outline" className="text-red-400 border-red-400/30">Trapezoid</Badge>
                        </div>
                        {renderCodeBlock(`// Returns 1.0 when distance ≤ 6cm, decreases linearly to 0 between 6-8cm
float mu_terlalu_dekat(float s) { 
  if (s <= 6) return 1.0; 
  else if (s < 8) return (8 - s) / 2.0; 
  else return 0.0; 
}`, "cpp", "Trapezoid Membership Function")}
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

                  <TabsContent value="theory">
                    <div className="space-y-4">
                      <div className="glass-card p-4 rounded-md">
                        <h4 className="font-medium text-sm text-fuzzy-purple-light mb-2 flex items-center">
                          <GaugeIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                          Types of Membership Functions
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div className="bg-black/20 rounded-md p-3 border border-gray-700">
                            <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Triangular</h5>
                            <p className="text-xs text-gray-300">
                              A simple linear function defined by three points: rising from 0 to 1, then falling back to 0.
                              Computationally efficient and easily understood.
                            </p>
                            <div className="h-16 mt-2 relative">
                              <svg width="100%" height="100%" viewBox="0 0 100 40" className="overflow-visible">
                                <polyline 
                                  points="10,35 50,5 90,35" 
                                  fill="none" 
                                  stroke="#9b87f5" 
                                  strokeWidth="1.5"
                                />
                                <line x1="0" y1="35" x2="100" y2="35" stroke="#666" strokeWidth="0.5" />
                                <text x="50" y="39" fontSize="6" fill="#9b87f5" textAnchor="middle">Triangle</text>
                              </svg>
                            </div>
                          </div>
                          
                          <div className="bg-black/20 rounded-md p-3 border border-gray-700">
                            <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Trapezoidal</h5>
                            <p className="text-xs text-gray-300">
                              Extends the triangular function by having a flat top where membership is 1.0.
                              Good for representing ranges with a plateau of certainty.
                            </p>
                            <div className="h-16 mt-2 relative">
                              <svg width="100%" height="100%" viewBox="0 0 100 40" className="overflow-visible">
                                <polyline 
                                  points="10,35 30,5 70,5 90,35" 
                                  fill="none" 
                                  stroke="#9b87f5" 
                                  strokeWidth="1.5"
                                />
                                <line x1="0" y1="35" x2="100" y2="35" stroke="#666" strokeWidth="0.5" />
                                <text x="50" y="39" fontSize="6" fill="#9b87f5" textAnchor="middle">Trapezoid</text>
                              </svg>
                            </div>
                          </div>
                          
                          <div className="bg-black/20 rounded-md p-3 border border-gray-700">
                            <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Gaussian</h5>
                            <p className="text-xs text-gray-300">
                              A bell-shaped curve based on the Gaussian distribution. Provides smooth transitions 
                              and is often used for continuous variables.
                            </p>
                            <div className="h-16 mt-2 relative">
                              <svg width="100%" height="100%" viewBox="0 0 100 40" className="overflow-visible">
                                <path 
                                  d="M10,35 C10,35 30,35 50,5 C70,-25 90,35 90,35" 
                                  fill="none" 
                                  stroke="#9b87f5" 
                                  strokeWidth="1.5"
                                />
                                <line x1="0" y1="35" x2="100" y2="35" stroke="#666" strokeWidth="0.5" />
                                <text x="50" y="39" fontSize="6" fill="#9b87f5" textAnchor="middle">Gaussian</text>
                              </svg>
                            </div>
                          </div>
                          
                          <div className="bg-black/20 rounded-md p-3 border border-gray-700">
                            <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Singleton</h5>
                            <p className="text-xs text-gray-300">
                              A special case where membership is 1.0 at exactly one point and 0 everywhere else.
                              Often used in Sugeno-type fuzzy systems.
                            </p>
                            <div className="h-16 mt-2 relative">
                              <svg width="100%" height="100%" viewBox="0 0 100 40" className="overflow-visible">
                                <line x1="50" y1="35" x2="50" y2="5" stroke="#9b87f5" strokeWidth="1.5" />
                                <circle cx="50" cy="5" r="2" fill="#9b87f5" />
                                <line x1="0" y1="35" x2="100" y2="35" stroke="#666" strokeWidth="0.5" />
                                <text x="50" y="39" fontSize="6" fill="#9b87f5" textAnchor="middle">Singleton</text>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="glass-card p-4 rounded-md">
                        <h4 className="font-medium text-sm text-fuzzy-purple-light mb-2">Mathematical Representation</h4>
                        <p className="text-xs text-gray-300 mb-3">
                          Membership functions map an input value to a membership degree between 0 and 1. 
                          They are represented mathematically as μA(x), where A is the fuzzy set and x is the input value.
                        </p>
                        <div className="bg-black/30 p-3 rounded-md border border-gray-700">
                          <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Key Properties</h5>
                          <ul className="list-disc pl-4 text-xs text-gray-300 space-y-1">
                            <li><span className="text-white">Domain:</span> The range of possible input values</li>
                            <li><span className="text-white">Support:</span> Input values with non-zero membership</li>
                            <li><span className="text-white">Core:</span> Input values with full membership (1.0)</li>
                            <li><span className="text-white">Boundary:</span> Input values with partial membership (between 0 and 1)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md p-3 border-l-4 border-fuzzy-purple">
                        <h4 className="font-medium text-sm text-fuzzy-purple-light mb-2">Design Considerations</h4>
                        <p className="text-xs text-gray-300">
                          When designing membership functions, consider:
                        </p>
                        <ul className="list-disc pl-4 text-xs text-gray-300 mt-2 space-y-1">
                          <li>Sufficient overlap between adjacent functions to ensure smooth transitions</li>
                          <li>Appropriate width to balance precision and generalization</li>
                          <li>Coverage of the entire input domain to handle all possible input values</li>
                          <li>Symmetry and consistency across the input range</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="fuzzy_rules" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                <div className="flex items-center">
                  <ZapIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                  Fuzzy Rules & Logic
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-4 p-3 bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-md border-l-4 border-fuzzy-purple">
                  <p className="text-sm text-gray-300">
                    The system employs 12 IF-THEN rules that define how the robot should respond to different combinations of 
                    distance and delta values. Each rule takes the form:
                  </p>
                  <p className="text-sm text-fuzzy-purple-light italic mt-2 font-mono bg-black/30 p-2 rounded">
                    IF (distance is X) AND (delta is Y) THEN (output is Z)
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <motion.div 
                    className="bg-gradient-to-br from-gray-800/30 to-black/40 p-3 rounded-md border border-gray-700 hover:border-fuzzy-purple/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <h4 className="text-sm font-medium mb-2 text-fuzzy-purple-light">Rule Combination Method</h4>
                    <p className="text-xs text-gray-300">
                      The system uses the <span className="text-yellow-300 font-mono px-1 bg-black/30 rounded">MIN operator</span> to combine antecedents, 
                      meaning the rule's activation level (alpha) is determined by the minimum membership value between 
                      the distance and delta inputs.
                    </p>
                    {renderCodeBlock(`alpha = fminf(mu_terlalu_dekat(s), mu_mendekat(ds));`, "cpp")}
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-br from-gray-800/30 to-black/40 p-3 rounded-md border border-gray-700 hover:border-fuzzy-purple/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <h4 className="text-sm font-medium mb-2 text-fuzzy-purple-light">Output Aggregation</h4>
                    <p className="text-xs text-gray-300">
                      The system accumulates weighted outputs using the <span className="text-yellow-300 font-mono px-1 bg-black/30 rounded">weighted sum method</span>, 
                      where each rule's output is weighted by its alpha value.
                    </p>
                    {renderCodeBlock(`sum_alpha_output += alpha * (-200); 
sum_alpha += alpha;`, "cpp")}
                  </motion.div>
                </div>

                {/* New section: Fuzzy Inference Methods */}
                <div className="mb-6 bg-gray-800/20 p-4 rounded-md border border-gray-700">
                  <h4 className="text-sm font-medium mb-3 text-fuzzy-purple-light flex items-center">
                    <BrainCircuitIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                    Fuzzy Inference Methods
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-card p-3 rounded-md">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-2">Mamdani Method</h5>
                      <p className="text-xs text-gray-300 mb-2">
                        The most common fuzzy inference method, but <strong>not used in this implementation</strong>. It uses fuzzy sets for both 
                        inputs and outputs, making it intuitive but more computationally intensive.
                      </p>
                      <div className="bg-black/30 p-2 rounded-md">
                        <span className="text-xs text-gray-400">Characteristics:</span>
                        <ul className="list-disc pl-4 text-xs text-gray-300 mt-1">
                          <li>Uses MIN for AND operations</li>
                          <li>MAX for rule aggregation</li>
                          <li>Requires defuzzification</li>
                          <li>Computationally intensive but intuitive</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="glass-card p-3 rounded-md">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        Takagi-Sugeno Method
                        <span className="ml-2 bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full">USED IN THIS PROJECT</span>
                      </h5>
                      <p className="text-xs text-gray-300 mb-2">
                        <strong>Our implementation exclusively uses this method</strong>, which employs crisp output values rather than fuzzy sets, making it computationally efficient 
                        and well-suited for real-time control systems on hardware with limited resources.
                      </p>
                      <div className="bg-black/30 p-2 rounded-md">
                        <span className="text-xs text-gray-400">Characteristics:</span>
                        <ul className="list-disc pl-4 text-xs text-gray-300 mt-1">
                          <li>Output is a fixed value (zero-order) or function of inputs</li>
                          <li>Simplified defuzzification process</li>
                          <li>Computationally efficient</li>
                          <li>Ideal for embedded systems with limited resources</li>
                        </ul>
                      </div>
                      <div className="mt-2 bg-black/40 p-2 rounded-md border-2 border-fuzzy-purple/50">
                        <h6 className="text-xs font-medium text-fuzzy-purple-light mb-1 flex items-center">
                          <span className="inline-block w-4 h-4 rounded-full bg-green-500/60 mr-2"></span>
                          <span>How it works in our implementation:</span>
                        </h6>
                        <ul className="list-disc pl-4 text-xs text-gray-300">
                          <li>Each rule outputs a <span className="text-yellow-300 font-medium">constant value</span> (zero-order Sugeno)</li>
                          <li>Rule: IF distance is X AND delta is Y THEN <span className="text-yellow-300 font-medium">output = crisp_value</span></li>
                          <li>Example: IF distance is too_close AND delta is approaching THEN <span className="text-yellow-300 font-medium">output = -200</span></li>
                          <li>Final output is weighted average of all rule outputs: <span className="text-yellow-300 font-mono font-medium">sum(α_i × output_i) / sum(α_i)</span></li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="glass-card p-3 rounded-md mt-3">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-2">Mamdani vs. Takagi-Sugeno</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-black/20 p-2 rounded-md border border-gray-700">
                          <h6 className="text-[10px] font-medium text-fuzzy-purple-light mb-1">Mamdani Method</h6>
                          <ul className="list-disc pl-3 text-[10px] text-gray-300">
                            <li>Uses fuzzy sets for both inputs and outputs</li>
                            <li>Rule: IF x is A AND y is B THEN z is C</li>
                            <li>Output is a fuzzy set requiring defuzzification</li>
                            <li>More intuitive but computationally intensive</li>
                          </ul>
                        </div>
                        <div className="bg-black/20 p-2 rounded-md border border-fuzzy-purple/30">
                          <h6 className="text-[10px] font-medium text-fuzzy-purple-light mb-1">Takagi-Sugeno Method</h6>
                          <ul className="list-disc pl-3 text-[10px] text-gray-300">
                            <li>Uses fuzzy sets for inputs but crisp outputs</li>
                            <li>Rule: IF x is A AND y is B THEN z = f(x,y)</li>
                            <li>Zero-order: z = constant value</li>
                            <li>More efficient for embedded systems</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-2 p-1 border-t border-gray-700">
                        <p className="text-[10px] text-gray-300">
                          Our robot control system uses zero-order Takagi-Sugeno because constant output values like -200, -100, 0, etc. 
                          simplify computation while providing effective control on Arduino's limited hardware.
                        </p>
                        <pre className="mt-2 p-1 bg-gray-900 rounded text-[9px] font-mono text-gray-300 border border-gray-700">
{`// Takagi-Sugeno zero-order implementation example
alpha = fminf(mu_terlalu_dekat(s), mu_mendekat(ds));  // Rule strength
sum_alpha_output += alpha * (-200);                   // Constant output value
sum_alpha += alpha;                                   // Accumulate for weighted average`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-gray-900/50 rounded-md border-l-3 border-fuzzy-purple">
                    <p className="text-xs text-gray-300">
                      <span className="text-fuzzy-purple-light">Note:</span> Our implementation uses <strong>only</strong> the zero-order Takagi-Sugeno method 
                      with weighted average aggregation. We do <strong>not</strong> use Mamdani method at all. The Takagi-Sugeno approach was chosen because it's 
                      more computationally efficient for real-time control applications on resource-constrained hardware like Arduino.
                    </p>
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
                    <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light flex items-center">
                      <ZapIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                      Complete Rule Evaluation Code
                    </h4>
                    {renderCodeBlock(`// Initialize output accumulators
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
sum_alpha += alpha;`, "cpp", "Fuzzy Rule Evaluation")}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="defuzzification" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                <div className="flex items-center">
                  <ZapIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                  Defuzzification & Motor Control
                </div>
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
                
                {/* New section: Alternative Defuzzification Methods */}
                <div className="mb-6 glass-card p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light flex items-center">
                    <CodeIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                    Alternative Defuzzification Methods
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-black/20 p-3 rounded-md border border-gray-700">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Centroid Method</h5>
                      <p className="text-xs text-gray-300">
                        Calculates the center of gravity of the aggregated fuzzy set. Most common method, but computationally intensive.
                      </p>
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} mt-2 p-2 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`// Pseudo-code
sum_μ_x = 0; sum_μ = 0;
for each x in domain:
  sum_μ_x += x * μ(x)
  sum_μ += μ(x)
return sum_μ_x / sum_μ`}
                        </code>
                      </pre>
                    </div>
                    <div className="bg-black/20 p-3 rounded-md border border-gray-700">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Mean of Maximum</h5>
                      <p className="text-xs text-gray-300">
                        Takes the average of all values with maximum membership. Useful when precise control at peak values is desired.
                      </p>
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} mt-2 p-2 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`// Pseudo-code
max_μ = find_max_membership()
x_values = []
for each x with μ(x) == max_μ:
  x_values.append(x)
return average(x_values)`}
                        </code>
                      </pre>
                    </div>
                    <div className="bg-black/20 p-3 rounded-md border border-gray-700">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">First of Maximum</h5>
                      <p className="text-xs text-gray-300">
                        Takes the first value with maximum membership. Computationally simple but can lead to abrupt changes.
                      </p>
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} mt-2 p-2 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`// Pseudo-code
max_μ = find_max_membership()
for each x in domain:
  if μ(x) == max_μ:
    return x`}
                        </code>
                      </pre>
                    </div>
                  </div>
                  <div className="mt-3 p-2 border-t border-gray-700">
                    <p className="text-xs text-gray-300 flex items-start">
                      <BookIcon className="w-3 h-3 mr-1 mt-0.5 text-fuzzy-purple" />
                      <span>
                        <span className="text-fuzzy-purple-light">Why weighted average in our project?</span> It balances computational efficiency 
                        with control smoothness. While less precise than centroid method, it's faster and provides adequate performance 
                        for real-time robotics applications.
                      </span>
                    </p>
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

            {/* New Accordion Item: Practical Applications */}
            <AccordionItem value="practical_applications" className="border-fuzzy-purple/20">
              <AccordionTrigger className="text-fuzzy-purple-light hover:text-fuzzy-purple font-medium">
                <div className="flex items-center">
                  <GithubIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                  Practical Applications & Extensions
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light flex items-center">
                      <ZapIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                      Real-World Applications
                    </h4>
                    <div className="space-y-3">
                      <div className="glass-card p-3 rounded-md">
                        <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Autonomous Vehicles</h5>
                        <p className="text-xs text-gray-300">
                          Fuzzy logic helps self-driving cars make smooth decisions for acceleration, braking, and steering
                          based on multiple sensor inputs in uncertain environments.
                        </p>
                      </div>
                      <div className="glass-card p-3 rounded-md">
                        <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Industrial Control</h5>
                        <p className="text-xs text-gray-300">
                          Used in process control systems for temperature regulation, pressure control, and flow rate management
                          where precise mathematical models are difficult to derive.
                        </p>
                      </div>
                      <div className="glass-card p-3 rounded-md">
                        <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Consumer Electronics</h5>
                        <p className="text-xs text-gray-300">
                          Found in washing machines, air conditioners, and cameras to adapt to varying conditions
                          and user preferences automatically.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light flex items-center">
                      <BugIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                      Common Challenges & Solutions
                    </h4>
                    <div className="bg-black/20 p-4 rounded-md border border-gray-700">
                      <div className="space-y-3">
                        <div className="flex">
                          <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs mr-2 mt-0.5">!</div>
                          <div>
                            <h5 className="text-xs font-medium text-fuzzy-purple-light">Membership Function Design</h5>
                            <p className="text-xs text-gray-300">
                              Poorly designed membership functions can lead to unstable behavior or poor performance.
                              <span className="block mt-1 text-fuzzy-purple-light">Solution: Validate with simulation and tune iteratively.</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs mr-2 mt-0.5">!</div>
                          <div>
                            <h5 className="text-xs font-medium text-fuzzy-purple-light">Processing Overhead</h5>
                            <p className="text-xs text-gray-300">
                              Complex fuzzy systems can be computationally intensive for embedded systems.
                              <span className="block mt-1 text-fuzzy-purple-light">Solution: Use simplified membership functions and optimized defuzzification.</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs mr-2 mt-0.5">!</div>
                          <div>
                            <h5 className="text-xs font-medium text-fuzzy-purple-light">Sensor Noise</h5>
                            <p className="text-xs text-gray-300">
                              Noisy sensors can cause erratic behavior in fuzzy control systems.
                              <span className="block mt-1 text-fuzzy-purple-light">Solution: Add filtering and implement dead zones as in our code.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light flex items-center">
                    <CodeIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                    Possible Extensions & Improvements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-3 rounded-md">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Additional Sensors</h5>
                      <p className="text-xs text-gray-300 mb-2">
                        Incorporate multiple distance sensors to create a more comprehensive awareness of surroundings.
                      </p>
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-2 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`// Add left and right sensors
float jarak_left = readLeftSensor();
float jarak_right = readRightSensor();

// Consider obstacle direction
if (jarak_left < jarak_right) {
  // Turn right
} else {
  // Turn left
}`}
                        </code>
                      </pre>
                    </div>
                    
                    <div className="glass-card p-3 rounded-md">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Adaptive Fuzzy System</h5>
                      <p className="text-xs text-gray-300 mb-2">
                        Implement adaptive fuzzy logic that learns from experience and adjusts membership functions over time.
                      </p>
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-2 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`// Track control performance
float error = target_dist - actual_dist;
error_sum += error * error;

// Adjust membership parameters
if (error_sum > threshold) {
  adjustMembershipFunctions();
  error_sum = 0;
}`}
                        </code>
                      </pre>
                    </div>
                    
                    <div className="glass-card p-3 rounded-md">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Advanced Motion Control</h5>
                      <p className="text-xs text-gray-300 mb-2">
                        Implement differential steering to allow the robot to turn gracefully rather than just moving forward and backward.
                      </p>
                      <pre className={`${codeTheme === 'darker' ? 'bg-gray-900' : 'bg-gray-800'} p-2 rounded-md text-xs overflow-x-auto font-mono text-gray-300 border border-gray-700`}>
                        <code>
{`// Differential steering
void steer(int pwm, float turn_ratio) {
  int left_speed = pwm * (1 - turn_ratio);
  int right_speed = pwm * (1 + turn_ratio);
  
  // Apply to motors separately
  setLeftMotor(left_speed);
  setRightMotor(right_speed);
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-3 text-fuzzy-purple-light flex items-center">
                    <BookIcon className="w-4 h-4 mr-2 text-fuzzy-purple" />
                    Further Learning Resources
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-md border border-gray-700">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Academic Resources</h5>
                      <ul className="list-disc pl-4 text-xs text-gray-300 space-y-1">
                        <li><span className="text-fuzzy-purple-light">"Fuzzy Sets and Fuzzy Logic: Theory and Applications"</span> by George J. Klir and Bo Yuan</li>
                        <li><span className="text-fuzzy-purple-light">"Fuzzy Logic with Engineering Applications"</span> by Timothy J. Ross</li>
                        <li><span className="text-fuzzy-purple-light">"Fuzzy Control Systems Design and Analysis"</span> by Kazuo Tanaka and Hua O. Wang</li>
                      </ul>
                    </div>
                    
                    <div className="bg-black/20 p-3 rounded-md border border-gray-700">
                      <h5 className="text-xs font-medium text-fuzzy-purple-light mb-1">Online Resources & Libraries</h5>
                      <ul className="list-disc pl-4 text-xs text-gray-300 space-y-1">
                        <li><span className="text-fuzzy-purple-light">eFLL (Embedded Fuzzy Logic Library)</span> - Arduino library for fuzzy logic implementation</li>
                        <li><span className="text-fuzzy-purple-light">scikit-fuzzy</span> - Python fuzzy logic toolkit for scientific computing</li>
                        <li><span className="text-fuzzy-purple-light">MATLAB Fuzzy Logic Toolbox</span> - Comprehensive tools for fuzzy system design</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-gray-900/50 rounded-md">
                    <p className="text-xs text-gray-300 flex items-start">
                      <InfoIcon className="w-3 h-3 mr-1 mt-0.5 text-fuzzy-purple" />
                      <span>
                        The field of fuzzy logic continues to evolve with integrations into machine learning and AI. 
                        Combining fuzzy logic with neural networks (neuro-fuzzy systems) is a promising area for 
                        developing more adaptive and intelligent control systems.
                      </span>
                    </p>
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
#define IN1 6        // Pin kontrol arah motor kanan 1
#define IN2 7        // Pin kontrol arah motor kanan 2
#define IN3 5        // Pin kontrol arah motor kiri 1
#define IN4 4        // Pin kontrol arah motor kiri 2
#define ENA 9        // Pin PWM untuk mengatur kecepatan motor kanan
#define ENB 10       // Pin PWM untuk mengatur kecepatan motor kiri
#define TRIG 2       // Pin trigger sensor ultrasonik
#define ECHO 3       // Pin echo sensor ultrasonik

float jarakSebelumnya = 0;   // Menyimpan jarak sebelumnya untuk menghitung perubahan jarak

// Fungsi Keanggotaan untuk variabel jarak (s)
// Menentukan derajat keanggotaan jarak dalam kategori "terlalu dekat" menggunakan fungsi trapezoid
float mu_terlalu_dekat(float s) { 
  if (s <= 6) return 1.0;                // Jika ≤ 6cm, maka 100% terlalu dekat
  else if (s < 8) return (8 - s) / 2.0;  // Derajat keanggotaan menurun linear dari 6-8cm
  else return 0.0;                        // Jika ≥ 8cm, maka 0% terlalu dekat
} 

// Menentukan derajat keanggotaan jarak dalam kategori "target"
// Menggunakan fungsi Gaussian dengan pusat di 10cm
float mu_target(float s) { 
  return exp(-pow(s - 10, 2) / 2.0);     // Nilai tertinggi saat jarak = 10cm

// Menentukan derajat keanggotaan jarak dalam kategori "dekat" menggunakan fungsi segitiga
float mu_dekat(float s) { 
  if (s < 10) return 0.0;                    // Jika < 10cm, maka 0% dekat
  else if (s <= 15) return (s - 10) / 5.0;   // Derajat keanggotaan naik linear dari 10-15cm
  else if (s <= 20) return (20 - s) / 5.0;   // Derajat keanggotaan turun linear dari 15-20cm
  else return 0.0;                            // Jika > 20cm, maka 0% dekat
} 

// Menentukan derajat keanggotaan jarak dalam kategori "jauh" menggunakan fungsi trapezoid
float mu_jauh(float s) { 
  if (s <= 14) return 0.0;                // Jika ≤ 14cm, maka 0% jauh
  else if (s < 18) return (s - 14) / 4.0; // Derajat keanggotaan naik linear dari 14-18cm
  else return 1.0;                         // Jika ≥ 18cm, maka 100% jauh
} 

// Fungsi Keanggotaan untuk variabel perubahan jarak (ds)
// Menentukan derajat keanggotaan perubahan jarak dalam kategori "mendekat"
float mu_mendekat(float ds) { 
  if (ds >= -4 && ds < -1) return (-ds - 1) / 3.0;  // Derajat keanggotaan naik untuk -4 < ds < -1
  else if (ds < -4) return 1.0;                      // Jika ds < -4, maka 100% mendekat
  else return 0.0;                                   // Jika ds ≥ -1, maka 0% mendekat
} 

// Menentukan derajat keanggotaan perubahan jarak dalam kategori "stabil"
// Menggunakan fungsi Gaussian dengan pusat di 0 (tidak ada perubahan)
float mu_stabil(float ds) { 
  return exp(-pow(ds, 2) / 2.0);    // Nilai tertinggi saat ds = 0 (tidak ada perubahan)
} 

// Menentukan derajat keanggotaan perubahan jarak dalam kategori "menjauh"
float mu_menjauh(float ds) { 
  if (ds > 1 && ds <= 4) return (ds - 1) / 3.0;  // Derajat keanggotaan naik untuk 1 < ds < 4
  else if (ds > 4) return 1.0;                    // Jika ds > 4, maka 100% menjauh
  else return 0.0;                                // Jika ds ≤ 1, maka 0% menjauh
} 

// Logika Fuzzy - Implementasi aturan fuzzy dan defuzzifikasi
float fuzzyLogic(float s, float ds) { 
  float sum_alpha_output = 0.0;  // Jumlah nilai alpha * output
  float sum_alpha = 0.0;         // Jumlah nilai alpha
  float alpha;                    // Untuk menyimpan nilai alpha sementara

  // Aturan Fuzzy dengan nilai output yang disesuaikan
  // Format: alpha = min(derajat_keanggotaan_jarak, derajat_keanggotaan_perubahan)

  // Rule 1: Jika terlalu dekat dan mendekat, maka mundur cepat (-200)
  alpha = fminf(mu_terlalu_dekat(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-200); sum_alpha += alpha; 

  // Rule 2: Jika terlalu dekat dan stabil, maka mundur (-100)
  alpha = fminf(mu_terlalu_dekat(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  // Rule 3: Jika terlalu dekat dan menjauh, maka diam (0)
  alpha = fminf(mu_terlalu_dekat(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  // Rule 4: Jika di target dan stabil, maka diam (0)
  alpha = fminf(mu_target(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  // Rule 5: Jika di target dan mendekat, maka mundur (-100)
  alpha = fminf(mu_target(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  // Rule 6: Jika di target dan menjauh, maka maju (100)
  alpha = fminf(mu_target(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 100; sum_alpha += alpha; 

  // Rule 7: Jika dekat dan mendekat, maka mundur (-100)
  alpha = fminf(mu_dekat(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  // Rule 8: Jika dekat dan stabil, maka diam (0)
  alpha = fminf(mu_dekat(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  // Rule 9: Jika dekat dan menjauh, maka maju pelan (50)
  alpha = fminf(mu_dekat(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 50; sum_alpha += alpha; 

  // Rule 10: Jika jauh dan mendekat, maka maju (100)
  alpha = fminf(mu_jauh(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * 100; sum_alpha += alpha; 

  // Rule 11: Jika jauh dan stabil, maka maju cepat (200)
  alpha = fminf(mu_jauh(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 200; sum_alpha += alpha; 

  // Rule 12: Jika jauh dan menjauh, maka maju cepat (200)
  alpha = fminf(mu_jauh(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 200; sum_alpha += alpha; 

  // Defuzzifikasi - menggunakan metode weighted average
  if (sum_alpha > 0) return sum_alpha_output / sum_alpha; 
  else return 0; 
} 

// Kontrol Motor - mengatur arah dan kecepatan motor berdasarkan nilai PWM
void gerakMotor(int pwm) { 
  int kecepatan = constrain(abs(pwm), 0, 255);  // Batasi nilai PWM antara 0-255

  // PWM positif = maju, PWM negatif = mundur, PWM 0 = berhenti
  if (pwm > 0) {  // Maju
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH); 
  } else if (pwm < 0) {  // Mundur
    digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH); 
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW); 
  } else {  // Berhenti
    digitalWrite(IN1, LOW);  digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, LOW); 
  } 

  // Atur kecepatan kedua motor
  analogWrite(ENA, kecepatan); 
  analogWrite(ENB, kecepatan); 
} 

// Baca Sensor - mengukur jarak menggunakan sensor ultrasonik
float bacaSensor() { 
  digitalWrite(TRIG, LOW);   // Pastikan pin trigger dalam keadaan LOW
  delayMicroseconds(2);      // Tunggu 2 mikrodetik
  digitalWrite(TRIG, HIGH);  // Kirim pulsa HIGH ke pin trigger
  delayMicroseconds(10);     // Tunggu 10 mikrodetik
  digitalWrite(TRIG, LOW);   // Kembalikan pin trigger ke LOW

  // Hitung jarak berdasarkan waktu perjalanan gelombang ultrasonik
  long duration = pulseIn(ECHO, HIGH);  // Ukur waktu pulsa HIGH di pin echo (dalam mikrodetik)
  return duration * 0.0343 / 2;         // Konversi waktu ke jarak (cm): kecepatan suara = 343 m/s, dibagi 2 karena pulang-pergi
} 

// Visualisasi PWM - menampilkan nilai PWM dalam bentuk bar di Serial Monitor
void tampilkanBarPWM(int pwm) { 
  int barLength = map(abs(pwm), 0, 255, 0, 20);  // Panjang bar proporsional dengan nilai PWM
  Serial.print("PWM: "); 

  // Tampilkan bar sesuai arah gerakan
  if (pwm > 0) for (int i = 0; i < barLength; i++) Serial.print(">"); // Maju: ">"
  else if (pwm < 0) for (int i = 0; i < barLength; i++) Serial.print("<"); // Mundur: "<"
  else Serial.print("0"); // Diam: "0"

  Serial.println(); 
} 

// Setup - inisialisasi program
void setup() { 
  Serial.begin(9600);  // Inisialisasi komunikasi serial dengan baud rate 9600

  // Konfigurasi pin sensor ultrasonik
  pinMode(TRIG, OUTPUT); 
  pinMode(ECHO, INPUT); 

  // Konfigurasi pin motor
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT); 
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT); 
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT); 

  gerakMotor(0);  // Pastikan motor dalam keadaan berhenti saat program dimulai
} 

// Loop - fungsi utama yang dijalankan berulang-ulang
void loop() { 
  float jarak = bacaSensor();  // Baca jarak dari sensor ultrasonik
  float delta_s = jarak - jarakSebelumnya;  // Hitung perubahan jarak

  // Terapkan logika fuzzy untuk menentukan nilai PWM
  float pwm = fuzzyLogic(jarak, delta_s); 
  pwm = constrain(pwm, -200, 200);  // Batasi nilai PWM antara -200 sampai 200

  // Dead zone untuk menghindari getaran pada nilai PWM kecil
  if (abs(pwm) < 20) pwm = 0; 

  // Terapkan nilai PWM ke motor
  gerakMotor(pwm); 

  // Tampilkan data ke Serial Monitor
  Serial.print(jarak); Serial.print("	"); 
  Serial.print(delta_s); Serial.print("	"); 
  Serial.println(pwm); 

  // Simpan jarak saat ini untuk iterasi berikutnya
  jarakSebelumnya = jarak; 

  delay(100);  // Tunda 100ms sebelum pembacaan sensor berikutnya
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
