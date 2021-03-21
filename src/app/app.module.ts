import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { NonogramComponent } from './nonogram/nonogram.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    SudokuComponent,
    NonogramComponent,
    MainComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'minesweeper', component: MinesweeperComponent},
      {path: 'sudoku', component: SudokuComponent},
      {path: 'nonogram', component: NonogramComponent},
      {path: 'main', component: MainComponent},
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }