// ===== ENGINE SYSTEMS DATA =====
export const engineSystems = [
    {
        id: 1,
        name: "Cooling System",
        category: "cooling",
        function: "Regulates engine temperature to prevent overheating",
        components: ["Radiator", "Water Pump", "Thermostat", "Coolant"],
        maintenance: "Check coolant levels and flush every 2 years"
    },
    {
        id: 2,
        name: "Lubrication System",
        category: "lubrication",
        function: "Reduces friction between moving engine parts",
        components: ["Oil Pan", "Oil Pump", "Oil Filter", "Oil Galleries"],
        maintenance: "Change oil and filter every 5,000-7,500 miles"
    },
    {
        id: 3,
        name: "Fuel System",
        category: "fuel",
        function: "Delivers fuel to the engine for combustion",
        components: ["Fuel Tank", "Fuel Pump", "Fuel Filter", "Injectors"],
        maintenance: "Replace fuel filter every 30,000 miles"
    },
    {
        id: 4,
        name: "Ignition System",
        category: "ignition",
        function: "Creates spark to ignite fuel-air mixture",
        components: ["Spark Plugs", "Ignition Coils", "Distributor", "ECU"],
        maintenance: "Replace spark plugs every 30,000-50,000 miles"
    },
    {
        id: 5,
        name: "Exhaust System",
        category: "exhaust",
        function: "Directs exhaust gases away from engine",
        components: ["Exhaust Manifold", "Catalytic Converter", "Muffler", "O2 Sensors"],
        maintenance: "Check for leaks and replace catalytic converter as needed"
    },
    {
        id: 6,
        name: "Air Intake System",
        category: "air",
        function: "Supplies clean air for combustion",
        components: ["Air Filter", "MAF Sensor", "Throttle Body", "Intake Manifold"],
        maintenance: "Replace air filter every 15,000-30,000 miles"
    },
    {
        id: 7,
        name: "Timing System",
        category: "timing",
        function: "Synchronizes engine valve and piston movement",
        components: ["Timing Belt/Chain", "Tensioner", "Camshaft", "Crankshaft"],
        maintenance: "Replace timing belt every 60,000-100,000 miles"
    },
    {
        id: 8,
        name: "Emission Control System",
        category: "emission",
        function: "Reduces harmful exhaust emissions",
        components: ["EGR Valve", "PCV Valve", "EVAP System", "Catalytic Converter"],
        maintenance: "Replace PCV and EGR valves as needed"
    },
    {
        id: 9,
        name: "Starting System",
        category: "starting",
        function: "Cranks the engine to begin combustion",
        components: ["Starter Motor", "Solenoid", "Battery", "Ignition Switch"],
        maintenance: "Test battery and starter regularly"
    },
    {
        id: 10,
        name: "Charging System",
        category: "charging",
        function: "Recharges battery and powers electrical systems",
        components: ["Alternator", "Voltage Regulator", "Battery", "Wiring"],
        maintenance: "Test alternator output and battery condition"
    },
    {
        id: 11,
        name: "Engine Block",
        category: "structure",
        function: "Houses cylinders and supports engine components",
        components: ["Cylinders", "Crankcase", "Head Gasket", "Cylinder Head"],
        maintenance: "Inspect for cracks and warping"
    },
    {
        id: 12,
        name: "Piston Assembly",
        category: "structure",
        function: "Converts fuel combustion into mechanical force",
        components: ["Pistons", "Connecting Rods", "Piston Rings", "Wrist Pins"],
        maintenance: "Replace rings if oil consumption increases"
    },
    {
        id: 13,
        name: "Valve Train System",
        category: "structure",
        function: "Controls intake and exhaust valve operation",
        components: ["Valves", "Lifters", "Rocker Arms", "Camshaft"],
        maintenance: "Check valve clearance regularly"
    },
    {
        id: 14,
        name: "Crankshaft Assembly",
        category: "structure",
        function: "Converts linear piston motion into rotational force",
        components: ["Crankshaft", "Main Bearings", "Flywheel", "Balancer"],
        maintenance: "Inspect bearings for wear"
    },
    {
        id: 15,
        name: "Turbocharging System",
        category: "forced-induction",
        function: "Forces extra air into engine for more power",
        components: ["Turbocharger", "Wastegate", "Intercooler", "Oil Lines"],
        maintenance: "Allow turbo to cool before shutdown"
    }
];

