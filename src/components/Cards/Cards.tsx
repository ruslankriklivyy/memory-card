import { CARDS } from "../../constants/CARDS.ts";
import { CardsItem } from "./CardsItem.tsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { CardItem } from "../../types/CardItem";
import { Modal } from "../UI/Modal.tsx";
import { createPortal } from "react-dom";
import { WinMessage } from "./WinMessage.tsx";
import { Fireworks } from "fireworks-js";

const MAX_CLICKED_COUNT = 2;

export function Cards() {
  const [cardsData, setCardsData] = useState<CardItem[]>(CARDS);
  const [firstChosenCard, setFirstChosenCard] = useState<CardItem | null>(null);
  const [chosenCards, setChosenCards] = useState<CardItem[]>([]);
  const [clickedCount, setClickedCount] = useState<number>(1);
  const [wait, setWait] = useState<boolean>(false);
  const [isShowWinModal, setIsShowWinModal] = useState<boolean>(false);
  const [fireworks, setFireworks] = useState<Fireworks | null>(null);

  const isCorrectAnswer = useMemo(
    () => cardsData.every((card) => card.is_correct),
    [cardsData],
  );

  const onCloseWinModal = () => {
    fireworks?.stop();
    setIsShowWinModal(false);
    setCardsData(CARDS);
    setClickedCount(1);
    setChosenCards([]);
    setFirstChosenCard(null);
  };

  const updateCardStatus = (card: CardItem, status: boolean) => {
    setCardsData((prev) =>
      prev.map((elem) => {
        if (elem.id === card.id) {
          return { ...elem, is_flipped: status };
        }
        return elem;
      }),
    );
  };

  const checker = (firstCard: CardItem, cards: CardItem[]) => {
    if (!cards?.length) return;

    const isAllCorrect = cards.every((card) => card.name === firstCard.name);

    const cardsIds = [firstCard, ...cards].map(({ id }) => id);
    const newCardsData = cardsData.map((card) => {
      if (cardsIds.includes(card.id)) {
        return {
          ...card,
          is_correct: isAllCorrect,
          is_flipped: isAllCorrect,
        };
      }

      return card;
    });

    if (!isAllCorrect) {
      setWait(true);

      setTimeout(() => {
        const updatedCardsData = newCardsData.map((card) => {
          if (cardsIds.includes(card.id) && !card.is_correct) {
            return { ...card, is_flipped: false };
          }
          return card;
        });

        setCardsData(updatedCardsData);
        setWait(false);
      }, 1000);
    } else {
      setCardsData(newCardsData);
    }
  };

  const onClickCard = (card: CardItem) => {
    if (card.is_correct || wait) return;

    if (clickedCount === 1) {
      updateCardStatus(card, true);
      setFirstChosenCard(card);
      setClickedCount((prev) => prev + 1);
    } else if (clickedCount > 1 && clickedCount < MAX_CLICKED_COUNT) {
      updateCardStatus(card, true);
      setChosenCards((prev) => [...prev, card]);
      setClickedCount((prev) => prev + 1);
    } else if (clickedCount >= MAX_CLICKED_COUNT) {
      updateCardStatus(card, true);

      checker(firstChosenCard!, [...chosenCards, card]);

      setFirstChosenCard(null);
      setChosenCards([]);
      setClickedCount(1);
    }
  };

  useEffect(() => {
    if (isShowWinModal) {
      const container = window.document.querySelector(".cards-fireworks");
      setFireworks(new Fireworks(container!, {}));
    }
  }, [isShowWinModal]);

  useEffect(() => {
    if (isCorrectAnswer) {
      fireworks?.start();
      setIsShowWinModal(true);
    }
  }, [isCorrectAnswer, fireworks]);

  return (
    <>
      {isShowWinModal && <div className={"cards-fireworks"} />}

      <div className={"cards"}>
        {cardsData
          .sort((a, b) => b.order - a.order)
          .map((card) => (
            <CardsItem
              key={card.id}
              card={card}
              onClickCard={() => onClickCard(card)}
            />
          ))}
      </div>

      {createPortal(
        isShowWinModal && (
          <Modal closeModal={() => onCloseWinModal()}>
            <WinMessage />
          </Modal>
        ),
        document.body,
      )}
    </>
  );
}
