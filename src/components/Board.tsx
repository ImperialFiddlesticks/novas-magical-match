import Card from "./Card";
import type { CardModel } from "../types";

type BoardProps = {
  readonly cards: CardModel[];
  readonly onCardClick: (cardId: string) => void;
  readonly pairCount: number;
  readonly isMobile: boolean;
};

export default function Board({
  cards,
  onCardClick,
  pairCount,
  isMobile,
}: BoardProps) {
  const columns = pairCount === 6 ? 4 : isMobile ? 4 : 6;
  const cardMaxWidth = pairCount === 12 && isMobile ? 75 : 170;
  const boardGap = pairCount === 12 && isMobile ? "8px" : "12px";
  return (
    <main
      className="game-board"
      // hard mobile cards are intentionally compact to avoid horizontal crowding; tablet/desktop are primary targets.
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, ${cardMaxWidth}px))`,
        gap: boardGap,
      }}
    >
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
      ))}
    </main>
  );
}
