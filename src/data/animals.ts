import type { Animal } from "../types";

const base = import.meta.env.BASE_URL;

export const allAnimals: readonly Animal[] = [
  { pairId: "bear", img: `${base}animals/bear.png` },
  { pairId: "bunny", img: `${base}animals/bunny.png` },
  { pairId: "cat", img: `${base}animals/cat.png` },
  { pairId: "deer", img: `${base}animals/deer.png` },
  { pairId: "elephant", img: `${base}animals/elephant.png` },
  { pairId: "fox", img: `${base}animals/fox.png` },
  { pairId: "giraffe", img: `${base}animals/giraffe.png` },
  { pairId: "hippo", img: `${base}animals/hippo.png` },
  { pairId: "lion", img: `${base}animals/lion.png` },
  { pairId: "monkey", img: `${base}animals/monkey.png` },
  { pairId: "penguin", img: `${base}animals/penguin.png` },
  { pairId: "pig", img: `${base}animals/pig.png` },
];
