import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

export interface Shape {
  id: string;
  name: string;
  symbol: string;
  color: string;
  bgColor: string;
  placed: boolean;
  isCorrect?: boolean;
}

export interface DropZone {
  id: string;
  targetShapeId: string;
  shape: Shape | null;
  label: string;
  hint: string;
  isCorrect: boolean;
  isWrong: boolean;
}

@Component({
  selector: 'app-shape-puzzle',
  templateUrl: './shape-puzzle.component.html',
  styleUrls: ['./shape-puzzle.component.css']
})
export class ShapePuzzleComponent implements OnInit, OnDestroy {
  allShapes: Shape[] = [
    { id: 'circle', name: 'Circle', symbol: '⭕', color: '#FF6B6B', bgColor: '#ffe0e0', placed: false },
    { id: 'triangle', name: 'Triangle', symbol: '🔺', color: '#FF8C00', bgColor: '#fff0d9', placed: false },
    { id: 'square', name: 'Square', symbol: '⬛', color: '#333', bgColor: '#f0f0f0', placed: false },
    { id: 'star', name: 'Star', symbol: '⭐', color: '#FFD700', bgColor: '#fffbe0', placed: false },
    { id: 'heart', name: 'Heart', symbol: '❤️', color: '#E91E63', bgColor: '#fce4ec', placed: false },
    { id: 'diamond', name: 'Diamond', symbol: '💎', color: '#00BCD4', bgColor: '#e0f7fa', placed: false },
    { id: 'moon', name: 'Moon', symbol: '🌙', color: '#9C27B0', bgColor: '#f3e5f5', placed: false },
    { id: 'sun', name: 'Sun', symbol: '☀️', color: '#FF9800', bgColor: '#fff3e0', placed: false },
    { id: 'flower', name: 'Flower', symbol: '🌸', color: '#E91E63', bgColor: '#fce4ec', placed: false },
    { id: 'lightning', name: 'Lightning', symbol: '⚡', color: '#FFC107', bgColor: '#fffde7', placed: false },
  ];

  shapes: Shape[] = [];
  dropZones: DropZone[] = [];
  draggedShape: Shape | null = null;
  score = 0;
  moves = 0;
  level = 1;
  timer = 0;
  timerInterval: any;
  gameWon = false;
  gameStarted = false;
  playerName = '';
  showNameInput = true;
  correctCount = 0;
  scoreMessage = '';
  showHints = true;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {}
  ngOnDestroy() { this.clearTimer(); }

  startGame() {
    if (!this.playerName.trim()) { alert('Please enter your name!'); return; }
    this.showNameInput = false;
    this.initGame();
  }

  initGame() {
    this.score = 0; this.moves = 0; this.correctCount = 0;
    this.timer = 0; this.gameWon = false; this.draggedShape = null;
    this.scoreMessage = '';

    const count = this.level === 1 ? 4 : this.level === 2 ? 6 : 8;
    const selected = [...this.allShapes]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(s => ({ ...s, placed: false }));

    this.shapes = [...selected].sort(() => Math.random() - 0.5);

    this.dropZones = selected.map(shape => ({
      id: `zone-${shape.id}`,
      targetShapeId: shape.id,
      shape: null,
      label: shape.name,
      hint: shape.symbol,
      isCorrect: false,
      isWrong: false
    })).sort(() => Math.random() - 0.5);

    this.gameStarted = true;
    this.startTimer();
  }

  // Drag & Drop
  onDragStart(shape: Shape) {
    if (shape.placed) return;
    this.draggedShape = shape;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, zone: DropZone) {
    event.preventDefault();
    if (!this.draggedShape || zone.shape !== null) return;
    this.placeShape(this.draggedShape, zone);
    this.draggedShape = null;
  }

  // Click-to-place fallback
  selectShape(shape: Shape) {
    if (shape.placed) return;
    if (this.draggedShape?.id === shape.id) {
      this.draggedShape = null;
    } else {
      this.draggedShape = shape;
    }
  }

  clickZone(zone: DropZone) {
    if (this.draggedShape && !zone.shape) {
      this.placeShape(this.draggedShape, zone);
      this.draggedShape = null;
    } else if (zone.shape && !zone.isCorrect) {
      // Remove shape from zone
      const shape = this.shapes.find(s => s.id === zone.shape!.id);
      if (shape) shape.placed = false;
      zone.shape = null;
      zone.isWrong = false;
    }
  }

  placeShape(shape: Shape, zone: DropZone) {
    this.moves++;
    zone.shape = shape;
    shape.placed = true;
    zone.isWrong = false;

    if (shape.id === zone.targetShapeId) {
      zone.isCorrect = true;
      this.correctCount++;
      this.score += Math.max(5, 20 - this.moves);
      if (this.correctCount === this.dropZones.length) {
        this.handleWin();
      }
    } else {
      zone.isWrong = true;
      this.score = Math.max(0, this.score - 3);
      setTimeout(() => {
        if (zone.isWrong) {
          shape.placed = false;
          zone.shape = null;
          zone.isWrong = false;
        }
      }, 800);
    }
  }

  handleWin() {
    this.clearTimer();
    this.gameWon = true;
    const timeBonus = Math.max(0, 120 - this.timer);
    this.score += timeBonus;
    this.scoreMessage = `⚡ Speed bonus: +${timeBonus} pts!`;

    this.apiService.saveScore({
      playerName: this.playerName,
      gameType: 'shape-puzzle',
      score: this.score,
      level: this.level,
      timeTaken: this.timer
    }).subscribe({ error: () => {} });
  }

  nextLevel() {
    this.level = Math.min(this.level + 1, 3);
    this.initGame();
  }

  startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => this.timer++, 1000);
  }

  clearTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  formatTime(s: number): string {
    return `${Math.floor(s / 60).toString().padStart(2,'0')}:${(s % 60).toString().padStart(2,'0')}`;
  }

  get availableShapes(): Shape[] {
    return this.shapes.filter(s => !s.placed);
  }

  goHome() { this.router.navigate(['/']); }
}
