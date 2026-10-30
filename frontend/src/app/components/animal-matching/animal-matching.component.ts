import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Animal, AnimalCard } from '../../models/animal.model';

@Component({
  selector: 'app-animal-matching',
  templateUrl: './animal-matching.component.html',
  styleUrls: ['./animal-matching.component.css']
})
export class AnimalMatchingComponent implements OnInit, OnDestroy {
  cards: AnimalCard[] = [];
  flippedCards: AnimalCard[] = [];
  matchedCount = 0;
  score = 0;
  moves = 0;
  level = 1;
  gameStarted = false;
  gameWon = false;
  playerName = '';
  timer = 0;
  timerInterval: any;
  isChecking = false;
  animals: Animal[] = [];
  scoreMessage = '';
  matchMode: 'emoji-name' | 'emoji-sound' | 'emoji-emoji' = 'emoji-name';
  showNameInput = true;
  loadingAnimals = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loadAnimals();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  loadAnimals() {
    this.loadingAnimals = true;
    this.apiService.getAnimals().subscribe({
      next: (res) => {
        this.animals = res.data;
        this.loadingAnimals = false;
      },
      error: () => {
        // Fallback data if API is down
        this.animals = [
          { name: 'Dog', emoji: '🐶', sound: 'Woof!', soundEmoji: '🔊', difficulty: 1 },
          { name: 'Cat', emoji: '🐱', sound: 'Meow!', soundEmoji: '🔊', difficulty: 1 },
          { name: 'Cow', emoji: '🐮', sound: 'Moo!', soundEmoji: '🔊', difficulty: 1 },
          { name: 'Duck', emoji: '🦆', sound: 'Quack!', soundEmoji: '🔊', difficulty: 1 },
          { name: 'Pig', emoji: '🐷', sound: 'Oink!', soundEmoji: '🔊', difficulty: 1 },
          { name: 'Sheep', emoji: '🐑', sound: 'Baa!', soundEmoji: '🔊', difficulty: 2 },
        ];
        this.loadingAnimals = false;
      }
    });
  }

  startGame() {
    if (!this.playerName.trim()) { alert('Please enter your name!'); return; }
    this.showNameInput = false;
    this.initGame();
  }

  initGame() {
    this.score = 0; this.moves = 0; this.matchedCount = 0;
    this.timer = 0; this.gameWon = false; this.flippedCards = [];
    this.scoreMessage = '';

    const animalCount = this.level <= 1 ? 4 : this.level <= 2 ? 6 : 8;
    const shuffled = [...this.animals].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, animalCount);

    // Create pairs: emoji + name (or sound)
    this.cards = [];
    selected.forEach((animal, i) => {
      const pairId = `pair-${i}`;
      // Card A: emoji
      this.cards.push({
        id: `${pairId}-a`,
        animal,
        type: 'image',
        isFlipped: false,
        isMatched: false,
        content: animal.emoji
      });
      // Card B: name or sound
      const showSound = this.matchMode === 'emoji-sound';
      this.cards.push({
        id: `${pairId}-b`,
        animal,
        type: showSound ? 'sound' : 'name',
        isFlipped: false,
        isMatched: false,
        content: showSound ? animal.sound : animal.name
      });
    });

    this.cards = this.cards.sort(() => Math.random() - 0.5);
    this.gameStarted = true;
    this.startTimer();
  }

  flipCard(card: AnimalCard) {
    if (this.isChecking || card.isFlipped || card.isMatched) return;
    if (this.flippedCards.length >= 2) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
  }

  checkMatch() {
    this.isChecking = true;
    const [a, b] = this.flippedCards;

    // Match if same animal but different card types
    const isMatch = a.animal.name === b.animal.name && a.type !== b.type;

    setTimeout(() => {
      if (isMatch) {
        a.isMatched = true;
        b.isMatched = true;
        this.matchedCount++;
        this.score += Math.max(10, 30 - this.moves);

        const totalPairs = this.cards.length / 2;
        if (this.matchedCount === totalPairs) {
          this.handleWin();
        }
      } else {
        a.isFlipped = false;
        b.isFlipped = false;
        this.score = Math.max(0, this.score - 2);
      }
      this.flippedCards = [];
      this.isChecking = false;
    }, 900);
  }

  handleWin() {
    this.clearTimer();
    this.gameWon = true;
    const timeBonus = Math.max(0, 100 - this.timer);
    this.score += timeBonus;
    this.scoreMessage = `🎉 Amazing! +${timeBonus} time bonus!`;

    this.apiService.saveScore({
      playerName: this.playerName,
      gameType: 'animal-matching',
      score: this.score,
      level: this.level,
      timeTaken: this.timer
    }).subscribe({ error: () => {} });
  }

  nextLevel() {
    this.level = Math.min(this.level + 1, 3);
    this.initGame();
  }

  changeMode(mode: 'emoji-name' | 'emoji-sound' | 'emoji-emoji') {
    this.matchMode = mode;
  }

  startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => this.timer++, 1000);
  }

  clearTimer() {
    if (this.timerInterval) { clearInterval(this.timerInterval); }
  }

  formatTime(s: number): string {
    return `${Math.floor(s / 60).toString().padStart(2,'0')}:${(s % 60).toString().padStart(2,'0')}`;
  }

  get totalPairs(): number { return this.cards.length / 2; }

  goHome() { this.router.navigate(['/']); }
}
