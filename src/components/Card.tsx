import type { CardModel } from "../types";
import { motion } from "framer-motion";

type CardProps = {
  card: CardModel;
  onClick: () => void;
};

export default function Card({ card, onClick }: CardProps) {
  const showFront = card.isFlipped || card.isMatched;

  return (
    <motion.button
      onClick={onClick}
      disabled={card.isMatched || card.isFlipped}
      aria-label="memory card"
      className="memory-card"
      animate={{ rotateY: card.isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="card-animate front"
        style={{ backfaceVisibility: "hidden", rotateY: 180 }}
      >
        <img
          src={card.img}
          alt={card.pairId}
          className="card-front"
          draggable={false}
        />
      </motion.div>
      <motion.div
        className="card-animate back"
        style={{ backfaceVisibility: "hidden", rotateY: 0 }}
      >
        <img
          src={`${import.meta.env.BASE_URL}green-tea.png`}
          alt="Green Tea"
          className="card-back"
          draggable={false}
        />
      </motion.div>
    </motion.button>
  );
}
