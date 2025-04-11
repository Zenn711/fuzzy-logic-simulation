
import { useState, useEffect } from "react";
import TabSelector from "@/components/TabSelector";
import SimulationTab from "@/components/SimulationTab";
import CodeExplanationTab from "@/components/CodeExplanationTab";
import AboutTab from "@/components/AboutTab";
import SettingsTab from "@/components/SettingsTab";
import VisualizationTab from "@/components/VisualizationTab";
import ParticleBackground from "@/components/ParticleBackground";
import { Separator } from "@/components/ui/separator";

const Index = () => {
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
  }, [activeTab]);
  
  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem('settings-stepSize', stepSize.toString());
    localStorage.setItem('settings-refreshInterval', refreshInterval.toString());
  }, [stepSize, refreshInterval]);

  return (
    <div className="container py-8 px-4 mx-auto min-h-screen relative">
      <ParticleBackground />
      
      <header className="mb-8 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuzzy-purple-light to-fuzzy-purple animate-pulse-glow">
          Fuzzy Pulse Harmonizer
        </h1>
        <p className="mt-2 text-fuzzy-neutral max-w-xl mx-auto">
          Interactive fuzzy logic control system simulation based on Arduino implementation
        </p>
      </header>
      
      <div className="mb-8 relative z-10">
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <Separator className="my-6" />
      
      <main className="relative z-10">
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
      </main>
      
      <footer className="mt-16 text-center text-sm text-fuzzy-neutral relative z-10">
        <p>Fuzzy Pulse Harmonizer &copy; {new Date().getFullYear()} - Fuzzy Logic Simulation</p>
      </footer>
    </div>
  );
};

export default Index;
