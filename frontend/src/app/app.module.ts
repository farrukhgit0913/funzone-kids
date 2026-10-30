import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AnimalMatchingComponent } from './components/animal-matching/animal-matching.component';
import { ShapePuzzleComponent } from './components/shape-puzzle/shape-puzzle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimalMatchingComponent,
    ShapePuzzleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
