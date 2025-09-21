import { RiskReport, RiskLevel, SecurityCheck } from "./RiskReport";
import { ExploitLikelihood } from "./ExploitLikelihood";
import { PredictionMarket } from "./PredictionMarket";
import { MarketPrediction } from "./MarketPrediction";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface PredictionData {
  yesPercentage: number;
  noPercentage: number;
  totalStaked: number;
  participants: number;
}

interface ResultsDashboardProps {
  contractAddress: string;
  riskLevel: RiskLevel;
  securityChecks: SecurityCheck[];
  exploitLikelihood: number;
  predictionData: PredictionData;
  onPredict: (choice: "yes" | "no", amount: number) => void;
}

export function ResultsDashboard({
  contractAddress,
  riskLevel,
  securityChecks,
  exploitLikelihood,
  predictionData,
  onPredict
}: ResultsDashboardProps) {
  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
  };

  const openEtherscan = () => {
    window.open(`https://etherscan.io/address/${contractAddress}`, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Contract Info Header */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Contract:</span>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                {contractAddress.slice(0, 10)}...{contractAddress.slice(-8)}
              </code>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyAddress}>
                <Copy className="size-3 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={openEtherscan}>
                <ExternalLink className="size-3 mr-1" />
                Etherscan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Final Assessment</h3>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                {riskLevel.level === "safe" && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Safe</Badge>}
                {riskLevel.level === "warning" && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠️ Warning</Badge>}
                {riskLevel.level === "dangerous" && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">🚨 Dangerous</Badge>}
              </div>
              <div className="text-muted-foreground">•</div>
              <div>Exploit Likelihood: <span className="font-bold text-red-600">{exploitLikelihood}%</span></div>
              <div className="text-muted-foreground">•</div>
              <div>Community: <span className="font-bold">{predictionData.yesPercentage}% Yes, {predictionData.noPercentage}% No</span></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <RiskReport riskLevel={riskLevel} checks={securityChecks} />
          <ExploitLikelihood percentage={exploitLikelihood} timeframe="90 days" />
        </div>
        <div className="space-y-6">
          <MarketPrediction />
          <PredictionMarket predictionData={predictionData} onPredict={onPredict} />
        </div>
      </div>
    </div>
  );
}