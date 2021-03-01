import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { NonogramComponent } from './minesweeper/nonogram/nonogram.component';
import { SudokuComponent } from './minesweeper/sudoku/sudoku.component';

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    NonogramComponent,
    SudokuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
