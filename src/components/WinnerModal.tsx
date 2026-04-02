type WinnerModalProps = {
  readonly winner: string;
  readonly playerOneScore: number;
  readonly playerTwoScore: number;
  readonly onNewGame: () => void;
};

export default function WinnerModal({
  winner,
  playerOneScore,
  playerTwoScore,
  onNewGame,
}: WinnerModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-title">{winner} is the winner!</h2>
        <div className="modal-scores">
          <span>Player One: {playerOneScore}</span>
          <span>Player Two: {playerTwoScore}</span>
        </div>
        <button className="game-button" onClick={onNewGame}>
          Play Again
        </button>
      </div>
    </div>
  );
}
