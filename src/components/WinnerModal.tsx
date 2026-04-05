type WinnerModalProps = {
  readonly winner: string;
  readonly playerOneScore: number;
  readonly playerTwoScore: number;
  readonly onNewGame: () => void;
  readonly playerOneName: string;
  readonly playerTwoName: string;
};

export default function WinnerModal({
  winner,
  playerOneScore,
  playerTwoScore,
  onNewGame,
  playerOneName,
  playerTwoName,
}: WinnerModalProps) {
  const modalTitle =
    playerOneScore === playerTwoScore
      ? "It's a tie!"
      : `${winner} is the winner!`;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-title">{modalTitle}</h2>
        <div className="modal-scores">
          <span>
            {playerOneName} {playerOneScore}
          </span>
          <span>
            {playerTwoName} {playerTwoScore}
          </span>
        </div>
        <button className="game-button" onClick={onNewGame}>
          Play Again
        </button>
      </div>
    </div>
  );
}
