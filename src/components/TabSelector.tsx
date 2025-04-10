
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BarChart, Book, Settings, Box } from "lucide-react";

interface TabSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabSelector = ({ activeTab, setActiveTab }: TabSelectorProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-5 h-auto">
        <TabsTrigger 
          value="simulation" 
          className="flex items-center gap-2 py-3"
        >
          <BarChart className="h-4 w-4" />
          <span className="hidden sm:inline">Simulation</span>
        </TabsTrigger>
        <TabsTrigger 
          value="visualization" 
          className="flex items-center gap-2 py-3"
        >
          <Box className="h-4 w-4" />
          <span className="hidden sm:inline">3D View</span>
        </TabsTrigger>
        <TabsTrigger 
          value="code" 
          className="flex items-center gap-2 py-3"
        >
          <ArrowRight className="h-4 w-4" />
          <span className="hidden sm:inline">Code Explanation</span>
        </TabsTrigger>
        <TabsTrigger 
          value="about" 
          className="flex items-center gap-2 py-3"
        >
          <Book className="h-4 w-4" />
          <span className="hidden sm:inline">About</span>
        </TabsTrigger>
        <TabsTrigger 
          value="settings" 
          className="flex items-center gap-2 py-3"
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabSelector;
