# 🔒 SecureScan Prediction Market

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Solidity](https://img.shields.io/badge/SmartContracts-Solidity-black?logo=solidity)
![BlockDAG](https://img.shields.io/badge/Blockchain-BlockDAG-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 Overview
**SecureScan** is a community-powered **Web3 Security Oracle** built on the **BlockDAG blockchain**.  
It combines **automated smart contract risk scanning** with a **prediction market**, where users stake tokens to vote on the safety of smart contracts.  

This hybrid approach fosters **transparency, community intelligence, and real-time security insights**, helping prevent the next billion-dollar hack.

---

## ⚡ Key Features
- 🔗 **BlockDAG Integration** : scalable, low-fee, fast finality blockchain  
- 🦊 **Wallet Connection** : MetaMask (with auto BlockDAG switch)  
- 🔒 **SecureScan Token (SCAN)** : native ERC-20 token used for staking, voting, and rewards  
- 📊 **Prediction Market** : stake tokens to predict whether contracts are safe or vulnerable  
- 🛡 **Smart Contract Scanner** : automated checks for vulnerabilities (reentrancy, overflow, etc.)  
- 🏆 **Incentives** : correct predictions earn rewards; malicious votes are penalized  

---

## 🛠 Tech Stack
- **Frontend:** React + Vite + TailwindCSS  
- **Blockchain:** BlockDAG  
- **Smart Contracts:** Solidity  
- **Web3 Integration:** ethers.js  
- **Wallets:** MetaMask (live), WalletConnect & Coinbase (roadmap)  

---

## 📂 Project Structure


---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/secure-scan.git
cd secure-scan
npm install
```
```bash
VITE_BLOCKDAG_RPC_URL=https://rpc.blockdag.network
VITE_PREDICTION_MARKET_ADDRESS=0xYourDeployedContract
VITE_SECURESCAN_TOKEN_ADDRESS=0xYourTokenContract
```
```bash
npm run dev
```
```bash
npm run build
```

## 🔗 BlockDAG Wallet Setup

Add BlockDAG to MetaMask automatically using the app, or manually:

Network Name: BlockDAG Testnet

RPC URL: https://rpc.blockdag.network

Chain ID: 0x1234 (replace with actual)

Currency Symbol: BDAG

Explorer: https://explorer.blockdag.network

## 📜 Smart Contracts

Prediction Market: 0x0fdBEc0AA9Ae4E1D5e32A177b7bE2c61E332d11A

SecureScan Token (SCAN): 0xAf1abA8C1Ef0b5286b3b408A62227a42CAC66811

## 🚀 Roadmap

✅ MetaMask wallet integration

✅ BlockDAG deployment

🔄 WalletConnect + Coinbase support

🔄 Advanced vulnerability scanner (AI-powered)

🔮 Governance DAO for community-driven resolutions

## 🤝 Contributing

Contributions are welcome!

Fork the repo

Create your feature branch (git checkout -b feature/new-feature)

Commit changes (git commit -m "Add new feature")

Push to branch (git push origin feature/new-feature)

Open a Pull Request

## 📄 License

Distributed under the MIT License.
See LICENSE for details.

## 💡 About SecureScan

SecureScan is more than a dApp — it’s a Web3 security ecosystem.
By merging automated contract scans with human-powered prediction markets, SecureScan creates a decentralized early-warning system for vulnerabilities.
