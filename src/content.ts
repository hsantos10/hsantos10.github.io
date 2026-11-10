// All page content lives here. App.tsx only renders it.
// links: [label, url] pairs (empty url = hidden). status: grey, non-clickable tag.
// tags: which tab(s) a project shows under — "ml", "robotics", "systems".
// Sources: Resume A (Applied ML, full-time) and Resume C (Robotics & Embedded), Nov 2026.
// GRF numbers follow the current dashboard (0.04–0.19 R²), not the older 0.20–0.30 on the PDFs.

export const HERO = {
  roles: ["Applied ML", "Robotics & perception", "Production ML systems"],
  open: "Open to applied ML and robotics roles · 2027",
};

export const RECENT: { date: string; title: string; text: string; href?: string; cta?: string }[] = [
  { date: "Nov 2026", title: "SciVis Contest honorable mention", text: "ARGUS won an honorable mention at the IEEE SciVis Contest at VIS 2026 in Boston.", href: "https://github.com/hsantos10/argus", cta: "code" },
  { date: "Oct 2026", title: "GRF paper submitted to IEEE JBHI", text: "Thesis Ch1 (Metahuman): subject-held-out evaluation of deep GRF estimators across two laboratories, with a live companion dashboard.", href: "https://seal-app-8zk9f.ondigitalocean.app/", cta: "dashboard" },
  { date: "2026", title: "Smart homecare funded", text: "A $103K grant for a dementia-care digital twin running on 30+ sensors in two houses." },
];

export const STATS = [
  { n: "12 yrs", l: "engineering, from RF to ML" },
  { n: "5", l: "peer-reviewed publications" },
  { n: "$103K", l: "grant-funded digital twin" },
  { n: "400+", l: "buses on an IoT stack I built" },
];

// Cards with a real figure or screenshot come first; the rest are text-only cards.
export const WORK = [
  { kicker: "Thesis Ch3 · robot learning · in preparation", tags: ["ml", "robotics"],
    title: "Who Was Held Out? Embodiment-Held-Out Evaluation of Cross-Embodiment Robot Policies",
    blurb: "An audit of 17 policy papers and a quadrotor testbed. The same policy family scores 53% or 88% depending only on whether the target robot was in training.",
    img: "heldout.jpg", status: ["in prep"] },
  { kicker: "Metahuman · thesis Ch1 · IEEE JBHI, under review", tags: ["ml"],
    title: "Subject-Held-Out Evaluation of Deep Ground Reaction Force Estimators Across Two Laboratories",
    blurb: "Trial-level splits inflate R² by 0.04–0.19 over leave-one-subject-out evaluation. CNN, CNN-LSTM and CNN-Transformer were benchmarked, and none wins in both labs.",
    img: "grf.jpg", links: [["dashboard", "https://seal-app-8zk9f.ondigitalocean.app/"], ["code", "https://github.com/hsantos10/Metahuman_Attention"]], status: ["under review"] },
  { kicker: "IEEE SciVis Contest 2026 · VIS 2026", tags: ["systems"],
    title: "ARGUS: A Live Globe for Petabyte-Scale Climate Data Streaming in Browser and VR",
    blurb: "Streams ECCO ocean, DYAMOND atmosphere and CMIP6 data live from the National Science Data Fabric, reading only the detail each view needs: about 13 MB for a full-globe ocean view instead of ~14 GB. The data is ray-marched on the GPU, and the same globe runs in VR headsets.",
    img: "argus.jpg", links: [["code", "https://github.com/hsantos10/argus"], ["demo", "https://youtu.be/17ChssNaejo"]], status: ["honorable mention"] },
  { kicker: "NSF proposal dashboard · 2026", tags: ["systems"],
    title: "MESACLIP-Viz: 250 Years of Sea Surface Temperature",
    blurb: "CESM ensemble SST from 1850 to 2105, streamed from NCAR and rendered live on the GPU, with point probes and animated presets.",
    img: "mesaclip.jpg" },
  { kicker: "Metahuman · thesis Ch1 · live dashboard", tags: ["ml", "systems"],
    title: "Metahuman GRF Dashboard",
    blurb: "The companion site for the JBHI paper. It replays every held-out trial in 3D with measured and predicted forces side by side, alongside the paper's results and benchmarks.",
    img: "metahuman-dash.jpg", links: [["live", "https://seal-app-8zk9f.ondigitalocean.app/"], ["replay", "https://seal-app-8zk9f.ondigitalocean.app/replay"], ["code", "https://github.com/hsantos10/Metahuman_dashboard"]] },
  { kicker: "Streaming infrastructure · open source", tags: ["systems"],
    title: "Real-Time MQTT → TDengine Streaming Stack",
    blurb: "EMQX brokers take in high-volume device data, and a rule engine writes it to TDengine time-series storage. It also has a REST API and ThingsBoard dashboards, all deployed with Docker Compose.",
    img: "emqx.jpg", links: [["code", "https://github.com/hsantos10/emqx_tdengine"]] },
  { kicker: "Grant-funded ($103K) · lead engineer · 2026", tags: ["systems", "ml"],
    title: "Smart Homecare Digital Twin",
    blurb: "A production IoT digital twin. It has a FastAPI backend on a live Home Assistant WebSocket, a rule engine, and real-time activity inference over 30+ sensors in two houses. Caregivers and admins share one REST contract through a React app and an admin panel.",
    links: [["code", "https://github.com/hsantos10/smart-homecare"]] },
  { kicker: "NIST First Responder UAS Challenge · 2022–23", tags: ["robotics"],
    title: "Multi-Agent 3D Mapping for First Responders",
    blurb: "Two drones map GPS-denied indoor spaces in 3D using ROS, ORB-SLAM3 and IMU/LiDAR/camera fusion on embedded hardware. A decentralized protocol merges their maps in real time.",
    links: [] },
  { kicker: "Open source", tags: ["ml"],
    title: "HOSVD",
    blurb: "Higher-order SVD for multidimensional data analysis and dimensionality reduction.",
    links: [["code", "https://github.com/hsantos10/HOSVD"]] },
];

