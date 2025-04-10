
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const CodeExplanationTab = () => {
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Fuzzy Logic Algorithm Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            <p>
              This fuzzy logic control system aims to maintain a target distance from an obstacle by adjusting motor speed and direction. Here's how it works:
            </p>
            
            <h3 className="text-lg font-semibold mt-4">System Overview</h3>
            <p>
              The control system uses two input variables:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Distance (s):</strong> The current distance from the sensor to the obstacle</li>
              <li><strong>Delta Distance (ds):</strong> The rate of change in distance (current - previous)</li>
            </ul>
            <p>
              Based on these inputs, the system produces a PWM (Pulse Width Modulation) value that controls:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Direction of motor rotation (positive or negative)</li>
              <li>Speed of the motors (magnitude of PWM)</li>
            </ul>
          </div>
          
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="membership_functions">
              <AccordionTrigger>Membership Functions</AccordionTrigger>
              <AccordionContent>
                <Tabs defaultValue="distance">
                  <TabsList className="mb-4">
                    <TabsTrigger value="distance">Distance</TabsTrigger>
                    <TabsTrigger value="delta">Delta Distance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="distance">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm">mu_terlalu_dekat (Too Close)</h4>
                        <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto">
                          <code>
{`float mu_terlalu_dekat(float s) { 
  if (s <= 6) return 1.0; 
  else if (s < 8) return (8 - s) / 2.0; 
  else return 0.0; 
}`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          Returns 1.0 when distance ≤ 6cm (fully "too close"), decreases linearly to 0 between 6-8cm.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm">mu_target (Target Distance)</h4>
                        <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto">
                          <code>
{`float mu_target(float s) { 
  return exp(-pow(s - 10, 2) / 2.0); 
}`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          A Gaussian membership function centered at 10cm. Returns 1.0 at exactly 10cm and gradually decreases as distance deviates from 10cm.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm">mu_dekat (Close)</h4>
                        <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto">
                          <code>
{`float mu_dekat(float s) { 
  if (s < 10) return 0.0; 
  else if (s <= 15) return (s - 10) / 5.0; 
  else if (s <= 20) return (20 - s) / 5.0; 
  else return 0.0; 
}`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          A triangular membership function that peaks at 15cm. Increases linearly from 10-15cm, then decreases linearly from 15-20cm.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm">mu_jauh (Far)</h4>
                        <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto">
                          <code>
{`float mu_jauh(float s) { 
  if (s <= 14) return 0.0; 
  else if (s < 18) return (s - 14) / 4.0; 
  else return 1.0; 
}`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          Returns 0 when distance ≤ 14cm, increases linearly from 14-18cm, then remains 1.0 for distances ≥ 18cm (fully "far").
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="delta">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm">mu_mendekat (Approaching)</h4>
                        <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto">
                          <code>
{`float mu_mendekat(float ds) { 
  if (ds >= -4 && ds < -1) return (-ds - 1) / 3.0; 
  else if (ds < -4) return 1.0; 
  else return 0.0; 
}`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          Negative delta means the object is getting closer. This function returns 1.0 when ds ≤ -4 (rapidly approaching), decreases linearly to 0 between -4 and -1.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm">mu_stabil (Stable)</h4>
                        <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto">
                          <code>
{`float mu_stabil(float ds) { 
  return exp(-pow(ds, 2) / 2.0); 
}`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          A Gaussian membership function centered at 0. Returns 1.0 when there's no change in distance (ds = 0) and gradually decreases as the rate of change increases in either direction.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm">mu_menjauh (Moving Away)</h4>
                        <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto">
                          <code>
{`float mu_menjauh(float ds) { 
  if (ds > 1 && ds <= 4) return (ds - 1) / 3.0; 
  else if (ds > 4) return 1.0; 
  else return 0.0; 
}`}
                          </code>
                        </pre>
                        <p className="text-sm mt-2">
                          Positive delta means the object is moving away. This function returns 0 when ds ≤ 1, increases linearly from 1-4, then returns 1.0 when ds > 4 (rapidly moving away).
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="fuzzy_rules">
              <AccordionTrigger>Fuzzy Rules</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-4">
                  The system uses 12 fuzzy rules that map combinations of input membership values to specific PWM output values:
                </p>
                
                <div className="bg-black p-4 rounded-md text-xs overflow-x-auto">
                  <ScrollArea className="h-96">
                    <pre>
                      <code>
{`// Aturan Fuzzy dengan nilai output yang disesuaikan 
alpha = fminf(mu_terlalu_dekat(s), mu_mendekat(ds)); 
sum_alpha_output += alpha * (-200); sum_alpha += alpha; 

alpha = fminf(mu_terlalu_dekat(s), mu_stabil(ds)); 
sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

alpha = fminf(mu_terlalu_dekat(s), mu_menjauh(ds)); 
sum_alpha_output += alpha * 0; sum_alpha += alpha; 

alpha = fminf(mu_target(s), mu_stabil(ds)); 
sum_alpha_output += alpha * 0; sum_alpha += alpha; 

alpha = fminf(mu_target(s), mu_mendekat(ds)); 
sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

alpha = fminf(mu_target(s), mu_menjauh(ds)); 
sum_alpha_output += alpha * 100; sum_alpha += alpha; 

alpha = fminf(mu_dekat(s), mu_mendekat(ds)); 
sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

alpha = fminf(mu_dekat(s), mu_stabil(ds)); 
sum_alpha_output += alpha * 0; sum_alpha += alpha; 

alpha = fminf(mu_dekat(s), mu_menjauh(ds)); 
sum_alpha_output += alpha * 50; sum_alpha += alpha; 

alpha = fminf(mu_jauh(s), mu_mendekat(ds)); 
sum_alpha_output += alpha * 100; sum_alpha += alpha; 

alpha = fminf(mu_jauh(s), mu_stabil(ds)); 
sum_alpha_output += alpha * 200; sum_alpha += alpha; 

alpha = fminf(mu_jauh(s), mu_menjauh(ds)); 
sum_alpha_output += alpha * 200; sum_alpha += alpha;`}
                      </code>
                    </pre>
                  </ScrollArea>
                </div>
                
                <div className="mt-4 text-sm">
                  <h4 className="font-medium mb-2">Rule Interpretation</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Too Close & Approaching:</strong> Strong reverse (-200) to avoid collision
                    </li>
                    <li>
                      <strong>Too Close & Stable:</strong> Moderate reverse (-100) to increase distance
                    </li>
                    <li>
                      <strong>Too Close & Moving Away:</strong> No action (0) as the situation is improving
                    </li>
                    <li>
                      <strong>Target & Stable:</strong> No action (0) as the position is ideal
                    </li>
                    <li>
                      <strong>Target & Approaching:</strong> Moderate reverse (-100) to maintain target distance
                    </li>
                    <li>
                      <strong>Target & Moving Away:</strong> Moderate forward (100) to maintain target distance
                    </li>
                    <li>
                      <strong>Close & Approaching:</strong> Moderate reverse (-100) to prevent getting too close
                    </li>
                    <li>
                      <strong>Close & Stable:</strong> No action (0) as position is acceptable
                    </li>
                    <li>
                      <strong>Close & Moving Away:</strong> Slight forward (50) to maintain proximity
                    </li>
                    <li>
                      <strong>Far & Approaching:</strong> Moderate forward (100) as situation is improving
                    </li>
                    <li>
                      <strong>Far & Stable:</strong> Strong forward (200) to reduce distance
                    </li>
                    <li>
                      <strong>Far & Moving Away:</strong> Strong forward (200) to prevent further separation
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="defuzzification">
              <AccordionTrigger>Defuzzification</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-4">
                  After evaluating all the rules, the system uses the weighted average method for defuzzification:
                </p>
                
                <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto mb-4">
                  <code>
{`// Defuzzifikasi 
if (sum_alpha > 0) return sum_alpha_output / sum_alpha; 
else return 0;`}
                  </code>
                </pre>
                
                <div className="space-y-2 text-sm">
                  <p>
                    This calculates the weighted average of all rule outputs, where each rule's output is weighted by its activation level (alpha).
                  </p>
                  <p>
                    The final PWM value is then constrained to the range of -200 to 200 and values below 20 (absolute) are treated as 0 to create a "dead zone":
                  </p>
                  
                  <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto">
                    <code>
{`float pwm = fuzzyLogic(jarak, delta_s); 
pwm = constrain(pwm, -200, 200); 

if (abs(pwm) < 20) pwm = 0;`}
                    </code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="motor_control">
              <AccordionTrigger>Motor Control Implementation</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm mb-4">
                  The final PWM value controls the robot's movement through the following logic:
                </p>
                
                <pre className="bg-black p-2 rounded-md text-xs overflow-x-auto mb-4">
                  <code>
{`void gerakMotor(int pwm) { 
  int kecepatan = constrain(abs(pwm), 0, 255); 

  if (pwm > 0) { 
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH); 
  } else if (pwm < 0) { 
    digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH); 
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW); 
  } else { 
    digitalWrite(IN1, LOW);  digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, LOW); 
  } 

  analogWrite(ENA, kecepatan); 
  analogWrite(ENB, kecepatan); 
}`}
                  </code>
                </pre>
                
                <div className="space-y-2 text-sm">
                  <h4 className="font-medium">Direction Control</h4>
                  <ul className="list-disc pl-6">
                    <li><strong>Positive PWM:</strong> Move forward (toward object if sensor is in front)</li>
                    <li><strong>Negative PWM:</strong> Move backward (away from object)</li>
                    <li><strong>Zero PWM:</strong> Stop all motors</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">Speed Control</h4>
                  <p>
                    The absolute value of PWM (constrained to 0-255) determines the speed of the motors.
                    Higher PWM values correspond to faster movement.
                  </p>
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
          <ScrollArea className="h-[500px] rounded-md border">
            <pre className="p-4 text-xs">
              <code>
{`#include <Arduino.h> 
#include <math.h> 

// Definisi pin 
#define IN1 6 
#define IN2 7 
#define IN3 5 
#define IN4 4 
#define ENA 9 
#define ENB 10 
#define TRIG 2 
#define ECHO 3 

float jarakSebelumnya = 0; 

// Fungsi Keanggotaan 
float mu_terlalu_dekat(float s) { 
  if (s <= 6) return 1.0; 
  else if (s < 8) return (8 - s) / 2.0; 
  else return 0.0; 
} 

float mu_target(float s) { 
  return exp(-pow(s - 10, 2) / 2.0); 
} 

float mu_dekat(float s) { 
  if (s < 10) return 0.0; 
  else if (s <= 15) return (s - 10) / 5.0; 
  else if (s <= 20) return (20 - s) / 5.0; 
  else return 0.0; 
} 

float mu_jauh(float s) { 
  if (s <= 14) return 0.0; 
  else if (s < 18) return (s - 14) / 4.0; 
  else return 1.0; 
} 

float mu_mendekat(float ds) { 
  if (ds >= -4 && ds < -1) return (-ds - 1) / 3.0; 
  else if (ds < -4) return 1.0; 
  else return 0.0; 
} 

float mu_stabil(float ds) { 
  return exp(-pow(ds, 2) / 2.0); 
} 

float mu_menjauh(float ds) { 
  if (ds > 1 && ds <= 4) return (ds - 1) / 3.0; 
  else if (ds > 4) return 1.0; 
  else return 0.0; 
} 

// Logika Fuzzy 
float fuzzyLogic(float s, float ds) { 
  float sum_alpha_output = 0.0; 
  float sum_alpha = 0.0; 
  float alpha; 

  // Aturan Fuzzy dengan nilai output yang disesuaikan 
  alpha = fminf(mu_terlalu_dekat(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-200); sum_alpha += alpha; 

  alpha = fminf(mu_terlalu_dekat(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  alpha = fminf(mu_terlalu_dekat(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  alpha = fminf(mu_target(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  alpha = fminf(mu_target(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  alpha = fminf(mu_target(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 100; sum_alpha += alpha; 

  alpha = fminf(mu_dekat(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * (-100); sum_alpha += alpha; 

  alpha = fminf(mu_dekat(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 0; sum_alpha += alpha; 

  alpha = fminf(mu_dekat(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 50; sum_alpha += alpha; 

  alpha = fminf(mu_jauh(s), mu_mendekat(ds)); 
  sum_alpha_output += alpha * 100; sum_alpha += alpha; 

  alpha = fminf(mu_jauh(s), mu_stabil(ds)); 
  sum_alpha_output += alpha * 200; sum_alpha += alpha; 

  alpha = fminf(mu_jauh(s), mu_menjauh(ds)); 
  sum_alpha_output += alpha * 200; sum_alpha += alpha; 

  // Defuzzifikasi 
  if (sum_alpha > 0) return sum_alpha_output / sum_alpha; 
  else return 0; 
} 

// Kontrol Motor 
void gerakMotor(int pwm) { 
  int kecepatan = constrain(abs(pwm), 0, 255); 

  if (pwm > 0) { 
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH); 
  } else if (pwm < 0) { 
    digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH); 
    digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW); 
  } else { 
    digitalWrite(IN1, LOW);  digitalWrite(IN2, LOW); 
    digitalWrite(IN3, LOW);  digitalWrite(IN4, LOW); 
  } 

  analogWrite(ENA, kecepatan); 
  analogWrite(ENB, kecepatan); 
} 

// Baca Sensor 
float bacaSensor() { 
  digitalWrite(TRIG, LOW); 
  delayMicroseconds(2); 
  digitalWrite(TRIG, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(TRIG, LOW); 

  long duration = pulseIn(ECHO, HIGH); 
  return duration * 0.0343 / 2; 
} 

// Visualisasi PWM 
void tampilkanBarPWM(int pwm) { 
  int barLength = map(abs(pwm), 0, 255, 0, 20); 
  Serial.print("PWM: "); 

  if (pwm > 0) for (int i = 0; i < barLength; i++) Serial.print(">"); 
  else if (pwm < 0) for (int i = 0; i < barLength; i++) Serial.print("<"); 
  else Serial.print("0"); 

  Serial.println(); 
} 

// Setup 
void setup() { 
  Serial.begin(9600); 

  pinMode(TRIG, OUTPUT); 
  pinMode(ECHO, INPUT); 

  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT); 
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT); 
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT); 

  gerakMotor(0); 
} 

// Loop 
void loop() { 
  float jarak = bacaSensor(); 
  float delta_s = jarak - jarakSebelumnya; 

  float pwm = fuzzyLogic(jarak, delta_s); 
  pwm = constrain(pwm, -200, 200); 

  if (abs(pwm) < 20) pwm = 0; 

  gerakMotor(pwm); 

  Serial.print(jarak); Serial.print("\\t"); 
  Serial.print(delta_s); Serial.print("\\t"); 
  Serial.println(pwm); 

  jarakSebelumnya = jarak; 

  delay(100); 
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