// ===== WORKSHOP TOOLS DATA =====
export const workshopTools = [
    {
        id: 1,
        name: "Socket Wrench Set",
        category: "hand",
        price: "$89.99",
        description: "Complete set of metric and imperial sockets with ratchet handles for various bolt sizes.",
        brand: "Pro-Grip",
        rating: 4.8
    },
    {
        id: 2,
        name: "Torque Wrench",
        category: "hand",
        price: "$149.99",
        description: "Precision torque wrench for accurate bolt tightening to manufacturer specifications.",
        brand: "Precision-Torq",
        rating: 4.9
    },
    {
        id: 3,
        name: "OBD-II Diagnostic Scanner",
        category: "diagnostic",
        price: "$199.99",
        description: "Advanced scanner reads and clears engine fault codes with live data streaming.",
        brand: "Diag-Master",
        rating: 4.7
    },
    {
        id: 4,
        name: "Hydraulic Floor Jack",
        category: "lifting",
        price: "$259.99",
        description: "3-ton capacity floor jack with rapid lift mechanism for safe vehicle raising.",
        brand: "Lift-Pro",
        rating: 4.6
    },
    {
        id: 5,
        name: "Impact Wrench",
        category: "hand",
        price: "$179.99",
        description: "High-torque impact wrench for removing stubborn lug nuts and bolts.",
        brand: "Torq-Max",
        rating: 4.8
    },
    {
        id: 6,
        name: "Multimeter",
        category: "diagnostic",
        price: "$69.99",
        description: "Digital multimeter for measuring voltage, current, and resistance in vehicle circuits.",
        brand: "Test-Pro",
        rating: 4.5
    },
    {
        id: 7,
        name: "Jack Stands (Pair)",
        category: "lifting",
        price: "$79.99",
        description: "Heavy-duty jack stands rated at 3-tons for secure vehicle support during repairs.",
        brand: "Safe-Stand",
        rating: 4.9
    },
    {
        id: 8,
        name: "Screwdriver Set",
        category: "hand",
        price: "$39.99",
        description: "20-piece set with flathead and Phillips drivers in various sizes.",
        brand: "Grip-Tool",
        rating: 4.4
    },
    {
        id: 9,
        name: "Battery Tester",
        category: "diagnostic",
        price: "$59.99",
        description: "Digital tester for checking battery voltage, CCA, and charging system health.",
        brand: "Charge-Check",
        rating: 4.6
    },
    {
        id: 10,
        name: "Engine Hoist",
        category: "lifting",
        price: "$399.99",
        description: "2-ton capacity folding engine hoist for engine removal and installation.",
        brand: "Lift-Master",
        rating: 4.7
    },
    {
        id: 11,
        name: "Pliers Set",
        category: "hand",
        price: "$49.99",
        description: "6-piece pliers set including needle-nose, slip-joint, and locking pliers.",
        brand: "Grip-Pro",
        rating: 4.3
    },
    {
        id: 12,
        name: "Brake Caliper Tool",
        category: "hand",
        price: "$34.99",
        description: "Specialized tool for compressing brake caliper pistons during pad replacement.",
        brand: "Brake-Master",
        rating: 4.6
    },
    {
        id: 13,
        name: "Smoke Test Machine",
        category: "diagnostic",
        price: "$349.99",
        description: "Professional smoke tester for detecting vacuum and EVAP system leaks.",
        brand: "Leak-Pro",
        rating: 4.8
    },
    {
        id: 14,
        name: "Creeper",
        category: "lifting",
        price: "$59.99",
        description: "Comfortable rolling creeper for easy access under vehicles during repairs.",
        brand: "Roll-Ease",
        rating: 4.5
    },
    {
        id: 15,
        name: "Oil Filter Wrench",
        category: "hand",
        price: "$24.99",
        description: "Adjustable strap wrench for easy removal of oil filters in tight spaces.",
        brand: "Filter-Grip",
        rating: 4.4
    },
    {
        id: 16,
        name: "Thermal Imaging Camera",
        category: "diagnostic",
        price: "$449.99",
        description: "Infrared camera for detecting overheating components and electrical issues.",
        brand: "Heat-Scan",
        rating: 4.9
    }
];
