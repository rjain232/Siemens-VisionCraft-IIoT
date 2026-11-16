# RITWIK JAIN
**IoT Systems Developer | OT-IT Solutions & Industrial Edge Architect**  
Pune, Maharashtra, India | +91 8310479148 | ritwikjain232@gmail.com | [LinkedIn Profile](https://linkedin.com/in/)

---

### PROFESSIONAL SUMMARY
**IoT Systems Developer & OT-IT Solutions Engineer** with a foundational degree in **Electrical & Electronics Engineering (B.Tech EEE, PES University)** and 4+ years of cross-functional engineering experience spanning shop-floor industrial automation, edge middleware development, and high-reliability enterprise backend systems.

Currently working as an **IIoT System Developer at Schaeffler India**, architecting and deploying Level 1.5 edge data acquisition pipelines across **48 Siemens S7-1500 PLCs**, 16 UHF RFID tracking gates, Cognex barcode scanners, and Modbus energy meters for a high-cadence **51 JPH automotive Body-in-White (BIW) production line (JSW / Comau ecosystem)**. Proven expertise in replacing unstable visual flow tools (Node-RED) with production-grade **Node.js microservices**, **Aedes MQTT**, and **WebSocket engines**, delivering sub-second SCADA latency and auditable store-and-forward edge buffering for **Scope 1 & 2 carbon accounting (ESG)** and component genealogy. Solid engineering progression beginning with PLC/SCADA commissioning at **Adarsha Control Systems (Schneider Electric Partner)**, 3 years at **Light & Wonder** mastering QA automation, hardware test labs, and connected embedded devices, and enterprise API reliability at **Intermedia**.

---

### TECHNICAL SKILLS

* **Industrial Protocols & Fieldbuses:** Siemens S7comm (`nodes7`), Siemens S7-1500 Web API (JSON-RPC 2.0 / OpenES), OPC UA (`node-opcua`), Modbus RTU/TCP, Profinet, Ethernet/IP, MQTT (TLS 8883, QoS 0/1/2), WebSockets (RFC 6455).
* **Industrial Hardware & Gateways:** Siemens S7-1517F / S7-1500, Schneider Electric Modicon M580 (X80 I/O), Ewon Flexy 205 IIoT Gateway, Turck/Balluff UHF RFID Readers, Cognex DataMan / Keyence Barcode Scanners, Socomec DIRIS & Schneider PM5000 Energy Meters, Hirschmann/Cisco Industrial Switches.
* **Software Development & Backend:** Node.js (Express 5), Python (FastAPI, PyModbus, pytest), JavaScript, Aedes MQTT Broker, PM2 Process Manager, Socket.io / `ws`, REST APIs, SOAP API, Graph API, Docker.
* **Databases & Time-Series Data:** InfluxDB (TSM Engine, Time-Series Telemetry), Microsoft SQL Server (Stored Procedures, `dbo.app_Part_Marriage`, Line Genealogy), Azure SQL, SQLite (Edge Buffering), PostgreSQL, Redis.
* **SCADA, MES & Visualization:** Custom Web SCADA / HMI, Citect SCADA, Dürr DXQcontrol (DAS/DBS/WES/IFS), Kneo MAPP Platform (Level 1.5), Grafana, React.js, Vite, 21 Andon Board Driver Architecture.
* **Process Instrumentation & Field Devices:** Inductive/Capacitive Proximity Sensors, Photoelectric Sensors, Flow/Level Sensors, Pressure Transmitters, Optical Gating Arrays, EMC 360° Shielding.
* **DevOps, Observability & Reliability:** Azure DevOps, Octopus Deploy, CI/CD, GitHub Actions, Jenkins, Python Sentry SDK, Graylog Centralized Logging, Tenable Security Scanner, ISA-95 (Purdue Model) OT-IT Segregation.

---

### PROFESSIONAL EXPERIENCE

#### **IIoT System Developer** | Schaeffler India
*Pune, India & Client Manufacturing Plants* | **30 June 2025 – Present**
* **High-Speed Automotive Line Integration (51 JPH):** Architected and deployed the Level 1.5 Edge Ingestion Layer bridging **48 Siemens S7-1500 PLCs** (47 Line PLCs + 1 Master PLC) across **26 Network Clusters** to central SCADA and MES systems for J5 & V23 vehicle platforms (11 variants) within a strict 58-second cycle time window.
* **Protocol Bridging & Microservice Architecture:** Engineered high-concurrency Node.js microservices utilizing native **S7comm (`nodes7`)**, **OPC UA**, and **Siemens S7-1500 Web API (JSON-RPC 2.0)**; eliminated thread-blocking and memory crash bottlenecks previously encountered in Node-RED during multi-PLC burst traffic.
* **Store-and-Forward Edge Buffering (Ewon Flexy 205 & IPCs):** Programmed on-device BASIC scripts and local SQLite circular buffers on Ewon Flexy 205 gateways, guaranteeing **zero data loss** for auditable Scope 1 & 2 carbon calculations and shift production reports during factory WAN/LTE network dropouts.
* **Low-Latency SCADA & Andon Broadcasting:** Developed a real-time WebSocket telemetry engine (`ws` port 5051) and embedded Aedes MQTT broker; implemented analog deadband filtering (2% threshold) and state-transition triggers, reducing operator terminal DOM CPU load from 90% to $< 12\%$ while driving **21 plant-floor Andon displays**.
* **Part Marriage & Component Traceability:** Implemented automated component marriage logic interfacing fixed Cognex barcode scanners and Balluff UHF RFID skid pucks with MS SQL Server (`dbo.app_Part_Marriage`), ensuring verified recipe interlocking before robotic spot-welding cycle authorization.
* **On-Site Comau Shop-Floor Trials (7 Days):** Directly conducted on-site commissioning at Comau’s facility; diagnosed and resolved high-frequency electromagnetic interference (EMI) induced by 15,000A MFDC welding guns through Cat6A S/FTP shielding, 360° EMC grounding, and RS-485 termination resistors.
* **Energy & Sustainability Monitoring:** Integrated Socomec and Schneider energy meters over RS-485 Modbus RTU into InfluxDB, enabling sub-second tracking of instantaneous active power ($kW$) and cumulative energy ($kWh$) to compute real-time Product Carbon Footprint (PCF) per welded car body.

#### **SDET / Software Systems Engineer (Contract via SpringCT)** | Intermedia
*Pune, India* | **Jul 2024 – Jun 2025**
* **Enterprise API & Integration Reliability:** Architected and validated Graph API and SOAP API client communication flows for high-availability enterprise provisioning and security workflows.
* **Distributed Observability & Telemetry:** Integrated Python Sentry SDK and Graylog centralized log analysis into distributed services, reducing defect triage time and diagnosing network routing and timeout exceptions across environments.
* **Deployment Automation:** Managed deployment pipelines and environment release validation using Octopus Deploy and Azure DevOps across DEV, QA, and PROD tiers.
* **Network Reliability & Retry Strategies:** Engineered resilient retry strategies, exponential backoff, and socket timeout handling for enterprise network routing scenarios.

#### **Software Quality Assurance Engineer (QA & Connected Devices / IIoT)** | Light & Wonder India
*Bengaluru, India* | **Oct 2021 – Jul 2024 (Exact 3 Years)**
* **System Integration Lab (SIL) & Hardware Testing:** Managed and configured physical integration test labs replicating distributed client/server architectures, network switches, serial interfaces, and embedded gaming terminals (iView hardware).
* **Hardware-to-Software Protocol Validation:** Validated communication protocols and data exchange between proprietary hardware devices, slot machines, controllers, and backend host systems using serial communication, TCP/IP sockets, and REST/SOAP APIs.
* **API & Database Validation:** Designed and executed automated REST/SOAP API testing suites using Postman and SoapUI; wrote complex SQL queries against MS SQL Server to validate transactional consistency, state transitions, and real-time event logs.
* **Test Automation Frameworks:** Automated regression test suites across 5+ enterprise applications using Python, Selenium, and pytest, reducing test cycle duration by 40% through multi-threaded parallel execution.
* **Security & Vulnerability Remediation:** Audited server infrastructure and resolved critical security vulnerabilities using PowerShell scripts and Tenable Scanner; earned early career promotion within 1.5 years for technical excellence.

#### **Industrial Automation Engineering Intern** | Adarsha Control Systems (Schneider Electric Partner)
*Bengaluru, India* | **Jan 2021 – Mar 2021**
* **PLC Hardware & Programming:** Programmed **Schneider Electric Modicon M580 PLCs** (BME XBP redundant backplane, BMX DDI 3202K digital inputs, BMX DDO 3202K digital outputs, BMX AMI/AMO analog modules) using **EcoStruxure Control Expert (Unity Pro)** in Function Block Diagram (FBD) and Ladder Logic.
* **SCADA & HMI Development:** Designed and commissioned operator screens in **Citect SCADA**, establishing memory address tags, alarm trip thresholds, and real-time conveyor animation mimics.
* **Automated Conveyor & Process Control:** Commissioned automated multi-stage conveyor systems integrating inductive proximity sensors, optical sensors, spray solenoids, and motor drives; validated field I/O wiring and electrical schematics.

---

### KEY PROJECTS

#### **Automated BIW Level 1.5 Edge Middleware & Real-Time Digital Twin (Schaeffler / JSW Project)**
* *Stack:* Node.js, Express 5, nodes7, Aedes MQTT, InfluxDB, MS SQL Server, WebSockets, Docker, PM2.
* Built a modular microservice suite reading live tag arrays from Siemens S7-1500 DB blocks (`DB1`, `DB100`), persisting sub-second electrical and cycle telemetry to InfluxDB, and pushing live state transitions to browser-based 2D SVG layout mimics.
* Designed a 5-minute in-memory caching layer for VIN-to-part marriage lookups, handling conveyor skid jitter and multi-tag sensor cross-reads without degrading SQL Server transaction throughput.

#### **Industrial ESG & Scope 2 Automated Carbon Accounting Engine**
* *Stack:* Ewon Flexy 205, Modbus RTU/TCP, InfluxDB, Python, Grafana, MQTT over TLS.
* Created an autonomous edge-to-cloud carbon reporting pipeline capturing active power ($kW$) and total $kWh$ across 12 Welding Distribution Panels (WDP).
* Implemented dynamic carbon emission factor matrix calculations mapping instantaneous line energy directly to individual vehicle serial numbers (VINs) for EU CBAM and BRSR statutory compliance.

#### **Automated Code Standards Validation Utility (Hackathon Winner)**
* *Stack:* Python, pytest, regex, HTML/CSS/JavaScript, AJAX.
* Developed a dynamic standards-validation utility for multi-language codebases (Python, Java, RPGLE), reducing manual code review effort by ~60%.

---

### EDUCATION
* **Bachelor of Technology (B.Tech) in Electrical and Electronics Engineering (EEE)**  
  **PES University, Bengaluru** | *2017 – 2021*

---

### CERTIFICATIONS & CORPORATE TRAININGS
* **Microsoft Certified: Azure Fundamentals (AZ-900)**
* **CAST Application Performance Training (30 Days)** – Transaction-flow visualization across distributed enterprise layers (Light & Wonder).
* **API Testing & Architecture with Postman**
* **JMeter Performance and Load Testing**
* **DevOps Fundamentals (Azure & CI/CD Pipelines)**
