# SecureScan Prediction Market

[![React](https://img.shields.io/badge/Frontend-React-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Solidity](https://img.shields.io/badge/Smart%20Contracts-Solidity-363636?logo=solidity&logoColor=white)](https://soliditylang.org/)
[![BlockDAG](https://img.shields.io/badge/Blockchain-BlockDAG-blueviolet)](https://blockdag.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🔍 About SecureScan

**SecureScan** is a **Prediction Market** platform deployed on the **BlockDAG blockchain**, enabling users to create, participate, and resolve market predictions in a secure, transparent, and decentralized way.  

This solution was built for the **AI & DePIN Track** at the **Hedera Africa Hackathon 2025** to demonstrate how decentralized infrastructure can empower transparent forecasting, research, and community-driven insights.

---

## ✨ Features
- 📝 Create prediction markets on real-world topics.  
- 🔮 Participate in active markets by staking tokens.  
- ✅ Automatic resolution via smart contracts.  
- 🔗 Powered by **BlockDAG blockchain** for speed, scalability, and security.  
- 💻 Intuitive React-based frontend with wallet connection support.  

---

## 📂 Project Structure
├── contracts/ # Solidity smart contracts
├── src/ # React frontend
│ ├── components/ # UI components
│ ├── pages/ # Main pages (Home, Market, Profile)
│ ├── hooks/ # Custom React hooks
│ └── utils/ # Ethers.js & BlockDAG helpers
├── test/ # Smart contract tests
├── hardhat.config.js # Hardhat setup
├── package.json
└── README.md


---

## 🔗 Connecting to BlockDAG Wallet

The dApp integrates **BlockDAG wallet support** via `ethers.js`.  
Example connection snippet: 

```javascript
import { ethers } from "ethers";

async function connectBlockDAGWallet() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    console.log("Connected wallet:", await signer.getAddress());
  } else {
    alert("BlockDAG Wallet not detected!");
  }
}
```
## ⚡ Installation & Setup

### 1. Clone repo
```bash
git clone https://github.com/your-username/securescan-prediction-market.git
cd securescan-prediction-market

npm install

npx hardhat compile

npx hardhat node

npx hardhat run scripts/deploy.js --network blockdag

npm run dev
```

## 📜 Smart Contracts

PredictionMarket.sol – Core market logic

MarketFactory.sol – Market creation & management

Token.sol – Utility token for staking

👉 Deployed contract addresses will be updated after deployment.

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.

## 📄 License

This project is licensed under the MIT License.
