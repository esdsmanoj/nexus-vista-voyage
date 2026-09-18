import { cat, model } from "../build";
import type { ChildCompany } from "../types";

const ACCENT = "#5B8CFF";

export const futuretechCloud: ChildCompany = {
  id: "ft-cloud",
  parentCompanyId: "futuretech-group",
  name: "FutureTech Cloud",
  short: "Cloud",
  accent: ACCENT,
  tagline: "Sovereign infrastructure for workloads that cannot fail",
  description:
    "FutureTech Cloud builds sovereign compute, data and edge platforms for organisations that need hyperscale capability under their own jurisdiction and control.",
  industry: "Cloud Infrastructure",
  displayOrder: 2,
  categories: [
    cat(
      "ft-cloud",
      "ft-cloud-compute",
      "Sovereign Compute",
      "server",
      "Elastic compute fabrics that run inside a customer's chosen legal and physical boundary.",
      1,
      [
        {
          name: "Nimbus Core",
          tagline: "Sovereign elastic compute fabric",
          flagship: true,
          description:
            "A hyperscale-class compute fabric deployed into national or customer-owned data centres, operated with full jurisdictional separation.",
          features: [
            "Bare-metal, VM and container workloads on one fabric",
            "Jurisdiction-pinned scheduling and key custody",
            "Live migration with sub-second freeze time",
            "Capacity reservations with burst overflow",
          ],
          benefits: [
            "Delivers hyperscale elasticity under local law",
            "Removes foreign-operator access from the control plane",
            "Keeps utilisation above 80% through shared burst pools",
          ],
          useCases: [
            "Government digital services",
            "National healthcare platforms",
            "Defence-adjacent industrial workloads",
          ],
          technologies: ["KVM", "Kubernetes", "Ceph", "SPIFFE"],
          specifications: {
            "Region scale": "Up to 120k cores per region",
            "Live migration": "< 800 ms freeze",
            Storage: "NVMe tiered, 9-nines durability",
            Networking: "400 GbE spine, RoCEv2",
            Sovereignty: "Local key custody, local operations",
          },
          model3D: model("stack", ACCENT, [
            [
              "hs-rack",
              "Compute Cell",
              "Standard 48U cell shipping as one preconfigured, pre-certified unit.",
              [0, 1.1, 0.6],
            ],
            [
              "hs-net",
              "Spine Fabric",
              "400 GbE non-blocking spine with RoCEv2 for low-latency east-west traffic.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-keys",
              "Key Custody",
              "Hardware security modules held and rotated exclusively by the local operator.",
              [-1.2, -0.7, 0.5],
            ],
          ]),
        },
        {
          name: "Flux Runtime",
          tagline: "Event-driven serverless runtime",
          description:
            "A serverless runtime with millisecond cold starts and deterministic billing, built for bursty event-driven workloads.",
          features: [
            "Sub-5 ms cold start on WASM isolates",
            "Per-invocation cost visibility",
            "Durable timers and scheduled execution",
            "Language support via WASI components",
          ],
          benefits: [
            "Removes idle capacity from bursty services",
            "Makes serverless cost predictable per feature",
            "Runs identically on-prem and at the edge",
          ],
          useCases: [
            "Webhook and integration processing",
            "IoT telemetry ingestion",
            "Batch document transformation",
          ],
          technologies: ["WebAssembly", "WASI", "Rust", "NATS"],
          specifications: {
            "Cold start": "< 5 ms",
            "Max execution": "15 minutes",
            Concurrency: "1 million isolates per region",
            Languages: "Rust, Go, TypeScript, Python",
            Billing: "Per millisecond, per invocation",
          },
          model3D: model("orbital", ACCENT, [
            [
              "hs-iso",
              "Isolate Pool",
              "Pre-warmed WASM isolates that start in under five milliseconds.",
              [0, 1.2, 0.3],
            ],
            [
              "hs-bus",
              "Event Bus",
              "At-least-once delivery bus with replay and dead-letter routing.",
              [1.25, -0.2, 0.5],
            ],
            [
              "hs-meter",
              "Metering Core",
              "Per-invocation cost attribution surfaced directly to product teams.",
              [-1.2, -0.6, 0.4],
            ],
          ]),
        },
        {
          name: "Atlas Mesh",
          tagline: "Multi-cloud service mesh",
          description:
            "A single control plane for identity, routing and policy across sovereign, public and on-premise estates.",
          features: [
            "Workload identity with automatic mTLS",
            "Cross-cloud traffic policy in one language",
            "Progressive delivery with automatic rollback",
            "Unified golden-signal telemetry",
          ],
          benefits: [
            "Ends per-cloud networking reimplementation",
            "Makes zero-trust the default, not a project",
            "Fails a bad release back automatically",
          ],
          useCases: [
            "Post-merger infrastructure unification",
            "Regulated multi-region failover",
            "Gradual public-to-sovereign migration",
          ],
          technologies: ["Envoy", "SPIFFE", "eBPF", "OpenTelemetry"],
          specifications: {
            "Proxy overhead": "0.4 ms p99",
            Clusters: "500 per control plane",
            Identity: "SPIFFE workload certificates",
            "Policy language": "Declarative, Git-managed",
            Telemetry: "OpenTelemetry native",
          },
          model3D: model("lattice", ACCENT, [
            [
              "hs-id",
              "Identity Plane",
              "Issues short-lived workload certificates to every service automatically.",
              [0, 1.15, 0.4],
            ],
            [
              "hs-route",
              "Routing Plane",
              "One policy grammar applied consistently across every connected estate.",
              [1.3, 0, 0.4],
            ],
            [
              "hs-roll",
              "Release Guard",
              "Watches golden signals during rollout and reverts on regression.",
              [-1.2, -0.65, 0.5],
            ],
          ]),
        },
      ],
    ),
    cat(
      "ft-cloud",
      "ft-cloud-data",
      "Data Platform",
      "database",
      "Storage, streaming and analytics engines built for petabyte-scale regulated data.",
      2,
      [
        {
          name: "Strata Lakehouse",
          tagline: "Governed petabyte lakehouse",
          description:
            "An open-format lakehouse with column-level governance, time travel and query performance close to a dedicated warehouse.",
          features: [
            "Open table formats with no vendor lock-in",
            "Column and row-level access policies",
            "Time travel across 400 days of history",
            "Automatic clustering and compaction",
          ],
          benefits: [
            "Removes duplicate warehouse and lake estates",
            "Lets governance be defined once and enforced everywhere",
            "Keeps query cost flat as data grows",
          ],
          useCases: [
            "Regulatory reporting",
            "Customer 360 analytics",
            "Industrial sensor archives",
          ],
          technologies: ["Apache Iceberg", "Arrow", "Trino", "Parquet"],
          specifications: {
            Scale: "Tested to 40 PB",
            "Query p95": "1.8 s on 10 TB scans",
            "Time travel": "400 days",
            Governance: "Column, row and masking policies",
            Formats: "Iceberg, Delta, Parquet",
          },
          model3D: model("stack", ACCENT, [
            [
              "hs-tier",
              "Storage Tiers",
              "Hot, warm and archive tiers with transparent automatic movement.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-cat",
              "Catalog",
              "Single technical and business catalogue governing every table.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-pol",
              "Policy Engine",
              "Applies masking and row filters at query time, per identity.",
              [-1.25, -0.6, 0.4],
            ],
          ]),
        },
        {
          name: "Pulse Stream",
          tagline: "Exactly-once event backbone",
          description:
            "A durable streaming backbone delivering exactly-once semantics at tens of millions of events per second.",
          features: [
            "Exactly-once producer and consumer semantics",
            "Tiered storage with infinite retention",
            "Schema registry with compatibility gates",
            "Geo-replication with conflict rules",
          ],
          benefits: [
            "Removes duplicate-event reconciliation work",
            "Keeps full event history without cost spikes",
            "Stops breaking schema changes before release",
          ],
          useCases: [
            "Payment event processing",
            "Telemetry ingestion at national scale",
            "Change-data-capture pipelines",
          ],
          technologies: ["Kafka protocol", "Raft", "S3", "Avro"],
          specifications: {
            Throughput: "28M events/sec per cluster",
            Latency: "6 ms p99 produce-to-consume",
            Retention: "Unlimited via tiered storage",
            Semantics: "Exactly-once end to end",
            Replication: "Active-active geo",
          },
          model3D: model("orbital", ACCENT, [
            [
              "hs-part",
              "Partition Ring",
              "Elastic partitions that rebalance without pausing producers.",
              [0, 1.2, 0.3],
            ],
            [
              "hs-tier",
              "Tiered Store",
              "Offloads cold segments to object storage while keeping them queryable.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-schema",
              "Schema Registry",
              "Blocks incompatible schema changes at publish time.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
        {
          name: "Vector Vault",
          tagline: "Billion-scale vector store",
          description:
            "A vector database engineered for billion-embedding corpora with strict tenant isolation and hybrid retrieval.",
          features: [
            "Hybrid dense, sparse and metadata retrieval",
            "Per-tenant encrypted index partitions",
            "Online index rebuilds with no read downtime",
            "Deterministic recall targets per collection",
          ],
          benefits: [
            "Keeps retrieval quality stable as corpora grow",
            "Isolates tenants cryptographically, not by convention",
            "Reindexes without a maintenance window",
          ],
          useCases: [
            "Enterprise knowledge retrieval",
            "Legal discovery",
            "Product similarity search",
          ],
          technologies: ["HNSW", "Rust", "Arrow Flight", "AES-GCM"],
          specifications: {
            Capacity: "8 billion vectors per cluster",
            "Query latency": "11 ms p95 at 1B scale",
            Recall: "Configurable 0.90–0.999",
            Dimensions: "Up to 4,096",
            Isolation: "Per-tenant encryption keys",
          },
          model3D: model("core", ACCENT, [
            [
              "hs-index",
              "Index Graph",
              "Hierarchical navigable graph tuned to an explicit recall target.",
              [0, 1.15, 0.4],
            ],
            [
              "hs-hyb",
              "Hybrid Ranker",
              "Fuses dense, keyword and metadata signals into one ranked result set.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-vault",
              "Tenant Vault",
              "Separate encryption key and index partition for every tenant.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
      ],
    ),
    cat(
      "ft-cloud",
      "ft-cloud-edge",
      "Edge & Networking",
      "radio",
      "Edge compute and private networking for sites far from the nearest data centre.",
      3,
      [
        {
          name: "Halo Edge",
          tagline: "Ruggedised edge compute node",
          description:
            "A sealed edge node that runs the same platform as the core region inside factories, vessels and remote sites.",
          features: [
            "Fanless IP65 sealed chassis",
            "Autonomous operation through 14-day disconnects",
            "GitOps sync when connectivity returns",
            "Hardware root of trust with measured boot",
          ],
          benefits: [
            "Runs the core platform where there is no data centre",
            "Survives long connectivity outages without drift",
            "Makes remote tamper attempts detectable",
          ],
          useCases: [
            "Offshore energy platforms",
            "Remote mining operations",
            "Retail back-of-store compute",
          ],
          technologies: ["K3s", "TPM 2.0", "Flux CD", "Yocto"],
          specifications: {
            Chassis: "IP65, fanless, DIN or rack",
            Compute: "64 cores, 512 GB RAM, 16 TB NVMe",
            Power: "110 W typical, 9–36 V DC",
            Offline: "14 days autonomous",
            Security: "Measured boot, TPM 2.0",
          },
          model3D: model("prism", ACCENT, [
            [
              "hs-chassis",
              "Sealed Chassis",
              "Conduction-cooled enclosure rated for dust, salt fog and vibration.",
              [0, 1.1, 0.5],
            ],
            [
              "hs-sync",
              "Sync Agent",
              "Reconciles configuration and workloads the moment a link returns.",
              [1.25, -0.2, 0.4],
            ],
            [
              "hs-trust",
              "Root of Trust",
              "Measured boot chain that refuses to run unsigned workloads.",
              [-1.2, -0.6, 0.5],
            ],
          ]),
        },
        {
          name: "Relay Private 5G",
          tagline: "Private 5G network in a box",
          description:
            "A self-contained private 5G core and radio package for industrial campuses that need deterministic wireless.",
          features: [
            "Standalone 5G core with local breakout",
            "Network slicing per application class",
            "SIM lifecycle management console",
            "Deterministic latency for control traffic",
          ],
          benefits: [
            "Replaces unreliable industrial Wi-Fi",
            "Guarantees bandwidth for safety-critical traffic",
            "Keeps all subscriber data on site",
          ],
          useCases: [
            "Automated guided vehicle fleets",
            "Port crane control",
            "Campus-wide worker connectivity",
          ],
          technologies: ["3GPP Release 17", "O-RAN", "SR-IOV", "DPDK"],
          specifications: {
            Coverage: "Up to 2 km² per cluster",
            Latency: "8 ms deterministic",
            Devices: "10,000 concurrent",
            Slices: "64 configurable",
            Spectrum: "Licensed and shared bands",
          },
          model3D: model("orbital", ACCENT, [
            [
              "hs-core",
              "5G Core",
              "Standalone core running on site with local data breakout.",
              [0, 1.2, 0.3],
            ],
            [
              "hs-radio",
              "Radio Units",
              "O-RAN compliant radios placed for deterministic campus coverage.",
              [1.3, 0, 0.4],
            ],
            [
              "hs-slice",
              "Slice Manager",
              "Reserves guaranteed bandwidth for safety and control traffic classes.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
        {
          name: "Beacon CDN",
          tagline: "Programmable delivery edge",
          description:
            "A programmable content and API edge that executes customer logic within 20 ms of 94% of the population.",
          features: [
            "Edge functions co-located with cache",
            "Instant global cache invalidation",
            "Origin shielding and request coalescing",
            "Per-route observability",
          ],
          benefits: [
            "Cuts origin traffic by up to 93%",
            "Personalises content without a round trip",
            "Purges stale content in under a second",
          ],
          useCases: [
            "Global media delivery",
            "API acceleration",
            "Regional content compliance",
          ],
          technologies: ["QUIC", "WebAssembly", "Anycast", "Brotli"],
          specifications: {
            "Edge sites": "310 locations",
            "Purge time": "< 900 ms global",
            "Cache hit": "93% typical",
            Protocols: "HTTP/3, QUIC, WebSocket",
            "Function limit": "50 ms CPU per request",
          },
          model3D: model("lattice", ACCENT, [
            [
              "hs-pop",
              "Edge PoPs",
              "310 anycast locations serving both cache and compute.",
              [0, 1.15, 0.4],
            ],
            [
              "hs-fn",
              "Edge Functions",
              "Customer logic executed beside the cache, not behind it.",
              [1.3, -0.1, 0.4],
            ],
            [
              "hs-shield",
              "Origin Shield",
              "Collapses concurrent misses into a single origin fetch.",
              [-1.2, -0.7, 0.4],
            ],
          ]),
        },
      ],
    ),
  ],
};
