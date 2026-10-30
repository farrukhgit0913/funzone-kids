import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnimalMatchingComponent } from './components/animal-matching/animal-matching.component';
import { ShapePuzzleComponent } from './components/shape-puzzle/shape-puzzle.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'animal-matching', component: AnimalMatchingComponent },
  { path: 'shape-puzzle', component: ShapePuzzleComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
