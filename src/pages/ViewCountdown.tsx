import { useCountdown } from "../hooks/useCountdown";

export const ViewCountdown = () => {
  const targetDate = new Date("2025-08-07T12:00:00");
  const timeLeft = useCountdown(targetDate);

  const formatTimeLeft = (time: typeof timeLeft) => {
    const parts = [];

    if (time.years) parts.push(`${time.years} ano${time.years > 1 ? "s" : ""}`);
    if (time.months)
      parts.push(`${time.months} mês${time.months > 1 ? "es" : ""}`);
    if (time.days) parts.push(`${time.days} dia${time.days > 1 ? "s" : ""}`);
    if (time.hours)
      parts.push(`${time.hours} hora${time.hours > 1 ? "s" : ""}`);
    if (time.minutes)
      parts.push(`${time.minutes} minuto${time.minutes > 1 ? "s" : ""}`);
    if (time.seconds || parts.length === 0)
      parts.push(`${time.seconds} segundo${time.seconds > 1 ? "s" : ""}`);

    return "Faltam " + parts.join(", ");
  };

  return <h1>{formatTimeLeft(timeLeft)}</h1>;
};
