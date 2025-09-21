import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

interface PredictionData {
  oneMinute: {
    direction: "up" | "down";
    percentage: number;
  };
  oneHour: {
    direction: "up" | "down";
    percentage: number;
  };
  confidenceLevel: number;
}

interface MarketPredictionProps {
  predictionData?: PredictionData;
}

export function MarketPrediction({ predictionData }: MarketPredictionProps) {
  // Default mock data if none provided
  const defaultData: PredictionData = {
    oneMinute: {
      direction: Math.random() > 0.5 ? "up" : "down",
      percentage: Math.floor(Math.random() * 8) + 2 // 2-9%
    },
    oneHour: {
      direction: Math.random() > 0.5 ? "up" : "down", 
      percentage: Math.floor(Math.random() * 15) + 5 // 5-19%
    },
    confidenceLevel: 72
  };

  const data = predictionData || defaultData;

  const getPredictionIcon = (direction: "up" | "down") => {
    return direction === "up" ? 
      <TrendingUp className="size-4 text-green-600" /> : 
      <TrendingDown className="size-4 text-red-600" />;
  };

  const getPredictionBadge = (direction: "up" | "down", percentage: number) => {
    const isUp = direction === "up";
    return (
      <Badge 
        className={`${isUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} hover:${isUp ? 'bg-green-100' : 'bg-red-100'}`}
      >
        {getPredictionIcon(direction)}
        <span className="ml-1">{isUp ? 'Up' : 'Down'} {percentage}%</span>
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="size-5" />
          Market Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-start">
          {/* Candle Chart Image */}
          <div className="flex-shrink-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1745509267945-b25cbb4d50ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGVzdGljayUyMGNoYXJ0JTIwdHJhZGluZ3xlbnwxfHx8fDE3NTgzODMxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Candlestick chart"
              className="w-20 h-16 object-cover rounded-md border"
            />
          </div>

          {/* Predictions */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <span>Next 1 Minute →</span>
              {getPredictionBadge(data.oneMinute.direction, data.oneMinute.percentage)}
            </div>

            <div className="flex items-center justify-between">
              <span>Next 1 Hour →</span>
              {getPredictionBadge(data.oneHour.direction, data.oneHour.percentage)}
            </div>

            <div className="pt-2 border-t">
              <span className="font-medium">Confidence Level: {data.confidenceLevel}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}