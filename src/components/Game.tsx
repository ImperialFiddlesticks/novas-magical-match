import { useMemo, useState, useEffect } from "react";
import Board from "./Board";
import { buildDeck } from "../game/deck";
import { allAnimals } from "../data/animals";

export default function Game() {
  const startingPairs = 6;
  const [pairCount, setPairCount] = useState(startingPairs);
  const activeAnimals = useMemo(
    () => allAnimals.slice(0, pairCount),
    [pairCount],
  );
  const [cards, setCards] = useState(() => buildDeck(activeAnimals));
  const totalPairs = activeAnimals.length;
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isPlayerOne, setIsPlayerOne] = useState(true);

  function resetGame() {
    setCards(buildDeck(activeAnimals));
    setMatches(0);
    setTurns(0);
    setFlippedIds([]);
    setLockBoard(false);
    setIsPlayerOne(true);
  }

  useEffect(() => {
    resetGame();
  }, [activeAnimals]);

  function handleCardClick(cardId: string) {
    if (lockBoard) return;
    const clicked = cards.find((c) => c.id === cardId);
    if (!clicked || clicked.isMatched || clicked.isFlipped) return;

    const nextCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c,
    );

    const nextFlipped = [...flippedIds, cardId];

    setCards(nextCards);
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setLockBoard(true);
      setTurns((t) => t + 1);

      const [id1, id2] = nextFlipped;
      const c1 = nextCards.find((c) => c.id === id1);
      const c2 = nextCards.find((c) => c.id === id2);

      if (!c1 || !c2) {
        setFlippedIds([]);
        setLockBoard(false);
        return;
      }
      const isMatch = c1.pairId === c2.pairId;

      if (isMatch) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === id1 || c.id === id2 ? { ...c, isMatched: true } : c,
            ),
          );
          setFlippedIds([]);
          setLockBoard(false);
          setMatches((m) => m + 1);
        }, 250);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c,
            ),
          );
          setFlippedIds([]);
          setLockBoard(false);
          setIsPlayerOne((prev) => !prev);
        }, 1000);
      }
    }
  }
  const didWin = matches === totalPairs;

  return (
    <div className="game-container">
      <h1>Nova's Magical Match</h1>
      <div className="info-box">
        <div>
          Matches: {matches}/{totalPairs}
        </div>
        <div>Turns: {turns}</div>
        <div className="button-box">
          <div className="new-game-box">
            <button className="game-button" onClick={resetGame}>
              New Game
            </button>
          </div>
          <div className="difficulty-box">
            <button
              className="difficulty-button"
              onClick={() => setPairCount(6)}
            >
              Easy
            </button>
            <button
              className="difficulty-button"
              onClick={() => setPairCount(12)}
            >
              Hard
            </button>
          </div>
        </div>

        {didWin && <strong>You did it!</strong>}
      </div>

      <Board
        cards={cards}
        onCardClick={handleCardClick}
        pairCount={pairCount}
      />
      <footer>
        {" "}
        <a href="https://www.freepik.com/free-vector/happy-funny-cartoon-animals-set_8609221.htm#fromView=search&page=1&position=10&uuid=fafb8b93-4555-4511-86a4-82ff7e46093d&query=cute+animals">
          Image by pch.vector on Freepik
        </a>
      </footer>
    </div>
  );
}
