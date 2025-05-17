import type { Timestamp } from "firebase/firestore";

export type CreateCountdownInput = {
  title: string;
  date: string;
  message?: string;
};

export type UpdateCountdownInput = Partial<CreateCountdownInput>;

export type CountdownDocument = {
  title: string;
  date: Timestamp;
  message: string;
  createdAt: Timestamp;
};

export type Countdown = {
  id: string;
  title: string;
  date: Date;
  message: string;
  createdAt: Date;
};
