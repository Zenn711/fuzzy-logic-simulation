# Fuzzy Logic Simulation for 4WD Control System

**Fuzzy Logic Simulation for 4WD Control System** is a web-based project demonstrating the application of fuzzy logic to control a 4WD robot in maintaining a target distance from obstacles. The project uses a **Takagi-Sugeno** approach to generate PWM signals based on input distance and change in distance, featuring a visual interface with support for **Dark and Darker themes**.

> 📝 Note: This project is designed for educational and simulation purposes. Real hardware implementation will require additional adjustments.

---

## 📋 Project Overview

This system uses fuzzy logic to control the speed and direction of a 4WD robot based on distance sensor readings. Fuzzy logic enables human-like decision-making by handling uncertainty in sensor input, resulting in smooth and stable movements.

### Key Features
* **Fuzzy Logic-Based Control:** Maintains a target distance (10 cm) from obstacles using 12 fuzzy rules.
* **Input and Output:**
* **Input:** Distance (s) and Change in Distance (ds).
* **Output:** PWM Signal (-200 to +200).
* **Takagi-Sugeno Method:** Crisp output for efficient computation on embedded systems.
* **Web Interface:** Simulation visualization with Dark/Darker themes for immersive user experience.
* **Membership Functions:** Trapezoidal, Gaussian, and Triangular functions used to model linguistic variables.

---

## Applications

* Educational demonstration of fuzzy logic.
* Simulation of robotic control systems.
* Foundation for developing autonomous 4WD robot controllers.

---

## Requirements

To run the project, you’ll need:

* A modern browser: Chrome, Firefox, or Edge.
* **Node.js** (optional, for local server development).
* **Git** (to clone the repository).

---

