import { cat, model } from "../build";
import type { ChildCompany } from "../types";

const ACCENT = "#9D6BFF";

export const futuretechCyberSec: ChildCompany = {
  id: "ft-cybersec",
  parentCompanyId: "futuretech-group",
  name: "FutureTech CyberSec",
  short: "CyberSec",
  accent: ACCENT,
  tagline: "Defence in depth for critical national infrastructure",
  description:
    "FutureTech CyberSec protects identity, operational technology and the software supply chain for organisations whose downtime has public consequences.",
  industry: "Cybersecurity",
  displayOrder: 3,
  categories: [
    cat(
      "ft-cybersec",
      "ft-cybersec-identity",
      "Identity & Access",
      "key",
      "Phishing-resistant identity for workforce, customers and machines.",
      1,
      [
        {
          name: "Ironclad Identity",
          tagline: "Phishing-resistant workforce identity",
          flagship: true,
          description:
            "A passwordless identity platform combining hardware-bound credentials with continuous risk evaluation on every request.",
          features: [
            "FIDO2 hardware-bound credentials only",
            "Continuous session risk scoring",
            "Just-in-time privilege elevation",
            "Break-glass access with dual control",
          ],
          benefits: [
            "Removes credential phishing as an attack path",
            "Ends standing administrative privilege",
            "Shortens access reviews from weeks to hours",
          ],
          useCases: [
            "Critical infrastructure operator access",
            "Financial-services privileged administration",
            "Contractor and third-party access",
          ],
          technologies: ["FIDO2", "WebAuthn", "OIDC", "SCIM"],
          specifications: {
            Authentication: "FIDO2 / WebAuthn only",
            "Risk signals": "42 continuous inputs",
            "Elevation TTL": "5–60 minutes",
            Directories: "AD, Entra, LDAP, SCIM",
            Certification: "FIPS 140-3 Level 3 HSM",
          },
          model3D: model("shield", ACCENT, [
            [
              "hs-cred",
              "Hardware Credential",
              "Private keys generated in and never leaving a certified secure element.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-risk",
              "Risk Engine",
              "Re-evaluates 42 signals on every request, not only at login.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-jit",
              "JIT Elevation",
              "Grants privilege for a bounded window, then revokes it automatically.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
        {
          name: "Vault Zero",
          tagline: "Machine secret custody",
          description:
            "Short-lived credential issuance for workloads, pipelines and devices, with no long-lived secrets anywhere.",
          features: [
            "Secrets issued per workload identity",
            "Default 15-minute credential lifetime",
            "Automatic database credential rotation",
            "Full issuance audit trail",
          ],
          benefits: [
            "Makes leaked secrets expire before use",
            "Removes secrets from config files and pipelines",
            "Answers 'who accessed what' instantly",
          ],
          useCases: [
            "CI/CD pipeline credentials",
            "Database access for microservices",
            "Device provisioning at scale",
          ],
          technologies: ["SPIFFE", "PKCS#11", "Rust", "HSM"],
          specifications: {
            "Issuance rate": "40,000 credentials/sec",
            "Default TTL": "15 minutes",
            Backends: "Postgres, MySQL, Kafka, SSH, PKI",
            "Key storage": "FIPS 140-3 HSM",
            Audit: "Append-only, signed",
          },
          model3D: model("core", ACCENT, [
            [
              "hs-mint",
              "Credential Mint",
              "Issues short-lived credentials bound to an attested workload identity.",
              [0, 1.15, 0.4],
            ],
            [
              "hs-rot",
              "Rotation Engine",
              "Rotates backend credentials continuously without application restarts.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-audit",
              "Audit Ledger",
              "Signed, append-only record of every issuance and use.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
        {
          name: "Perimeter Zero",
          tagline: "Zero-trust network access",
          description:
            "Identity-aware access to internal applications and operational networks with no inbound firewall exposure.",
          features: [
            "Outbound-only connector architecture",
            "Per-application authorisation policy",
            "Session recording for privileged access",
            "Device posture as an access condition",
          ],
          benefits: [
            "Removes VPN concentrators as a target",
            "Limits a compromised device to one application",
            "Provides evidence for every privileged session",
          ],
          useCases: [
            "Remote OT engineering access",
            "Third-party maintenance windows",
            "Merger-period network isolation",
          ],
          technologies: ["WireGuard", "mTLS", "eBPF", "OPA"],
          specifications: {
            "Inbound ports": "Zero required",
            Throughput: "12 Gbps per connector",
            "Session recording": "Optional, per policy",
            "Posture checks": "28 device signals",
            Protocols: "TCP, UDP, RDP, SSH, ICS",
          },
          model3D: model("shield", ACCENT, [
            [
              "hs-conn",
              "Outbound Connector",
              "Dials out to the plane, so no inbound port is ever exposed.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-pol",
              "Policy Point",
              "Authorises each connection against identity, device and context.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-rec",
              "Session Recorder",
              "Captures privileged sessions for later review and evidence.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
      ],
    ),
    cat(
      "ft-cybersec",
      "ft-cybersec-ot",
      "OT & Critical Systems",
      "factory",
      "Monitoring and containment for industrial control environments.",
      2,
      [
        {
          name: "Grid Sentinel",
          tagline: "Passive OT threat monitoring",
          description:
            "Passive deep-packet inspection of industrial protocols that maps every asset and flags unsafe control commands.",
          features: [
            "Passive asset discovery with zero traffic injection",
            "70+ industrial protocol decoders",
            "Unsafe command-sequence detection",
            "Segmentation drift alerting",
          ],
          benefits: [
            "Builds an accurate OT asset inventory without risk",
            "Catches unsafe commands before they reach a PLC",
            "Proves segmentation is still intact",
          ],
          useCases: [
            "Electricity transmission substations",
            "Water treatment plants",
            "Rail signalling networks",
          ],
          technologies: ["DPI", "Modbus", "IEC 61850", "DNP3"],
          specifications: {
            Protocols: "70+ OT and ICS decoders",
            Deployment: "Passive TAP or SPAN",
            Throughput: "20 Gbps per sensor",
            Detection: "Signature, behavioural and sequence",
            Standards: "IEC 62443 aligned",
          },
          model3D: model("lattice", ACCENT, [
            [
              "hs-tap",
              "Passive Tap",
              "Read-only capture that cannot introduce traffic into a live process network.",
              [0, 1.15, 0.4],
            ],
            [
              "hs-dpi",
              "Protocol Decoder",
              "Decodes industrial protocols down to individual control commands.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-seq",
              "Sequence Guard",
              "Flags command orders that are individually valid but jointly unsafe.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
        {
          name: "Breaker Response",
          tagline: "Automated containment orchestration",
          description:
            "Turns detections into pre-approved, reversible containment actions executed within seconds of a confirmed incident.",
          features: [
            "Pre-approved containment playbooks",
            "Reversible actions with single-click rollback",
            "Safety interlocks for process-critical assets",
            "Post-incident timeline reconstruction",
          ],
          benefits: [
            "Reduces containment time from hours to seconds",
            "Prevents automation from stopping safe production",
            "Produces a regulator-ready incident record",
          ],
          useCases: [
            "Ransomware lateral-movement containment",
            "Compromised engineering workstation isolation",
            "Supplier-network incident response",
          ],
          technologies: ["SOAR", "Temporal", "Rust", "STIX"],
          specifications: {
            "Containment time": "< 6 seconds",
            Playbooks: "90 prebuilt, unlimited custom",
            Interlocks: "Per-asset safety rules",
            Integrations: "48 security and OT systems",
            Rollback: "Full, single action",
          },
          model3D: model("prism", ACCENT, [
            [
              "hs-play",
              "Playbook Engine",
              "Executes only actions that were approved and rehearsed in advance.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-lock",
              "Safety Interlock",
              "Blocks containment actions that would endanger a live physical process.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-time",
              "Timeline Builder",
              "Reconstructs the incident minute by minute for reporting.",
              [-1.2, -0.6, 0.4],
            ],
          ]),
        },
        {
          name: "Faraday Twin",
          tagline: "Cyber range digital twin",
          description:
            "A high-fidelity digital twin of an operational environment for rehearsing attacks and response without touching production.",
          features: [
            "Protocol-accurate simulated PLCs and RTUs",
            "Scripted adversary emulation campaigns",
            "Blue-team scoring and after-action reports",
            "Twin cloned directly from live asset inventory",
          ],
          benefits: [
            "Trains responders on their own environment",
            "Validates playbooks before a real incident",
            "Quantifies readiness with repeatable scores",
          ],
          useCases: [
            "Regulatory exercise requirements",
            "New-hire OT security onboarding",
            "Vendor patch validation",
          ],
          technologies: ["QEMU", "MITRE ATT&CK", "Terraform", "gRPC"],
          specifications: {
            "Twin scale": "5,000 simulated assets",
            Fidelity: "Protocol-accurate ICS emulation",
            Campaigns: "120 ATT&CK-mapped scenarios",
            "Spin-up": "18 minutes for a full twin",
            Reporting: "Automated after-action packs",
          },
          model3D: model("stack", ACCENT, [
            [
              "hs-clone",
              "Inventory Clone",
              "Builds the twin directly from the live discovered asset inventory.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-adv",
              "Adversary Engine",
              "Runs ATT&CK-mapped campaigns against the simulated estate.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-score",
              "Readiness Score",
              "Measures detection and response performance across repeated exercises.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
      ],
    ),
    cat(
      "ft-cybersec",
      "ft-cybersec-supply",
      "Software Supply Chain",
      "package",
      "Provenance, attestation and runtime integrity for everything you ship.",
      3,
      [
        {
          name: "Provenance Chain",
          tagline: "Build attestation and SBOM ledger",
          description:
            "Signs every build artefact with verifiable provenance and keeps a queryable ledger of what shipped where.",
          features: [
            "SLSA Level 3 build attestation",
            "Automatic SBOM generation per artefact",
            "Policy gates on deployment admission",
            "Retroactive vulnerability impact queries",
          ],
          benefits: [
            "Answers 'is this artefact ours' with proof",
            "Turns a new CVE into a two-minute impact answer",
            "Blocks unattested artefacts from production",
          ],
          useCases: [
            "Regulated software release management",
            "Vendor artefact verification",
            "Incident impact scoping",
          ],
          technologies: ["Sigstore", "in-toto", "CycloneDX", "Rekor"],
          specifications: {
            "Attestation level": "SLSA L3",
            "SBOM formats": "CycloneDX, SPDX",
            "Ledger retention": "10 years",
            "Query latency": "< 2 s across all artefacts",
            Admission: "Kubernetes and VM gates",
          },
          model3D: model("lattice", ACCENT, [
            [
              "hs-sign",
              "Signing Authority",
              "Keyless signing tied to the verified identity of the build workflow.",
              [0, 1.15, 0.4],
            ],
            [
              "hs-sbom",
              "SBOM Generator",
              "Captures the full dependency graph at build time, not by scanning later.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-gate",
              "Admission Gate",
              "Refuses to deploy artefacts without a valid provenance chain.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
        {
          name: "Runtime Integrity",
          tagline: "Kernel-level workload assurance",
          description:
            "eBPF-based runtime monitoring that detects when a running workload diverges from its attested build.",
          features: [
            "Process and syscall baselining per workload",
            "Binary drift detection against attestation",
            "Container escape detection",
            "Sub-1% CPU overhead",
          ],
          benefits: [
            "Catches tampering that scanning misses",
            "Links a runtime alert to the exact build that shipped",
            "Runs on production without measurable slowdown",
          ],
          useCases: [
            "Production workload assurance",
            "PCI and regulated runtime controls",
            "Post-breach containment verification",
          ],
          technologies: ["eBPF", "Rust", "Falco rules", "gRPC"],
          specifications: {
            Overhead: "< 1% CPU",
            "Kernel support": "5.10 and newer",
            Detections: "340 behavioural rules",
            "Alert latency": "< 500 ms",
            Coverage: "Containers, VMs, bare metal",
          },
          model3D: model("shield", ACCENT, [
            [
              "hs-probe",
              "Kernel Probes",
              "eBPF programs observing syscalls without modifying the kernel.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-base",
              "Behaviour Baseline",
              "Learned normal profile for each workload identity.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-link",
              "Build Linkage",
              "Maps any runtime anomaly back to its originating build and commit.",
              [-1.2, -0.65, 0.4],
            ],
          ]),
        },
        {
          name: "Dependency Radar",
          tagline: "Upstream risk intelligence",
          description:
            "Continuously assesses the health, ownership and behaviour of every upstream dependency an organisation consumes.",
          features: [
            "Maintainer and ownership change alerts",
            "Malicious-package behavioural detection",
            "Licence and jurisdiction risk flags",
            "Curated internal package mirror",
          ],
          benefits: [
            "Catches supply-chain takeovers early",
            "Stops risky packages before first install",
            "Gives legal a live licence position",
          ],
          useCases: [
            "Open-source governance programmes",
            "Regulated dependency approval",
            "Merger software due diligence",
          ],
          technologies: ["OSV", "Rust", "ClickHouse", "OCI registry"],
          specifications: {
            Ecosystems: "12 package ecosystems",
            "Feed latency": "< 10 minutes from publish",
            "Risk signals": "36 per package",
            Mirror: "Air-gap capable",
            Policy: "Allow, warn or block per rule",
          },
          model3D: model("orbital", ACCENT, [
            [
              "hs-feed",
              "Ecosystem Feed",
              "Ingests new releases across twelve ecosystems within ten minutes.",
              [0, 1.2, 0.3],
            ],
            [
              "hs-behav",
              "Behaviour Sandbox",
              "Detonates install scripts in isolation to reveal malicious behaviour.",
              [1.3, 0, 0.4],
            ],
            [
              "hs-mirror",
              "Curated Mirror",
              "Serves only reviewed package versions to internal builds.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
      ],
    ),
  ],
};
