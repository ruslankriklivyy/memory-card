import { DEFAULT_CARDS_BY_COUNT } from "../../constants/CARDS.ts";
import { CardsItem } from "./CardsItem.tsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CardItem } from "../../types/CardItem";
import { Modal } from "../UI/Modal.tsx";
import { createPortal } from "react-dom";
import { WinMessage } from "./WinMessage.tsx";
import { Fireworks } from "fireworks-js";
import { useGamesStore } from "../../stores/useGameStore.ts";
import { GameStatus } from "../../types/GameStatus.ts";
import { CardsHead } from "./CardsHead.tsx";
import { useLocation } from "react-router";

const MAX_CLICKED_COUNT = 2;

export function Cards() {
  const [cardsData, setCardsData] = useState<CardItem[]>([]);
  const [firstChosenCard, setFirstChosenCard] = useState<CardItem | null>(null);
  const [chosenCards, setChosenCards] = useState<CardItem[]>([]);
  const [clickedCount, setClickedCount] = useState<number>(1);
  const [isWait, setIsWait] = useState<boolean>(false);
  const [isShowWinModal, setIsShowWinModal] = useState<boolean>(false);
  const [fireworks, setFireworks] = useState<Fireworks | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio("/click.wav");
  }

  const location = useLocation();

  const {
    maxCardsCount,
    gameTime,
    gameStatus,
    setGameTime,
    setGameStatus,
    setGameResult,
  } = useGamesStore();

  const isCorrectAnswer = useMemo(
    () =>
      cardsData?.length ? cardsData.every((card) => card.is_correct) : false,
    [cardsData],
  );

  const prepareCards = useCallback(() => {
    const initCards = DEFAULT_CARDS_BY_COUNT[maxCardsCount];

    if (!initCards) return;

    setCardsData(
      initCards.map((card) => ({
        ...card,
        order: Math.floor(Math.random() * maxCardsCount),
        is_flipped: false,
        is_correct: false,
      })) as CardItem[],
    );
  }, [maxCardsCount]);

  const onCloseWinModal = () => {
    fireworks?.stop();
    setIsShowWinModal(false);
    setGameStatus(GameStatus.ACTIVE);
    setGameResult(null);
    setGameTime(0);

    prepareCards();

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
      setIsWait(true);

      setTimeout(() => {
        const updatedCardsData = newCardsData.map((card) => {
          if (cardsIds.includes(card.id) && !card.is_correct) {
            return { ...card, is_flipped: false };
          }
          return card;
        });

        setCardsData(updatedCardsData);
        setIsWait(false);
      }, 1000);
    } else {
      setCardsData(newCardsData);
    }
  };

  const onClickCard = (card: CardItem) => {
    if (card.is_correct || isWait) return;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch((err) => {
        console.error("Audio error", err);
      });
    }

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

      setGameResult({
        status: GameStatus.WIN,
        timeSpent: gameTime,
      });
      setGameStatus(GameStatus.WIN);
      setIsShowWinModal(true);
    }
  }, [isCorrectAnswer, fireworks]);

  useEffect(() => {
    setGameResult(null);
    prepareCards();
    setClickedCount(1);
    setFirstChosenCard(null);
    setChosenCards([]);
  }, [maxCardsCount]);

  useEffect(() => {
    if (
      location.pathname === "/game" &&
      gameStatus !== GameStatus.ACTIVE &&
      gameStatus !== GameStatus.WIN
    ) {
      setGameStatus(GameStatus.ACTIVE);
    }
  }, [location, gameStatus]);

  return (
    <>
      <CardsHead />

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