// Full publication list (ORCID 0009-0005-0113-5067 + Crossref).
export const PUBLICATIONS = [
  { year: 2026, title: "Subject-Held-Out Evaluation of Deep Ground Reaction Force Estimators Across Two Laboratories",
    authors: "H. D. Santos, Y. Chen, Y. Ding, J. Tao, X. Zhang", venue: "IEEE Journal of Biomedical and Health Informatics (under review)",
    links: [["code", "https://github.com/hsantos10/Metahuman_Attention"], ["dashboard", "https://seal-app-8zk9f.ondigitalocean.app/"]] },
  { year: 2025, title: "From Laboratory to Field: Benchmarking Motion Capture Technologies for Offshore Wind Turbine Maintenance Ergonomics",
    authors: "Y. Chen, H. Santos, J. Tao, Y. Ding, X. Zhang", venue: "Proceedings of the Human Factors and Ergonomics Society Annual Meeting",
    links: [["doi", "https://doi.org/10.1177/10711813251357902"]] },
  { year: 2024, title: "Dynamic Data-Driven Digital Twin Testbed for Enhanced First Responder Training and Communication",
    authors: "A. Cassity, H. Le, H. Santos, E. Priest, J. Tao", venue: "DDDAS 2024",
    links: [["arxiv", "https://arxiv.org/abs/2410.14140"], ["pdf", "https://arxiv.org/pdf/2410.14140"]] },
  { year: 2024, title: "Creating a Shared Public Safety Radio Data",
    authors: "S. Chakraborty, H. D. Santos, N. Duffield, et al.", venue: "IEEE World Forum on Public Safety Technology (WFPST)",
    links: [["doi", "https://doi.org/10.1109/WFPST58552.2024.00018"]] },
  { year: 2018, title: "A Dynamic Multi-Layer Self-Healing Algorithm for WSN using Contiki OS",
    authors: "D. Mendez, D. Santos", venue: "International Conference on Electromagnetics in Advanced Applications (ICEAA)",
    links: [["doi", "https://doi.org/10.1109/ICEAA.2018.8520423"]] },
];

