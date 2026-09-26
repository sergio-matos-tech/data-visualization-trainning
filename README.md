# Data Visualization Training

Repository dedicated to practical exercises, laboratory activities, and study materials for Data Visualization using SVG and D3.js.

## 📂 Project Structure

```text
├── References/       # Course slides and theoretical reference materials
├── lab02-A/          # Practice 02 - Part A: Student performance charts
│   ├── index.html
│   ├── script.js
│   └── style.css
└── lab02-B/          # Practice 02 - Part B: Appliance consumption chart
    ├── index.html
    ├── script.js
    └── style.css
```

## 📊 Laboratories

### Lab 02-A: Student Performance Visualizations
Interactive SVG visualizations built with D3.js:
1. **Grade Evolution**: Line chart displaying grade progression for students across 5 school years.
2. **Student Weights (5th Year)**: Horizontal bar chart sorted by weight.
3. **Height vs. Weight**: Scatter plot correlating height and weight, where bubble radius encodes student grades.

### Lab 02-B: Appliance Energy Consumption
Scatter plot visualization comparing:
- Energy consumption (kWh) vs. usage hours.
- Visual threshold lines for consumption (50 kWh) and usage (100h).
- Color-coded indicators distinguishing high vs. normal consumption.

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone git@github.com:sergio-matos-tech/data-visualization-trainning.git
   cd data-visualization-trainning
   ```
2. Open any laboratory `index.html` directly in your web browser, or use a local static server:
   ```bash
   # Example using Python
   python -m http.server 8000
   ```

## 🛠️ Technologies
- **HTML5 & CSS3**
- **SVG**
- **JavaScript**
- **[D3.js (v7)](https://d3js.org/)**
