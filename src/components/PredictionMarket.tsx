import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Users, TrendingUp, DollarSign, Trophy } from "lucide-react";

interface PredictionData {
  yesPercentage: number;
  noPercentage: number;
  totalStaked: number;
  participants: number;
}

interface PredictionMarketProps {
  predictionData: PredictionData;
  onPredict: (choice: "yes" | "no", amount: number) => void;
}

export function PredictionMarket({ predictionData, onPredict }: PredictionMarketProps) {
  const [selectedChoice, setSelectedChoice] = useState<"yes" | "no" | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedChoice || !stakeAmount || parseFloat(stakeAmount) <= 0) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    onPredict(selectedChoice, parseFloat(stakeAmount));
    setIsSubmitting(false);
    setSelectedChoice(null);
    setStakeAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-5" />
          Community Prediction Market
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Will this contract be exploited within 90 days?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Predictions */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Community Forecast</span>
            <div className="flex gap-2 text-sm">
              <Badge variant="outline" className="text-red-600">
                {predictionData.yesPercentage}% Yes
              </Badge>
              <Badge variant="outline" className="text-green-600">
                {predictionData.noPercentage}% No
              </Badge>
            </div>
          </div>
          
          <div className="relative">
            <Progress value={predictionData.yesPercentage} className="h-4" />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              {predictionData.yesPercentage}% predict exploit
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-md">
            <DollarSign className="size-4 mx-auto mb-1 text-muted-foreground" />
            <div className="font-medium">${predictionData.totalStaked.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Staked</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-md">
            <Trophy className="size-4 mx-auto mb-1 text-muted-foreground" />
            <div className="font-medium">{predictionData.participants}</div>
            <div className="text-xs text-muted-foreground">Participants</div>
          </div>
        </div>

        {/* Prediction Interface */}
        <div className="space-y-4 p-4 border rounded-md">
          <h4 className="font-medium flex items-center gap-2">
            <TrendingUp className="size-4" />
            Make Your Prediction
          </h4>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedChoice === "yes" ? "default" : "outline"}
              onClick={() => setSelectedChoice("yes")}
              className={selectedChoice === "yes" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Yes - Will be exploited
            </Button>
            <Button
              variant={selectedChoice === "no" ? "default" : "outline"}
              onClick={() => setSelectedChoice("no")}
              className={selectedChoice === "no" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              No - Will survive
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Stake Amount (USD)</label>
            <Input
              type="number"
              placeholder="Enter amount to stake"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              min="1"
              max="1000"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!selectedChoice || !stakeAmount || parseFloat(stakeAmount) <= 0 || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : `Stake $${stakeAmount || "0"} on ${selectedChoice === "yes" ? "Yes" : "No"}`}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
          <strong>Note:</strong> This is a demo. Predictions would be resolved by oracle verification (e.g., Forta alerts) 
          and winners would share rewards based on their stake.
        </div>
      </CardContent>
    </Card>
  );
}