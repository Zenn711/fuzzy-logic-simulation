
import { useState, useEffect } from "react";
import TabSelector from "@/components/TabSelector";
import SimulationTab from "@/components/SimulationTab";
import CodeExplanationTab from "@/components/CodeExplanationTab";
import AboutTab from "@/components/AboutTab";
import SettingsTab from "@/components/SettingsTab";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [activeTab, setActiveTab] = useState("simulation");
  const [stepSize, setStepSize] = useState(0.1);
  const [refreshInterval, setRefreshInterval] = useState(500);

  return (
    <div className="container py-8 px-4 mx-auto min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuzzy-purple-light to-fuzzy-purple">
          Fuzzy Pulse Harmonizer
        </h1>
        <p className="mt-2 text-fuzzy-neutral max-w-xl mx-auto">
          Interactive fuzzy logic control system simulation based on Arduino implementation
        </p>
      </header>
      
      <div className="mb-8">
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <Separator className="my-6" />
      
      <main>
        {activeTab === "simulation" && <SimulationTab />}
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
      
      <footer className="mt-16 text-center text-sm text-fuzzy-neutral">
        <p>Fuzzy Pulse Harmonizer &copy; {new Date().getFullYear()} - Fuzzy Logic Simulation</p>
      </footer>
    </div>
  );
};

export default Index;
