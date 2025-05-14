import { formatTimeLeft } from "@/lib/formatTimeLeft";
import { useCountdown } from "../hooks/useCountdown";

export const ViewCountdownPage = () => {
  const targetDate = new Date("2025-08-07T12:00:00");
  const timeLeft = useCountdown(targetDate);

  return <h1>{formatTimeLeft(timeLeft)}</h1>;
};
