import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material';

interface Puzzle {
  time: number; //The current time elasped since the start of the puzzle
  hasSolved: boolean; //Has the puzzle been solved
  isCorrect: boolean; //Is correct up until now

  checkPuzzleForCorrectness(): boolean;
  isPuzzleSolved(): boolean;
  generatePuzzle(): boolean; //Returns false on an error, otherwise true
  checkTime(): number;
}

@Component({
  selector: 'app-minesweeper-component',
  templateUrl: './minesweeper.component.html'
})  

export class MinesweeperComponent implements Puzzle {
  checkPuzzleForCorrectness() : boolean {
    return this.isCorrect;
  }

  isPuzzleSolved(): boolean {
    return this.isPuzzleSolved
  }

  generatePuzzle() : boolean {

    return true;
  }

  checkTime() : number {
    return this.time;
  }
}