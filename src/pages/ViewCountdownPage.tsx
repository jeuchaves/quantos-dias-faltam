import { formatTimeLeft } from "@/lib/formatTimeLeft";
import { useCountdown } from "../hooks/useCountdown";

export const ViewCountdownPage = () => {
  const targetDate = new Date("2025-08-07T12:00:00");
  const timeLeft = useCountdown(targetDate);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contagem Regressiva</h1>
      <p>Faltam {formatTimeLeft(timeLeft)}</p>
    </div>
  );
};
