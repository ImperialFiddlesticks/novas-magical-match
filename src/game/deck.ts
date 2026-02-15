import type { Animal, CardModel } from "../types";
import { shuffle } from "./shuffle";

export function buildDeck(animals: readonly Animal[]): CardModel[] {
  const doubled: CardModel[] = animals.flatMap((a) => [
    {
      id: crypto.randomUUID(),
      pairId: a.pairId,
      img: a.img,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: crypto.randomUUID(),
      pairId: a.pairId,

      img: a.img,
      isFlipped: false,
      isMatched: false,
    },
  ]);
  return shuffle(doubled);
}
