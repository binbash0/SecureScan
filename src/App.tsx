import { useState, useCallback } from "react";
import { ContractScanner } from "./components/ContractScanner";
import { ResultsDashboard } from "./components/ResultsDashboard";
import { BlockchainBackground } from "./components/BlockchainBackground";
import { WalletConnect } from "./components/WalletConnect";
import { generateMockScanResults } from "./utils/mockData";
import { WalletState } from "./utils/walletConnection";
import { toast } from "sonner@2.0.3";

interface ScanResult {
  contractAddress: string;
  riskLevel: any;
  securityChecks: any[];
  exploitLikelihood: number;
  predictionData: any;
}

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null
  });

  const handleScan = useCallback(async (address: string) => {
    setIsScanning(true);
    
    // Simulate API calls with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockData = generateMockScanResults(address);
    
    setScanResult({
      contractAddress: address,
      ...mockData
    });
    
    setIsScanning(false);
    toast.success("Contract scan completed!");
  }, []);

  const handlePredict = (choice: "yes" | "no", amount: number) => {
    if (!walletState.isConnected) {
      toast.error("Please connect your wallet to make predictions");
      return;
    }
    
    toast.success(`Prediction submitted: ${choice.toUpperCase()} with $${amount} stake`);
    
    // Update prediction data to simulate real-time updates
    if (scanResult) {
      const newYesPercentage = choice === "yes" 
        ? Math.min(scanResult.predictionData.yesPercentage + 2, 95)
        : Math.max(scanResult.predictionData.yesPercentage - 2, 5);
      
      setScanResult({
        ...scanResult,
        predictionData: {
          ...scanResult.predictionData,
          yesPercentage: newYesPercentage,
          noPercentage: 100 - newYesPercentage,
          totalStaked: scanResult.predictionData.totalStaked + amount,
          participants: scanResult.predictionData.participants + 1
        }
      });
    }
  };

  const handleNewScan = () => {
    setScanResult(null);
  };

  const handleWalletStateChange = useCallback((newWalletState: WalletState) => {
    setWalletState(newWalletState);
  }, []);
  
  return (
    <div className="min-h-screen bg-background p-4 relative">
      <BlockchainBackground />
      <div className="container mx-auto py-8 relative z-10">
        {!scanResult ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <ContractScanner onScan={handleScan} isScanning={isScanning} />
            
            {/* Demo Examples */}
            <div className="max-w-2xl text-center space-y-4">
              <h3 className="font-medium text-muted-foreground">Try these example addresses:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <button 
                  onClick={() => handleScan("0x1234567890abcdef1234567890abcdef12345678")}
                  className="p-2 border rounded hover:bg-muted/50 transition-colors backdrop-blur-sm hover:border-primary/50"
                  disabled={isScanning}
                >
                  <div className="font-medium">Safe Contract</div>
                  <div className="text-xs text-muted-foreground">Low risk example</div>
                </button>
                <button 
                  onClick={() => handleScan("0xabcdef1234567890abcdef1234567890abcdef12")}
                  className="p-2 border rounded hover:bg-muted/50 transition-colors backdrop-blur-sm hover:border-primary/50"
                  disabled={isScanning}
                >
                  <div className="font-medium">Risky Contract</div>
                  <div className="text-xs text-muted-foreground">High risk example</div>
                </button>
                <button 
                  onClick={() => handleScan("0xbcdef1234567890bcdef1234567890bcdef1234")}
                  className="p-2 border rounded hover:bg-muted/50 transition-colors backdrop-blur-sm hover:border-primary/50"
                  disabled={isScanning}
                >
                  <div className="font-medium">Medium Risk</div>
                  <div className="text-xs text-muted-foreground">Warning example</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-primary">Scan Results</h1>
              <div className="flex items-center gap-3">
                <WalletConnect onWalletStateChange={handleWalletStateChange} />
                <button 
                  onClick={handleNewScan}
                  className="px-4 py-2 text-sm border rounded hover:bg-muted/50 transition-colors backdrop-blur-sm border-primary/30 hover:border-primary/70 text-primary hover:text-primary"
                >
                  New Scan
                </button>
              </div>
            </div>
            <ResultsDashboard
              contractAddress={scanResult.contractAddress}
              riskLevel={scanResult.riskLevel}
              securityChecks={scanResult.securityChecks}
              exploitLikelihood={scanResult.exploitLikelihood}
              predictionData={scanResult.predictionData}
              onPredict={handlePredict}
            />
          </div>
        )}
      </div>
    </div>
  );
}