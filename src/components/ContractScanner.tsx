import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Search, Shield } from "lucide-react";

interface ContractScannerProps {
  onScan: (address: string) => void;
  isScanning: boolean;
}

export function ContractScanner({ onScan, isScanning }: ContractScannerProps) {
  const [address, setAddress] = useState("");

  const handleScan = () => {
    if (address.trim()) {
      onScan(address.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleScan();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="size-8 text-primary" />
          <CardTitle className="text-3xl">SecureScan-PM</CardTitle>
        </div>
        <CardDescription>
          Scan smart contracts for security vulnerabilities and get community predictions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter contract address (0x...)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isScanning}
          />
          <Button 
            onClick={handleScan} 
            disabled={!address.trim() || isScanning}
            className="px-6"
          >
            {isScanning ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin size-4 border-2 border-white border-t-transparent rounded-full" />
                Scanning...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="size-4" />
                Scan Now
              </div>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          We check ownership, mint functions, liquidity locks, proxy upgradeability, and more
        </p>
      </CardContent>
    </Card>
  );
}