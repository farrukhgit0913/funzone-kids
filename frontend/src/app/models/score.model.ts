export interface Score {
  _id?: string;
  playerName: string;
  gameType: 'animal-matching' | 'shape-puzzle';
  score: number;
  level: number;
  timeTaken: number;
  createdAt?: Date;
}
