import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

export interface RiskLevel {
  level: "safe" | "warning" | "dangerous";
  score: number;
  title: string;
  description: string;
}

export interface SecurityCheck {
  name: string;
  status: "pass" | "warning" | "fail";
  description: string;
}

interface RiskReportProps {
  riskLevel: RiskLevel;
  checks: SecurityCheck[];
}

export function RiskReport({ riskLevel, checks }: RiskReportProps) {
  const getRiskIcon = () => {
    switch (riskLevel.level) {
      case "safe":
        return <CheckCircle className="size-6 text-green-600" />;
      case "warning":
        return <AlertTriangle className="size-6 text-yellow-600" />;
      case "dangerous":
        return <XCircle className="size-6 text-red-600" />;
    }
  };

  const getRiskBadge = () => {
    switch (riskLevel.level) {
      case "safe":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Safe</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠️ Warning</Badge>;
      case "dangerous":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">🚨 Dangerous</Badge>;
    }
  };

  const getCheckIcon = (status: SecurityCheck["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="size-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="size-4 text-yellow-600" />;
      case "fail":
        return <XCircle className="size-4 text-red-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getRiskIcon()}
            <div>
              <CardTitle>Security Risk Assessment</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{riskLevel.description}</p>
            </div>
          </div>
          {getRiskBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Info className="size-4" />
            Security Checks
          </h4>
          <div className="space-y-2">
            {checks.map((check, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                {getCheckIcon(check.status)}
                <div className="flex-1">
                  <p className="font-medium">{check.name}</p>
                  <p className="text-sm text-muted-foreground">{check.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}