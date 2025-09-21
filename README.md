# ashvini
# Ashvini 🌿

A Blockchain-Based Botanical Traceability Platform for Ayurvedic Herbs

Ashvini is a next-generation traceability system designed to bring transparency, authenticity, and sustainability to the Ayurvedic herbal supply chain. By leveraging Hyperledger Fabric, IoT, and modern web technologies, it creates an immutable record of an herb's journey—from geo-tagged harvest to the final consumer's hands.

## 📋 Table of Contents
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)

## 🌱 Problem Statement
The Ayurvedic herbal supply chain in India is characterised by fragmented networks of smallholder farmers, wild collectors, and multiple intermediaries, leading to challenges in ensuring consistent quality, authenticity, and sustainable sourcing of medicinal plants. 

Variations in harvesting practices, environmental conditions, and manual record-keeping introduce risks of mislabeling, adulteration, and over-harvesting of vulnerable species, undermining consumer trust and compliance with regulatory standards. Geographic provenance is often undocumented or opaque, making it difficult for manufacturers and regulators to verify that herbs originate from approved regions or follow sustainable collection guidelines.

Ashvini addresses these gaps by creating a tamper-proof, decentralized ledger that provides end-to-end visibility and enforces compliance, rebuilding consumer trust and promoting ethical sourcing.

## ✨ Key Features
- **Immutable Ledger**: Built on Hyperledger Fabric, ensuring that every transaction, once recorded, cannot be altered.
- **Geo-Tagged Harvesting**: Mobile DApp allows farmers to record precise GPS coordinates, timestamps, and photos at the point of collection.
- **Offline-First Capability**: Mobile app saves data locally and syncs automatically when network connection is available.
- **Smart Contract Validation**: Chaincode automatically enforces NMPB guidelines, including geo-fencing for approved zones and seasonal restrictions.
- **End-to-End Traceability**: Tracks every step, from harvest and processing to lab testing and final formulation.
- **Consumer QR Code Portal**: Customers can scan a unique QR code to view the herb's complete journey.
- **Interactive Journey Map**: Displays an interactive map tracing the herb's path with photos from each stage.

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|----------|
| **Blockchain Network** | Hyperledger Fabric 2.x | Permissioned, distributed ledger for all provenance data |
| **Smart Contract** | Node.js / Go (Golang) | On-chain business logic and validation rules |
| **Backend API Server** | Node.js with Express.js | Middleware connecting frontend to blockchain |
| **Frontend (Collector)** | React Native with Expo | Cross-platform mobile app for data capture |
| **Frontend (Stakeholder)** | React.js | Web dashboard for supply chain management |
| **Frontend (Consumer)** | Next.js | Web portal for QR code scans and product info |
| **File Storage** | AWS S3 / Google Cloud Storage | Secure storage for photos and documents |
| **Database** | PostgreSQL | User authentication and application metadata |
| **Deployment** | Docker & Kubernetes | Containerization and orchestration |
| **Mapping** | Leaflet with react-leaflet | Interactive journey map visualization |

## 🏛️ System Architecture
Ashvini is built on a decoupled, three-tier architecture to ensure separation of concerns and scalability.

### Architecture Components
1. **Blockchain Layer** (`chaincode/`)
   - Hyperledger Fabric network running smart contracts
   - Acts as the trusted "rulebook" and database for all traceability data

2. **Server Layer** (`server/`)
   - Express.js API as a secure bridge
   - Handles authentication, request processing, and blockchain interactions
   - Manages file uploads to cloud storage

3. **Frontend Layer** (`frontend/`)
   - React and React Native applications
   - Communicates exclusively with the Server Layer via RESTful APIs

### Data Flow for Harvest Event
```
Mobile App → Express Server → [Uploads to Cloud Storage] → 
Express Server → [Submits to Blockchain]
```

## 📁 Folder Structure
```
Ashvini/
├── chaincode/      # Hyperledger Fabric smart contracts
├── server/         # Node.js/Express backend API
└── frontend/       # User-facing applications
    ├── mobile-app/      # React Native collector app
    ├── dashboard/       # React.js admin dashboard
    └── consumer-portal/ # Next.js consumer portal
```

## 🚀 Getting Started
### Prerequisites
- Docker & Docker Compose: [Install Docker](https://docs.docker.com/get-docker/)
- Node.js (v16+): [Install Node.js](https://nodejs.org/)
- Go (v1.18+): [Install Go](https://golang.org/doc/install)
- Hyperledger Fabric: [Installation Guide](https://hyperledger-fabric.readthedocs.io/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Ashvini.git
   cd Ashvini
   ```

2. Start the Blockchain Network:
   ```bash
   cd fabric-samples/test-network
   ./network.sh up createChannel
   ```

3. Deploy the Smart Contract:
   ```bash
   # Follow instructions in chaincode/README.md
   ```

4. Install Server Dependencies:
   ```bash
   cd server
   npm install
   ```

5. Install Frontend Dependencies:
   ```bash
   cd ../frontend/dashboard
   npm install
   # Repeat for other frontend apps
   ```

### Running the Application
1. Start the Server:
   ```bash
   cd server
   npm start
   ```

2. Start the Frontend:
   ```bash
   cd frontend/dashboard
   npm start
   ```
