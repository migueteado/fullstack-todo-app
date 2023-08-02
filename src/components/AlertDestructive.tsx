import { AlertCircle, Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertMessageProps {
  type: "info" | "error";
  title: string;
  message: string;
}

export function AlertMessage({ type, title, message }: AlertMessageProps) {
  let variant: "default" | "destructive" = "default";

  if (type === "error") {
    variant = "destructive";
  }

  return (
    <Alert variant={variant}>
      {type === "error" ? (
        <AlertCircle className="w-4 h-4" />
      ) : (
        <Info className="w-4 h-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