## 🚀 Installation & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/Zenn711/fuzzy-logic-simulation.git
cd fuzzy-logic-4wd-simulation
```

### 2. Run the Website
To run this project locally on your machine:

1. **Install dependencies**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. **Open in browser**
   Go to http://localhost:8080/ — or the URL provided in the terminal — to view the website.

### 3. Interact with the Simulation

Use the web interface to:

* Manually adjust distance and delta values.
* Observe how the fuzzy system calculates the PWM signal.
* View membership function graphs and fuzzy rule evaluations.
* Switch between **Dark** and **Darker** themes.

---

## System Workflow

The system follows these steps to control the 4WD robot:

1. **Distance Reading:** Reads current distance from ultrasonic sensor (simulated).
2. **Delta Calculation:** Computes change in distance (ds) from previous reading.
3. **Fuzzification:** Converts input distance and delta into fuzzy membership values.
4. **Rule Evaluation:** Applies 12 fuzzy rules to determine control action.
5. **Defuzzification:** Computes crisp PWM signal using weighted average method.
6. **Motor Control:** Applies PWM signal to adjust the robot's movement.

---

## Fuzzy Logic: Theory & Implementation

### Theoretical Background

Fuzzy logic, introduced by **Lotfi Zadeh** in 1965, allows modeling of uncertainty using membership values between 0 and 1. Unlike binary logic, fuzzy logic enables a value like distance to be “70% far” and “30% near” at the same time.

### Core Components

#### Input Variables:

* **Distance (s):** Too Close, Target, Near, Far
* **Change in Distance (ds):** Approaching, Stable, Receding

#### Output Variable:

* **PWM Signal:** Range from -200 to +200

#### Membership Functions:

| Variable    | Type      | Description                           |
| ----------- | --------- | ------------------------------------- |
| Too Close   | Trapezoid | 1.0 at ≤6 cm, decreasing to 0 at 8 cm |
| Target      | Gaussian  | Peak at 10 cm                         |
| Near        | Triangle  | Peak at 15 cm                         |
| Far         | Trapezoid | 1.0 at ≥18 cm                         |
| Approaching | Trapezoid | 1.0 at ds ≤ -4                        |
| Stable      | Gaussian  | Peak at ds = 0                        |
| Receding    | Trapezoid | 1.0 at ds ≥ 4                         |

#### Fuzzy Rules (Examples):

* **IF** distance is Too Close **AND** delta is Approaching → PWM = -200
* **IF** distance is Target **AND** delta is Stable → PWM = 0
* **IF** distance is Far **AND** delta is Receding → PWM = +200

#### Inference Method:

* **Takagi-Sugeno (zero-order):** Crisp output (e.g., -200, 0, +100)

#### Defuzzification:

* **Weighted average:** `sum(α_i × output_i) / sum(α_i)`

### Why Takagi-Sugeno?

* **Efficiency:** Crisp output (no fuzzy sets) reduces computational load.
* **Embedded Friendly:** Ideal for microcontrollers like Arduino.
* **Comparison with Mamdani:** Takagi-Sugeno avoids fuzzy output aggregation, resulting in faster processing.

---

## 📂 Project Structure

```
fuzzy-logic-4wd-simulation/
│
├── bun.lockb                  # Bun package manager lock file
├── components.json            # Shadcn UI component config
├── eslint.config.js           # ESLint config for code linting
├── index.html                 # HTML entry point
├── mailmap.txt                # Git mailmap (optional)
├── package.json               # Project dependencies and scripts
├── package-lock.json          # NPM lock file
├── postcss.config.js          # PostCSS config (for Tailwind)
├── tailwind.config.ts         # TailwindCSS config file
├── tsconfig.*.json            # TypeScript configurations
├── vite.config.ts             # Vite dev/build tool config
├── README.md                  # Project documentation
│
├── public/                    # Static files
│   ├── placeholder.svg
│   └── robots.txt
│
└── src/                       # Source code
    ├── App.tsx               # Main app component
    ├── main.tsx              # Entry point
    ├── index.css, App.css    # Global styles
    ├── vite-env.d.ts         # TypeScript Vite typings
    │
    ├── components/           # UI and logic components
    │   ├── FuzzySlider.tsx           # Slider for fuzzy inputs
    │   ├── PwmDisplay.tsx           # Shows output PWM
    │   ├── SimulationTab.tsx        # Main simulation view
    │   ├── VisualizationTab1.tsx    # Graphs and membership visuals
    │   └── ...                      # Other UI tabs and layout
    │   └── ui/                     # Shadcn UI components (accordion, button, toast, etc.)
    │
    ├── hooks/                # Custom React hooks
    │   ├── use-mobile.tsx            # Device detection hook
    │   └── use-toast.ts              # Toast utility hook
    │
    ├── lib/                  # Core logic
    │   ├── fuzzyLogic.ts             # All fuzzy logic functions and inference
    │   └── utils.ts                  # General utilities
    │
    └── pages/                # Route-level pages
        ├── Index.tsx                # Main landing page
        └── NotFound.tsx             # 404 fallback page
```
---

## 💻 Fuzzy Logic Code Example (in C++ style)

```cpp
// Membership function for "Too Close"
float mu_too_close(float s) {
  if (s <= 6) return 1.0;
  else if (s < 8) return (8 - s) / 2.0;
  else return 0.0;
}

// Membership function for "Target" (Gaussian)
float mu_target(float s) {
  return exp(-pow(s - 10, 2) / 2.0);
}

// Rule evaluation (example)
float alpha = fminf(mu_too_close(s), mu_approaching(ds));
sum_alpha_output += alpha * (-200); // PWM output -200
sum_alpha += alpha;
```

---

## 🔧 Dependencies

This project uses standard web technologies:

* **HTML5:** Structure
* **CSS3:** Styling (Dark/Darker themes)
* **JavaScript:** Simulation logic
* **(Optional) Node.js:** For local development server

Additional libraries (like p5.js or WebGL) can be added for advanced visualization.

---

## 💡 Development Notes

* **Hardware Adaptation:** For real-world use, adapt code for libraries like Arduino.
* **Rule Expansion:** Add more rules or input variables (e.g., obstacle angle) for better control.
* **Visualization:** Enhance interface with real-time graphs for membership functions and PWM.
* **Optimization:** Consider using p5.js or WebGL for 2D/3D simulation rendering.

---

## 🤝 Contributions

We welcome contributions to improve this project!

1. Fork the repository
2. Create a new branch: `git checkout -b new-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push your branch: `git push origin new-feature`
5. Create a Pull Request on GitHub

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For questions or suggestions:

* Contact Muhammad Harits at haritsnaufal479@gmail.com
* Open an issue on this repository
