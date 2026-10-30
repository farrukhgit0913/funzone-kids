import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stats: any = null;
  leaderboard: any[] = [];
  selectedGame = '';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getStats().subscribe({
      next: (res: any) => this.stats = res.data,
      error: () => console.log('Stats not available (backend may be offline)')
    });

    this.apiService.getLeaderboard(undefined, 5).subscribe({
      next: (res: any) => this.leaderboard = res.data,
      error: () => {}
    });
  }

  navigateTo(game: string) {
    this.router.navigate([`/${game}`]);
  }
}