// Dates from Resumes A and C (Nov 2026).
export const EXPERIENCE = [
  { title: "Lead Researcher, Applied ML & Systems", org: "Texas A&M University", place: "College Station, TX", date: "Jan 2021 – present",
    blurb: "Leads robotics, digital-twin and applied-ML projects end to end. Built a 5-stage data curation pipeline that unifies sensor data from 6+ physical environments, real-time digital-twin backends (TDengine, EMQX), and multi-agent LLM and RAG pipelines." },
  { title: "Generative AI Ambassador", org: "Texas A&M Institute of Data Science", place: "College Station, TX", date: "Jul 2025 – present",
    blurb: "Teaches workshops on LLM agents, multi-agent orchestration, RAG and MCP tool use to 50+ researchers and engineers. Built a full-stack GenAI education platform." },
  { title: "IoT Consultant", org: "Centre for the Fourth Industrial Revolution", place: "Medellín, Colombia", date: "Jul 2020 – Apr 2021",
    blurb: "Managed 10 pilot projects in IoT, machine learning and blockchain across government and industry stakeholders." },
  { title: "IoT Development Engineer", org: "International Company of Integration", place: "Bogotá, Colombia", date: "Dec 2019 – May 2020",
    blurb: "Built an end-to-end fleet-monitoring system with edge computing and predictive maintenance, raising vehicle availability by 15%+. Wrote the C/C++ and Python firmware for acquisition and MQTT." },
  { title: "Product Design Engineer", org: "IoT Corporation", place: "Bogotá, Colombia", date: "Oct 2018 – Oct 2019",
    blurb: "Led a multidisciplinary team that shipped IoT devices for smart environments, owning hardware-software integration through delivery." },
  { title: "Lecturer, Analog & Digital Systems", org: "Pontificia Universidad Javeriana", place: "Bogotá, Colombia", date: "2015 – 2020",
    blurb: "Taught electronics courses and co-directed undergraduate capstone projects." },
  { title: "Embedded Systems Research Assistant", org: "Javeriana and IHP Microelectronics", place: "Bogotá and Germany", date: "2015 – 2017",
    blurb: "Built a self-healing algorithm for wireless sensor networks and wake-up radio firmware for a custom IHP chip." },
  { title: "RF Engineer", org: "Huawei Technologies", place: "Bogotá, Colombia", date: "2014 – 2015",
    blurb: "Planned and optimized radio networks for large telecom deployments." },
];

export const SKILLS = [
  { group: "GenAI & agents", items: ["Multi-agent LLM workflows", "Model Context Protocol", "RAG / Graph RAG", "LangChain", "Embeddings", "LLM evaluation"] },
  { group: "ML & modeling", items: ["PyTorch", "TensorFlow", "Hugging Face", "scikit-learn", "CNN / LSTM / Transformer", "GNN", "Tucker / HOSVD / DMD"] },
  { group: "Validation", items: ["Leave-one-subject-out", "Out-of-distribution testing", "Data-leakage analysis", "Domain-shift mitigation"] },
  { group: "Robotics & perception", items: ["ROS", "ORB-SLAM3", "IMU / LiDAR / camera fusion", "GPS-denied localization", "Isaac Sim / Isaac Lab"] },
  { group: "Embedded & edge", items: ["C/C++ firmware", "FreeRTOS", "Edge inference", "Real-time acquisition", "MQTT"] },
  { group: "Backend & data", items: ["Python", "FastAPI", "WebSockets", "SQL / SQLite", "EMQX", "TDengine", "Docker Compose", "CI/CD"] },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind", "shadcn/ui", "WebXR"] },
  { group: "Languages", items: ["Spanish (native)", "English (bilingual)", "Portuguese (intermediate)"] },
];

export const EDUCATION = [
  { title: "Ph.D., Electrical Engineering", org: "Texas A&M University", date: "expected 2027",
    blurb: "Dissertation: Closing the Credibility Gap in Physical AI. Coursework in ML, NLP, information retrieval, graph ML, scientific ML and embedded systems co-design." },
  { title: "M.S. and B.S., Electrical Engineering", org: "Pontificia Universidad Javeriana, Bogotá", date: "2017 · 2014",
    blurb: "M.S. thesis on self-healing wireless sensor networks." },
];

export type Item = { kicker?: string; title: string; blurb?: string; img?: string; tags?: string[]; links?: string[][]; status?: string[] }
