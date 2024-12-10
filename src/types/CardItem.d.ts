export interface CardItem {
  id: number;
  name: string;
  icon: string;
  order: number;
  is_correct?: boolean;
  is_flipped: boolean;
}
