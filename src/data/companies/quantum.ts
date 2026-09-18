import { cat, model } from "../build";
import type { ChildCompany } from "../types";

const ACCENT = "#36F0B0";

export const futuretechQuantum: ChildCompany = {
  id: "ft-quantum",
  parentCompanyId: "futuretech-group",
  name: "FutureTech Quantum",
  short: "Quantum",
  accent: ACCENT,
  tagline: "Quantum systems and robotics for the physical frontier",
  description:
    "FutureTech Quantum builds quantum computing hardware, quantum-safe communications and advanced robotics for research institutions and industrial pioneers.",
  industry: "Quantum & Robotics",
  displayOrder: 4,
  categories: [
    cat(
      "ft-quantum",
      "ft-quantum-compute",
      "Quantum Computing",
      "atom",
      "Superconducting quantum processors, control stacks and hybrid runtimes.",
      1,
      [
        {
          name: "Qubit Forge Q1",
          tagline: "Superconducting quantum processing unit",
          flagship: true,
          description:
            "A 512-qubit superconducting processor with tunable couplers, delivered as a complete cryogenic system with its own control stack.",
          features: [
            "512 tunable transmon qubits",
            "Median two-qubit fidelity of 99.7%",
            "Integrated dilution refrigeration",
            "Real-time mid-circuit measurement",
          ],
          benefits: [
            "Gives research teams dedicated, uncontended access",
            "Supports error-mitigated algorithms today",
            "Ships as one commissioned system, not parts",
          ],
          useCases: [
            "Materials and catalyst simulation",
            "Portfolio optimisation research",
            "Quantum error-correction research",
          ],
          technologies: ["Transmon qubits", "Josephson junctions", "FPGA control", "OpenQASM 3"],
          specifications: {
            Qubits: "512 tunable transmons",
            "2Q fidelity": "99.7% median",
            "T1 coherence": "320 µs median",
            "Base temperature": "9 mK",
            "Gate time": "38 ns two-qubit",
          },
          model3D: model(
            "core",
            ACCENT,
            [
              [
                "hs-chip",
                "Quantum Processor",
                "512-qubit superconducting die with tunable couplers on a silicon substrate.",
                [0, 1.1, 0.5],
              ],
              [
                "hs-cryo",
                "Cryogenic Stages",
                "Six-stage dilution refrigerator bringing the processor to 9 millikelvin.",
                [1.25, -0.2, 0.4],
              ],
              [
                "hs-ctrl",
                "Control Electronics",
                "FPGA pulse generation with real-time feedback for mid-circuit measurement.",
                [-1.2, -0.7, 0.4],
              ],
            ],
            0.3,
          ),
        },
        {
          name: "Cryo Control Stack",
          tagline: "Qubit control and calibration system",
          description:
            "The room-temperature control layer that generates, shapes and calibrates the microwave pulses driving a quantum processor.",
          features: [
            "Per-qubit arbitrary waveform generation",
            "Autonomous overnight recalibration",
            "Sub-nanosecond channel synchronisation",
            "Open pulse-level programming interface",
          ],
          benefits: [
            "Holds fidelity stable between experiments",
            "Frees researchers from manual tuning",
            "Opens pulse-level control to external teams",
          ],
          useCases: [
            "Academic quantum laboratories",
            "Qubit characterisation research",
            "Custom gate development",
          ],
          technologies: ["RFSoC", "FPGA", "Python SDK", "OpenPulse"],
          specifications: {
            Channels: "1,024 analogue channels",
            "Sample rate": "9.8 GSa/s",
            Synchronisation: "< 0.4 ns skew",
            Calibration: "Autonomous, nightly",
            Interface: "Pulse-level Python SDK",
          },
          model3D: model("stack", ACCENT, [
            [
              "hs-awg",
              "Waveform Generators",
              "Independent arbitrary waveform channels, one per qubit drive line.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-sync",
              "Sync Backplane",
              "Distributes a common clock with sub-nanosecond skew across all channels.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-cal",
              "Calibration Daemon",
              "Runs characterisation routines overnight and republishes gate parameters.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
        {
          name: "Entangle Cloud",
          tagline: "Hybrid quantum-classical runtime",
          description:
            "A scheduling and execution service that interleaves quantum circuits with classical compute in a single job graph.",
          features: [
            "Hybrid job graphs with tight iteration loops",
            "Circuit transpilation to device topology",
            "Error mitigation applied automatically",
            "Fair-share scheduling across research groups",
          ],
          benefits: [
            "Removes queue round-trips from variational loops",
            "Gets better results from the same hardware",
            "Shares scarce quantum time fairly",
          ],
          useCases: [
            "Variational algorithm research",
            "Quantum machine-learning experiments",
            "Multi-institution shared access",
          ],
          technologies: ["Qiskit", "Kubernetes", "gRPC", "OpenQASM 3"],
          specifications: {
            "Job latency": "< 120 ms quantum-classical round trip",
            Backends: "QPU, simulator, hybrid",
            Mitigation: "ZNE, readout, dynamic decoupling",
            Scheduling: "Fair-share with reservations",
            "Simulator scale": "42 qubits statevector",
          },
          model3D: model("orbital", ACCENT, [
            [
              "hs-sched",
              "Hybrid Scheduler",
              "Keeps classical optimisers resident between quantum shots.",
              [0, 1.2, 0.3],
            ],
            [
              "hs-trans",
              "Transpiler",
              "Maps logical circuits onto the physical qubit topology and calibration state.",
              [1.3, 0, 0.4],
            ],
            [
              "hs-mit",
              "Mitigation Layer",
              "Applies error mitigation techniques without changing user code.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
      ],
    ),
    cat(
      "ft-quantum",
      "ft-quantum-secure",
      "Quantum-Safe Communications",
      "lock",
      "Post-quantum cryptography and quantum key distribution for long-lived secrets.",
      2,
      [
        {
          name: "Lattice Shield PQC",
          tagline: "Post-quantum cryptography gateway",
          description:
            "An inline gateway that upgrades existing TLS and VPN traffic to hybrid post-quantum key exchange without touching applications.",
          features: [
            "Hybrid classical and ML-KEM key exchange",
            "Transparent inline upgrade of existing traffic",
            "Crypto inventory of every observed session",
            "Staged migration with per-route policy",
          ],
          benefits: [
            "Defends today's traffic against future decryption",
            "Requires no application rewrites",
            "Shows exactly which traffic is still vulnerable",
          ],
          useCases: [
            "Government long-term confidentiality",
            "Financial-settlement links",
            "Healthcare record transport",
          ],
          technologies: ["ML-KEM", "ML-DSA", "TLS 1.3", "Rust"],
          specifications: {
            Algorithms: "ML-KEM-1024, ML-DSA-87, hybrid X25519",
            Throughput: "40 Gbps per appliance",
            "Added latency": "0.9 ms",
            Standards: "NIST FIPS 203/204",
            Inventory: "Full session crypto reporting",
          },
          model3D: model("shield", ACCENT, [
            [
              "hs-kex",
              "Hybrid Key Exchange",
              "Combines a classical and a lattice-based exchange so both must be broken.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-inline",
              "Inline Upgrade",
              "Terminates and re-establishes sessions transparently to applications.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-inv",
              "Crypto Inventory",
              "Records the algorithm posture of every session for migration planning.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
        {
          name: "Photon Link QKD",
          tagline: "Quantum key distribution link",
          description:
            "A fibre quantum key distribution system that detects eavesdropping physically rather than computationally.",
          features: [
            "Decoy-state BB84 protocol",
            "Continuous secure key generation",
            "Eavesdropping detection through error rate",
            "Integration with standard key managers",
          ],
          benefits: [
            "Bases confidentiality on physics, not assumptions",
            "Detects interception attempts in real time",
            "Feeds keys into existing encryption estates",
          ],
          useCases: [
            "Inter-data-centre trunk encryption",
            "Central bank settlement links",
            "Defence communications backbones",
          ],
          technologies: ["BB84", "SNSPD", "DWDM", "KMIP"],
          specifications: {
            "Key rate": "3.2 Mbps at 50 km",
            "Max distance": "140 km fibre",
            "QBER threshold": "< 3%",
            Interface: "KMIP, ETSI QKD 014",
            Rack: "4U per node pair",
          },
          model3D: model("prism", ACCENT, [
            [
              "hs-src",
              "Photon Source",
              "Attenuated laser source producing decoy-state single-photon pulses.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-det",
              "Detector Array",
              "Superconducting nanowire detectors with picosecond timing resolution.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-sift",
              "Sifting Engine",
              "Distils a shared secret key and measures the error rate for tampering.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
        {
          name: "Chrono Sync",
          tagline: "Quantum-grade timing distribution",
          description:
            "Distributes traceable sub-nanosecond time across a network for systems where ordering is legally significant.",
          features: [
            "Optically pumped rubidium holdover",
            "White Rabbit precision distribution",
            "GNSS spoofing detection",
            "Signed, traceable time audit records",
          ],
          benefits: [
            "Keeps transaction ordering provable",
            "Survives 30 days without satellite signal",
            "Detects timing attacks before they distort records",
          ],
          useCases: [
            "Financial trade timestamping",
            "Power-grid phasor measurement",
            "Distributed database ordering",
          ],
          technologies: ["White Rabbit", "PTP", "Rubidium oscillator", "GNSS"],
          specifications: {
            Accuracy: "< 250 ps to UTC",
            Holdover: "30 days within 1 µs",
            Distribution: "White Rabbit, PTP, NTP",
            Ports: "32 fibre outputs",
            Compliance: "MiFID II RTS 25",
          },
          model3D: model("core", ACCENT, [
            [
              "hs-osc",
              "Reference Oscillator",
              "Rubidium reference maintaining accuracy through long GNSS outages.",
              [0, 1.15, 0.4],
            ],
            [
              "hs-dist",
              "Distribution Fabric",
              "Compensates fibre delay per port to keep every endpoint aligned.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-spoof",
              "Spoof Detector",
              "Cross-checks satellite time against the local reference to catch attacks.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
      ],
    ),
    cat(
      "ft-quantum",
      "ft-quantum-robotics",
      "Advanced Robotics",
      "cpu",
      "Autonomous manipulators, inspection platforms and human-safe collaboration systems.",
      3,
      [
        {
          name: "Helix Manipulator",
          tagline: "Seven-axis collaborative arm",
          description:
            "A force-controlled seven-axis arm designed for precision assembly alongside human operators.",
          features: [
            "Torque sensing in every joint",
            "Hand-guided teaching with no code",
            "Sub-30 micron repeatability",
            "Certified safe force limiting",
          ],
          benefits: [
            "Deploys without safety cages",
            "Retasks in minutes instead of days",
            "Handles delicate assembly humans find fatiguing",
          ],
          useCases: [
            "Precision electronics assembly",
            "Laboratory sample handling",
            "Optical component alignment",
          ],
          technologies: ["Harmonic drives", "ROS 2", "EtherCAT", "ISO/TS 15066"],
          specifications: {
            Axes: "7 degrees of freedom",
            Payload: "14 kg",
            Reach: "1,240 mm",
            Repeatability: "± 0.03 mm",
            Safety: "ISO/TS 15066 force limited",
          },
          model3D: model("lattice", ACCENT, [
            [
              "hs-joint",
              "Torque Joints",
              "Every joint senses torque, enabling compliant contact with people and parts.",
              [0, 1.15, 0.4],
            ],
            [
              "hs-tool",
              "Tool Flange",
              "Standard flange with integrated power, EtherCAT and pneumatic pass-through.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-teach",
              "Teach Mode",
              "Hand-guided programming that records waypoints without writing code.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
        {
          name: "Kestrel Inspector",
          tagline: "Autonomous inspection platform",
          description:
            "An autonomous ground and aerial inspection platform that repeats survey missions to millimetre-level consistency.",
          features: [
            "Repeatable autonomous survey missions",
            "Millimetre change detection between runs",
            "Thermal, visual and acoustic payloads",
            "Automatic defect ticketing",
          ],
          benefits: [
            "Replaces risky manual inspection climbs",
            "Detects change no human eye would notice",
            "Creates a continuous asset condition record",
          ],
          useCases: [
            "Refinery and tank inspection",
            "Bridge and structural survey",
            "Substation thermal patrols",
          ],
          technologies: ["SLAM", "ROS 2", "Photogrammetry", "LoRaWAN"],
          specifications: {
            Endurance: "4.5 hours per charge",
            "Positioning accuracy": "± 8 mm repeat",
            Payloads: "Visual 61 MP, thermal, acoustic",
            Ingress: "IP66, ATEX Zone 2 option",
            Autonomy: "Fully autonomous missions",
          },
          model3D: model("prism", ACCENT, [
            [
              "hs-nav",
              "Navigation Core",
              "SLAM navigation that repeats a survey path to within eight millimetres.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-pay",
              "Payload Bay",
              "Hot-swappable visual, thermal and acoustic sensor modules.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-diff",
              "Change Engine",
              "Compares each survey with the previous one and raises defect tickets.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
        {
          name: "Atlas Cell",
          tagline: "Reconfigurable robotic work cell",
          description:
            "A pre-engineered robotic cell that can be reconfigured for a new process through software rather than mechanical rework.",
          features: [
            "Software-defined process recipes",
            "Modular fixture and tooling rails",
            "Integrated vision-guided picking",
            "Simulation-first commissioning",
          ],
          benefits: [
            "Changes product lines in hours, not weeks",
            "Validates the whole cell before it is built",
            "Reuses capital equipment across programmes",
          ],
          useCases: [
            "High-mix low-volume manufacturing",
            "Battery module assembly",
            "Contract manufacturing lines",
          ],
          technologies: ["Digital twin", "OPC UA", "ROS 2", "EtherCAT"],
          specifications: {
            Footprint: "3.2 × 3.2 m standard cell",
            Changeover: "Under 4 hours",
            Robots: "Up to 4 arms per cell",
            "Cycle rate": "Application dependent, 6 s typical",
            Commissioning: "Simulation validated",
          },
          model3D: model("stack", ACCENT, [
            [
              "hs-rail",
              "Fixture Rails",
              "Standard rails that accept tooling modules without mechanical redesign.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-vis",
              "Vision Guidance",
              "Locates parts presented in any orientation and guides the pick.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-sim",
              "Twin Commissioning",
              "Full cell simulated and cycle-time validated before installation.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
      ],
    ),
  ],
};
