
import { useState, useEffect } from "react";
import TabSelector from "@/components/TabSelector";
import SimulationTab from "@/components/SimulationTab";
import CodeExplanationTab from "@/components/CodeExplanationTab";
import AboutTab from "@/components/AboutTab";
import SettingsTab from "@/components/SettingsTab";
import VisualizationTab from "@/components/VisualizationTab";
import ParticleBackground from "@/components/ParticleBackground";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  // Load the last active tab from localStorage, or default to "simulation"
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('active-tab');
    return savedTab || "simulation";
  });
  const [stepSize, setStepSize] = useState(() => {
    const savedStepSize = localStorage.getItem('settings-stepSize');
    return savedStepSize ? parseFloat(savedStepSize) : 0.1;
  });
  const [refreshInterval, setRefreshInterval] = useState(() => {
    const savedRefreshInterval = localStorage.getItem('settings-refreshInterval');
    return savedRefreshInterval ? parseInt(savedRefreshInterval) : 500;
  });
  
  // Save active tab whenever it changes
  useEffect(() => {
    localStorage.setItem('active-tab', activeTab);
    
    // Show toast when tab changes
    if (activeTab) {
      toast({
        title: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab`,
        description: `Switched to ${activeTab} view`,
        duration: 1500,
      });
    }
  }, [activeTab, toast]);
  
  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem('settings-stepSize', stepSize.toString());
    localStorage.setItem('settings-refreshInterval', refreshInterval.toString());
  }, [stepSize, refreshInterval]);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="container py-6 px-4 sm:py-8 sm:px-4 mx-auto min-h-screen relative">
      <ParticleBackground />
      
      <motion.header 
        className="mb-6 sm:mb-8 text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuzzy-purple-light to-fuzzy-purple animate-pulse-glow leading-tight">
          Fuzzy Simulation 4WD
        </h1>
        <motion.p 
          className="mt-1 sm:mt-2 text-fuzzy-neutral max-w-full sm:max-w-xl mx-auto text-sm sm:text-base px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Interactive fuzzy logic control system simulation based on Arduino implementation
        </motion.p>
      </motion.header>
      
      <motion.div 
        className="mb-6 sm:mb-8 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
      
      <Separator className="my-4 sm:my-6 opacity-50" />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[50vh] sm:min-h-[60vh]"
          >
            {activeTab === "simulation" && <SimulationTab />}
            {activeTab === "visualization" && <VisualizationTab />}
            {activeTab === "code" && <CodeExplanationTab />}
            {activeTab === "about" && <AboutTab />}
            {activeTab === "settings" && (
              <SettingsTab 
                stepSize={stepSize}
                setStepSize={setStepSize}
                refreshInterval={refreshInterval}
                setRefreshInterval={setRefreshInterval}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <motion.footer 
        className="mt-10 sm:mt-16 text-center text-xs sm:text-sm text-fuzzy-neutral relative z-10 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Fuzzy Drive 4WD &copy; {new Date().getFullYear()} - Fuzzy Logic Simulation</p>
      </motion.footer>
    </div>
  );
};

export default Index;