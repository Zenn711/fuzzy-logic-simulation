
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SettingsTabProps {
  stepSize: number;
  setStepSize: (value: number) => void;
  refreshInterval: number;
  setRefreshInterval: (value: number) => void;
}

const SettingsTab = ({ 
  stepSize, 
  setStepSize,
  refreshInterval,
  setRefreshInterval
}: SettingsTabProps) => {
  const [localStepSize, setLocalStepSize] = useState(stepSize);
  const [localRefreshInterval, setLocalRefreshInterval] = useState(refreshInterval);
  const [showTooltips, setShowTooltips] = useState(true);
  const [historyLimit, setHistoryLimit] = useState(10);
  
  const handleSaveSettings = () => {
    setStepSize(localStepSize);
    setRefreshInterval(localRefreshInterval);
    toast.success("Settings saved successfully!");
  };
  
  const handleResetSettings = () => {
    setLocalStepSize(0.1);
    setLocalRefreshInterval(500);
    setShowTooltips(true);
    setHistoryLimit(10);
    
    setStepSize(0.1);
    setRefreshInterval(500);
    toast.success("Settings reset to defaults");
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Simulation Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="stepSize">Input Step Size</Label>
                <span className="text-sm font-mono">{localStepSize}</span>
              </div>
              <Slider
                id="stepSize"
                min={0.01}
                max={1}
                step={0.01}
                value={[localStepSize]}
                onValueChange={(values) => setLocalStepSize(values[0])}
              />
              <p className="text-xs text-muted-foreground">
                Controls the precision of the distance and delta sliders. Lower values allow for finer adjustments.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="refreshInterval">Refresh Interval (ms)</Label>
                <span className="text-sm font-mono">{localRefreshInterval}</span>
              </div>
              <Slider
                id="refreshInterval"
                min={100}
                max={2000}
                step={100}
                value={[localRefreshInterval]}
                onValueChange={(values) => setLocalRefreshInterval(values[0])}
              />
              <p className="text-xs text-muted-foreground">
                Controls how frequently the simulation updates. Lower values provide smoother updates but might be more resource-intensive.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showTooltips" className="block mb-1">Show Tooltips</Label>
                  <p className="text-xs text-muted-foreground">Display explanatory tooltips throughout the interface</p>
                </div>
                <Switch
                  id="showTooltips"
                  checked={showTooltips}
                  onCheckedChange={setShowTooltips}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="historyLimit">History Entry Limit</Label>
                <Select 
                  value={historyLimit.toString()} 
                  onValueChange={(value) => setHistoryLimit(parseInt(value))}
                >
                  <SelectTrigger id="historyLimit" className="w-full">
                    <SelectValue placeholder="Select a limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 entries</SelectItem>
                    <SelectItem value="10">10 entries</SelectItem>
                    <SelectItem value="20">20 entries</SelectItem>
                    <SelectItem value="50">50 entries</SelectItem>
                    <SelectItem value="100">100 entries</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Maximum number of history entries to store
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chartResolution">Chart Resolution</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="chartResolution" className="w-full">
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (50 points)</SelectItem>
                    <SelectItem value="medium">Medium (100 points)</SelectItem>
                    <SelectItem value="high">High (200 points)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Number of data points used to render membership function charts
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="exportFormat">Export Format</Label>
                <Select defaultValue="json">
                  <SelectTrigger id="exportFormat" className="w-full">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Default file format when exporting simulation history
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showMembershipValues" className="block mb-1">Show Membership Values</Label>
                  <p className="text-xs text-muted-foreground">Display current membership values panel</p>
                </div>
                <Switch
                  id="showMembershipValues"
                  defaultChecked={true}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showGridlines" className="block mb-1">Show Chart Gridlines</Label>
                  <p className="text-xs text-muted-foreground">Display gridlines in membership function charts</p>
                </div>
                <Switch
                  id="showGridlines"
                  defaultChecked={true}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableAnimations" className="block mb-1">Enable Animations</Label>
                  <p className="text-xs text-muted-foreground">Use animated transitions throughout the interface</p>
                </div>
                <Switch
                  id="enableAnimations"
                  defaultChecked={true}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showCurrentValueLine" className="block mb-1">Show Current Value Line</Label>
                  <p className="text-xs text-muted-foreground">Display a line on charts showing the current input value</p>
                </div>
                <Switch
                  id="showCurrentValueLine"
                  defaultChecked={true}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deadbandThreshold">Deadband Threshold</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="deadbandThreshold"
                  type="number"
                  min={0}
                  max={50}
                  defaultValue={20}
                  className="w-full"
                />
                <span className="text-sm text-muted-foreground">PWM units</span>
              </div>
              <p className="text-xs text-muted-foreground">
                PWM values below this threshold (absolute value) will be treated as zero
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pwmRange">PWM Range</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="minPwm"
                  type="number"
                  min={-255}
                  max={0}
                  defaultValue={-200}
                  className="w-full"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  id="maxPwm"
                  type="number"
                  min={0}
                  max={255}
                  defaultValue={200}
                  className="w-full"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum and maximum PWM values for simulation constraints
              </p>
            </div>
            
            <Button className="w-full mt-4" variant="secondary">
              Export Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
