import oscarIcon from "../assets/oscar.png";
import bennyIcon from "../assets/benny.png";
import joulupukkiIcon from "../assets/joulupukki.png";
import pinguinIcon from "../assets/pinguin.png";
import { CardItem } from "../types/CardItem";

const DEFAULT_CARDS = [
  {
    id: 1,
    name: "Oscar",
    icon: oscarIcon,
  },
  {
    id: 2,
    name: "Oscar",
    icon: oscarIcon,
  },
  {
    id: 3,
    name: "Benny",
    icon: bennyIcon,
  },
  {
    id: 4,
    name: "Benny",
    icon: bennyIcon,
  },
  {
    id: 5,
    name: "Joulupukki",
    icon: joulupukkiIcon,
  },
  {
    id: 6,
    name: "Joulupukki",
    icon: joulupukkiIcon,
  },
  {
    id: 7,
    name: "Pinguin",
    icon: pinguinIcon,
  },
  {
    id: 8,
    name: "Pinguin",
    icon: pinguinIcon,
  },
];

export const CARDS = DEFAULT_CARDS.map((card) => ({
  ...card,
  order: Math.floor(Math.random() * DEFAULT_CARDS.length),
  is_flipped: false,
  is_correct: false,
})) as CardItem[];
