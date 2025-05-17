import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

import { slugify } from "../lib/slugify";
import { db } from "../firebase/config";
import type {
  Countdown,
  CountdownDocument,
  CreateCountdownInput,
} from "@/types/countdown";

const COLLECTION_NAME = "countdowns";

export const createCountdown = async (data: CreateCountdownInput) => {
  const slug = slugify(data.title);

  const docRef = doc(db, COLLECTION_NAME, slug);
  const existing = await getDoc(docRef);

  if (existing.exists()) {
    throw new Error("Countdown already exists");
  }

  const payload = {
    title: data.title,
    date: Timestamp.fromDate(new Date(data.date)),
    message: data.message || "",
    createdAt: Timestamp.now(),
  };

  await setDoc(docRef, payload);
  return slug;
};

export const getCountdownBySlug = async (slug: string) => {
  const docRef = doc(db, COLLECTION_NAME, slug);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error("Countdown not found");
  }

  const data = snapshot.data() as CountdownDocument;

  return {
    id: snapshot.id,
    title: data.title,
    date: data.date.toDate(),
    message: data.message,
    createdAt: data.createdAt.toDate(),
  } as Countdown;
};
