import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addYears,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
} from "date-fns";
import { useEffect, useState } from "react";

export interface ITimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: Date) => {
  const getTimeLeft = (to: Date): ITimeLeft => {
    const now = new Date();
    let tempDate = now;

    const years = differenceInYears(to, tempDate);
    tempDate = addYears(tempDate, years);

    const months = differenceInMonths(to, tempDate);
    tempDate = addMonths(tempDate, months);

    const days = differenceInDays(to, tempDate);
    tempDate = addDays(tempDate, days);

    const hours = differenceInHours(to, tempDate);
    tempDate = addHours(tempDate, hours);

    const minutes = differenceInMinutes(to, tempDate);
    tempDate = addMinutes(tempDate, minutes);

    const seconds = differenceInSeconds(to, tempDate);

    return { years, months, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<ITimeLeft>(() =>
    getTimeLeft(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};
