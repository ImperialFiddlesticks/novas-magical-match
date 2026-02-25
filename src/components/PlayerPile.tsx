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
  return (
    <div className="player-pile">
      <h3>{playerName}</h3>
      <div className="pile-cards">
        {cardIds.map((cardId) => {
          const card = cards.find((c) => c.id === cardId);
          if (!card) return null;
          return (
            <img
              alt={card.pairId}
              key={card.id}
              src={card.img}
              className="won-cards"
            />
          );
        })}
      </div>
    </div>
  );
}
