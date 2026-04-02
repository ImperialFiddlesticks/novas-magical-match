import { useMemo, useState, useEffect } from "react";
import Board from "./Board";
import { buildDeck } from "../game/deck";
import { allAnimals } from "../data/animals";
import PlayerPile from "./PlayerPile";
import WinnerModal from "./WinnerModal";

function determineWinner(
  playerOneScore: number,
  playerTwoScore: number,
): string {
  if (playerOneScore > playerTwoScore) {
    return "Player One";
  } else if (playerOneScore < playerTwoScore) {
    return "Player Two";
  } else {
    return "It's a tie!";
  }
}

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
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [playerOneCards, setPlayerOneCards] = useState<string[]>([]);
  const [playerTwoCards, setPlayerTwoCards] = useState<string[]>([]);

  function resetGame() {
    setCards(buildDeck(activeAnimals));
    setMatches(0);
    setTurns(0);
    setFlippedIds([]);
    setLockBoard(false);
    setIsPlayerOne(true);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setPlayerOneCards([]);
    setPlayerTwoCards([]);
  }
  function handleMatch(id1: string, id2: string) {
    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) =>
          [id1, id2].includes(c.id) ? { ...c, isMatched: true } : c,
        ),
      );

      setFlippedIds([]);
      setLockBoard(false);
      setMatches((m) => m + 1);
      isPlayerOne
        ? setPlayerOneScore((prev) => prev + 1)
        : setPlayerTwoScore((prev) => prev + 1);
      isPlayerOne
        ? setPlayerOneCards((prev) => [...prev, id1, id2])
        : setPlayerTwoCards((prev) => [...prev, id1, id2]);
    }, 250);
  }

  function handleMismatch(id1: string, id2: string) {
    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) =>
          [id1, id2].includes(c.id) ? { ...c, isFlipped: false } : c,
        ),
      );
      setFlippedIds([]);
      setLockBoard(false);
      setIsPlayerOne((prev) => !prev);
    }, 1000);
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
        handleMatch(id1, id2);
      } else {
        handleMismatch(id1, id2);
      }
    }
  }
  const didWin = matches === totalPairs;
  const winner = determineWinner(playerOneScore, playerTwoScore);

  return (
    <div className="game-container">
      {didWin && (
        <WinnerModal
          winner={winner}
          playerOneScore={playerOneScore}
          playerTwoScore={playerTwoScore}
          onNewGame={resetGame}
        />
      )}
      <header className="game-header">
        <div className="header-title">
          <h1>Nova's Magical Match</h1>
          <p>Match the animal friends!</p>
        </div>

        <div className="header-controls">
          <div className="game-turns">
            <p className="game-text">Turns</p>
            <p className="game-text-bold">{turns}</p>{" "}
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
          <button className="game-button" onClick={resetGame}>
            New Game
          </button>
        </div>
      </header>

      <div
        className={`game-layout ${pairCount === 6 ? "easy-layout" : "hard-layout"}`}
      >
        <div className="player-container">
          <div className="player-header-row">
            <div className="player-score">
              <p className="game-text">Score:</p>
              <p className="game-text-bold"> {playerOneScore}</p>
            </div>
            <h3 className="player-title">Player 1</h3>
          </div>
          <PlayerPile
            playerName="Player One"
            cardIds={playerOneCards}
            cards={cards}
          />
        </div>
        <div className="board-column">
          <Board
            cards={cards}
            onCardClick={handleCardClick}
            pairCount={pairCount}
          />
          <div className="game-button current-turn-display">
            Current turn: {isPlayerOne ? "Player One" : "Player Two"}
          </div>
        </div>
        <div className="player-container">
          <div className="player-header-row">
            <div className="player-score">
              <p className="game-text">Score:</p>
              <p className="game-text-bold"> {playerTwoScore}</p>
            </div>
            <h3 className="player-title">Player 2</h3>
          </div>
          <PlayerPile
            playerName="Player Two"
            cardIds={playerTwoCards}
            cards={cards}
          />
        </div>
      </div>
      <footer className="game-footer">
        {" "}
        <a
          className="footer-link"
          href="https://www.freepik.com/free-vector/happy-funny-cartoon-animals-set_8609221.htm#fromView=search&page=1&position=10&uuid=fafb8b93-4555-4511-86a4-82ff7e46093d&query=cute+animals"
        >
          Image by pch.vector on Freepik
        </a>
      </footer>
    </div>
  );
}
