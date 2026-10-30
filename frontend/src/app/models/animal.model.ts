export interface Animal {
  _id?: string;
  name: string;
  emoji: string;
  sound: string;
  soundEmoji: string;
  difficulty: number;
}

export interface AnimalCard {
  id: string;
  animal: Animal;
  type: 'image' | 'name' | 'sound';
  isFlipped: boolean;
  isMatched: boolean;
  content: string;
}
