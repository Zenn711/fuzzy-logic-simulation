
/**
 * Fuzzy Logic Simulation Engine
 * This module recreates the fuzzy logic system from the Arduino code
 */

// Membership Functions
export const mu_terlalu_dekat = (s: number): number => {
  if (s <= 6) return 1.0;
  else if (s < 8) return (8 - s) / 2.0;
  else return 0.0;
};

export const mu_target = (s: number): number => {
  return Math.exp(-Math.pow(s - 10, 2) / 2.0);
};

export const mu_dekat = (s: number): number => {
  if (s < 10) return 0.0;
  else if (s <= 15) return (s - 10) / 5.0;
  else if (s <= 20) return (20 - s) / 5.0;
  else return 0.0;
};

export const mu_jauh = (s: number): number => {
  if (s <= 14) return 0.0;
  else if (s < 18) return (s - 14) / 4.0;
  else return 1.0;
};

export const mu_mendekat = (ds: number): number => {
  if (ds >= -4 && ds < -1) return (-ds - 1) / 3.0;
  else if (ds < -4) return 1.0;
  else return 0.0;
};

export const mu_stabil = (ds: number): number => {
  return Math.exp(-Math.pow(ds, 2) / 2.0);
};

export const mu_menjauh = (ds: number): number => {
  if (ds > 1 && ds <= 4) return (ds - 1) / 3.0;
  else if (ds > 4) return 1.0;
  else return 0.0;
};

// Fuzzy Logic Implementation
export const fuzzyLogic = (s: number, ds: number): number => {
  let sum_alpha_output = 0.0;
  let sum_alpha = 0.0;
  let alpha: number;

  // Applying the fuzzy rules with the corresponding output values
  alpha = Math.min(mu_terlalu_dekat(s), mu_mendekat(ds));
  sum_alpha_output += alpha * (-200);
  sum_alpha += alpha;

  alpha = Math.min(mu_terlalu_dekat(s), mu_stabil(ds));
  sum_alpha_output += alpha * (-100);
  sum_alpha += alpha;

  alpha = Math.min(mu_terlalu_dekat(s), mu_menjauh(ds));
  sum_alpha_output += alpha * 0;
  sum_alpha += alpha;

  alpha = Math.min(mu_target(s), mu_stabil(ds));
  sum_alpha_output += alpha * 0;
  sum_alpha += alpha;

  alpha = Math.min(mu_target(s), mu_mendekat(ds));
  sum_alpha_output += alpha * (-100);
  sum_alpha += alpha;

  alpha = Math.min(mu_target(s), mu_menjauh(ds));
  sum_alpha_output += alpha * 100;
  sum_alpha += alpha;

  alpha = Math.min(mu_dekat(s), mu_mendekat(ds));
  sum_alpha_output += alpha * (-100);
  sum_alpha += alpha;

  alpha = Math.min(mu_dekat(s), mu_stabil(ds));
  sum_alpha_output += alpha * 0;
  sum_alpha += alpha;

  alpha = Math.min(mu_dekat(s), mu_menjauh(ds));
  sum_alpha_output += alpha * 50;
  sum_alpha += alpha;

  alpha = Math.min(mu_jauh(s), mu_mendekat(ds));
  sum_alpha_output += alpha * 100;
  sum_alpha += alpha;

  alpha = Math.min(mu_jauh(s), mu_stabil(ds));
  sum_alpha_output += alpha * 200;
  sum_alpha += alpha;

  alpha = Math.min(mu_jauh(s), mu_menjauh(ds));
  sum_alpha_output += alpha * 200;
  sum_alpha += alpha;

  // Defuzzification
  if (sum_alpha > 0) return sum_alpha_output / sum_alpha;
  else return 0;
};

// Process and constrain the final PWM value
export const calculatePWM = (s: number, ds: number): number => {
  let pwm = fuzzyLogic(s, ds);
  pwm = Math.max(-200, Math.min(200, pwm)); // constrain to -200 to 200
  
  // Apply deadband like in Arduino code
  if (Math.abs(pwm) < 20) pwm = 0;
  
  return pwm;
};

// Generate an array of points for a membership function to plot
export const generateMembershipFunctionPoints = (
  func: (x: number) => number, 
  start: number, 
  end: number, 
  steps: number
): { x: number; y: number }[] => {
  const points: { x: number; y: number }[] = [];
  const stepSize = (end - start) / steps;
  
  for (let i = 0; i <= steps; i++) {
    const x = start + i * stepSize;
    points.push({ x, y: func(x) });
  }
  
  return points;
};
