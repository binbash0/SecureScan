import { RiskLevel, SecurityCheck } from "../components/RiskReport";

export function generateMockScanResults(address: string) {
  // Simulate different risk levels based on address patterns
  const isHighRisk = address.toLowerCase().includes('f') || address.toLowerCase().includes('a');
  const isMediumRisk = address.toLowerCase().includes('b') || address.toLowerCase().includes('c');
  
  let riskLevel: RiskLevel;
  let exploitLikelihood: number;
  let securityChecks: SecurityCheck[];

  if (isHighRisk) {
    riskLevel = {
      level: "dangerous",
      score: 8.5,
      title: "High Risk Detected",
      description: "Multiple critical security vulnerabilities found"
    };
    exploitLikelihood = Math.floor(Math.random() * 30) + 65; // 65-94%
    securityChecks = [
      {
        name: "Ownership Verification",
        status: "fail",
        description: "Contract ownership can be transferred without timelock"
      },
      {
        name: "Mint Function Analysis",
        status: "fail",
        description: "Unlimited minting capability detected"
      },
      {
        name: "Liquidity Lock Check",
        status: "warning",
        description: "Liquidity lock expires in 30 days"
      },
      {
        name: "Proxy Upgradeability",
        status: "fail",
        description: "Contract can be upgraded without notice"
      },
      {
        name: "Honeypot Detection",
        status: "pass",
        description: "No honeypot patterns detected"
      }
    ];
  } else if (isMediumRisk) {
    riskLevel = {
      level: "warning",
      score: 5.5,
      title: "Medium Risk",
      description: "Some security concerns require attention"
    };
    exploitLikelihood = Math.floor(Math.random() * 30) + 35; // 35-64%
    securityChecks = [
      {
        name: "Ownership Verification",
        status: "warning",
        description: "Contract ownership has 24h timelock"
      },
      {
        name: "Mint Function Analysis",
        status: "pass",
        description: "No mint function or capped minting"
      },
      {
        name: "Liquidity Lock Check",
        status: "warning",
        description: "Partial liquidity locked for 6 months"
      },
      {
        name: "Proxy Upgradeability",
        status: "pass",
        description: "Contract is not upgradeable"
      },
      {
        name: "Honeypot Detection",
        status: "pass",
        description: "No honeypot patterns detected"
      }
    ];
  } else {
    riskLevel = {
      level: "safe",
      score: 2.1,
      title: "Low Risk",
      description: "Contract appears secure with standard safeguards"
    };
    exploitLikelihood = Math.floor(Math.random() * 25) + 5; // 5-29%
    securityChecks = [
      {
        name: "Ownership Verification",
        status: "pass",
        description: "Contract ownership renounced or multi-sig controlled"
      },
      {
        name: "Mint Function Analysis",
        status: "pass",
        description: "No mint function present"
      },
      {
        name: "Liquidity Lock Check",
        status: "pass",
        description: "Liquidity locked for 2+ years"
      },
      {
        name: "Proxy Upgradeability",
        status: "pass",
        description: "Contract is not upgradeable"
      },
      {
        name: "Honeypot Detection",
        status: "pass",
        description: "No honeypot patterns detected"
      }
    ];
  }

  const predictionData = {
    yesPercentage: Math.floor(Math.random() * 60) + 20, // 20-79%
    noPercentage: 0,
    totalStaked: Math.floor(Math.random() * 50000) + 5000,
    participants: Math.floor(Math.random() * 200) + 50
  };
  predictionData.noPercentage = 100 - predictionData.yesPercentage;

  return {
    riskLevel,
    exploitLikelihood,
    securityChecks,
    predictionData
  };
}