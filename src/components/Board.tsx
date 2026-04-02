import Card from "./Card";
import type { CardModel } from "../types";

type BoardProps = {
  cards: CardModel[];
  onCardClick: (cardId: string) => void;
  pairCount: number;
};

export default function Board({ cards, onCardClick, pairCount }: BoardProps) {
  const columns = pairCount === 6 ? 4 : 6;
  return (
    <main
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 170px))`,
      }}
    >
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
      ))}
    </main>
  );
}
