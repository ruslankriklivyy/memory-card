import { motion } from "framer-motion";

import { CardItem } from "../../types/CardItem";
import defaultIcon from "../../assets/default.png";
import clsx from "clsx";

interface CardsItemProps {
  card: CardItem;
  onClickCard: () => void;
}

export function CardsItem({ card, onClickCard }: CardsItemProps) {
  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: card.is_flipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      className={clsx({
        ["cards-item"]: true,
        ["cards-item--correct"]: card.is_correct,
      })}
      onClick={onClickCard}
    >
      <motion.div
        style={{
          backfaceVisibility: "hidden",
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={defaultIcon} alt="default" />
      </motion.div>

      <motion.div
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {card.is_flipped && <img src={card.icon} alt={card.name} />}
      </motion.div>
    </motion.div>
  );
}
