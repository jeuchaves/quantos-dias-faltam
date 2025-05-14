import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { slugify } from "../lib/slugify";
import { db } from "../firebase/config";
import type { ICountdownData } from "../types/countdown";

const COLLECTION_NAME = "countdowns";

interface ICountdownPayload {
  title: string;
  date: Timestamp;
  message: string;
  photos: string[];
  youtubeMusic: string;
  isPremium: boolean;
  createdAt: Timestamp;
}

export const createCountdown = async (data: ICountdownData) => {
  const slug = slugify(data.title);
  const ref = collection(db, COLLECTION_NAME, slug);
  const existing = await getDoc(doc(ref, slug));

  if (existing.exists()) {
    throw new Error("Countdown already exists");
  }

  const payload: ICountdownPayload = {
    title: data.title,
    date: Timestamp.fromDate(new Date(data.date)),
    message: data.message || "",
    photos: (data.photos || []).slice(0, 3),
    youtubeMusic: data.youtubeMusic || "",
    isPremium: data.isPremium || false,
    createdAt: Timestamp.now(),
  };

  await setDoc(doc(ref, slug), payload);
  return slug;
};

const getCountdownBySlug = async (slug: string) => {
  const ref = collection(db, COLLECTION_NAME, slug);
  const snapshot = await getDoc(doc(ref, slug));
  if (!snapshot.exists()) {
    throw new Error("Countdown not found");
  }
  return { id: snapshot.id, ...snapshot.data() };
};

export const countdownService = {
  createCountdown,
  getCountdownBySlug,
};
