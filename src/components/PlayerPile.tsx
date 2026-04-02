import { CardModel } from "../types";

type PlayerPileProps = {
  readonly playerName: string;
  readonly cardIds: string[];
  readonly cards: CardModel[];
};

export default function PlayerPile({
  playerName,
  cardIds,
  cards,
}: PlayerPileProps) {
  const uniquePairCards = cardIds
    .map((id) => cards.find((c) => c.id === id))
    .filter((c): c is CardModel => c !== undefined)
    .filter((c, i, arr) => arr.findIndex((x) => x.pairId === c.pairId) === i);

  return (
    <div className="player-pile">
      <div className="pile-cards">
        {uniquePairCards.map((card) => (
          <img
            alt={card.pairId}
            key={card.id}
            src={card.img}
            className="won-cards"
          />
        ))}
      </div>
    </div>
  );
}
