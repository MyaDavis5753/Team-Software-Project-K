import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nonogram',
  templateUrl: './nonogram.component.html',
  styleUrls: ['./nonogram.component.css', '../app.component.css']
})
export class NonogramComponent implements OnInit {
  width!: number;
  height!: number;
  maxCluesInCol!: number;
  maxCluesInRow!: number;
  squares!: number[][]; // 0: empty, 1: filled, 2: undefined
  cluesTop!: number[][];
  cluesLeft!: number[][];
  clues!: number[][]; // the first part of clues holds clues for the top of the puzzle (cols),
    // and second part holds clues for the left side (rows)
    // i.e. assuming 5x5, clues[0]-clues[4] hold top, and clues[5]-clues[9] hold for the side
  valid!: boolean[]; // array telling whether each col/row is valid, first part is cols, second part is rows
  solved!: number; // 0: no solution submitted, 1: solution incorrect, 2: solution correct
  solution!: number[][];

  constructor() {
   }

  ngOnInit() {
  }

  // initializes the grid to be all 2 (undefined) and generates the clues
  generatePuzzle(width: number, height: number) {
    this.generateClues();

    this.solution = [
      [1,1,1,1,1],
      [1,0,1,0,1],
      [1,1,0,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,0,0,0,1]
    ];

    this.valid = new Array(this.width + this.height).fill(true);

    this.width = width;
    this.height = height;
    this.squares = [];
    for (var i: number = 0; i < this.height; i++) {
      this.squares[i] = [];
      for (var j: number = 0;  j < this.width; j++) {
        this.squares[i][j] = 2;
      }
    }
  }

  // generates the clues to display on top and left side of the puzzle, guaranteeing a unique solution
  generateClues() {
    // TEMP assuming 5x6
    this.clues = [[6],[1,3],[2,2],[1,3],[6],
                  [5],[1,1,1],[2,2],[5],[5],[1,1]];
    this.maxCluesInCol = this.findMaxLength(this.clues.slice(0, this.width));
    this.maxCluesInRow = this.findMaxLength(this.clues.slice(this.width));

    this.cluesTop = this.transpose(this.generateCluesDisplay(this.clues.slice(0, this.width), this.maxCluesInCol));
    this.cluesLeft = this.generateCluesDisplay(this.clues.slice(this.width), this.maxCluesInRow);
  }

  // updates the cell when left clicked
  onLClick(row: number, col: number) {
    if (this.squares[row][col] == 1) { // if filled, turn undefined
      this.squares[row][col] = 2;
    } else { // otherwise, turn filled
      this.squares[row][col] = 1;
    }
  }

  // updates the cell when right clicked
  onRClick(event: Event, row: number, col: number) {
    event.preventDefault();
    if (this.squares[row][col] == 0) { // if empty, turn undefined
      this.squares[row][col] = 2;
    } else { // otherwise, turn empty
      this.squares[row][col] = 0;
    }
  }

  // checks if the solution submitted is valid, marks solved as 2 if correct or 1 if incorrect
  // sets valid[r] or valid[c] as false if the row or column respectively contains an incorrect cell
  validate() {
    this.valid.fill(true);
    this.solved = 2;
    for (var i: number = 0; i < this.height; i++) {
      for (var j: number = 0; j < this.width; j++) {
        if (this.solution[i][j] == 1 // if cell should be filled and isn't
           && this.solution[i][j] != this.squares[i][j]
           || this.solution[i][j] == 0 // or if cell should be empty but is filled (undefined is fine)
           && this.squares[i][j] == 1) {
          this.valid[this.width + i] = false;
          this.valid[j] = false;
          this.solved = 1;
        }
      }
    }
  }

  // finds the max length of a subarray in a 2D array, e.g. [[2],[2],[2,2,2]] returns 3
  findMaxLength(arr: number[][]) {
    var max = 0;
    for (var i: number = 0; i < arr.length; i++) {
      if (arr[i].length > max) {
        max = arr[i].length;
      }
    }
    return max;
  }

  // generates a 2D array of the clues to display, with 0's in place of empty spots
  // arr: original 2D array of clues
  // maxLength: max number of clues in one row/col of arr
  generateCluesDisplay(clues: number[][], maxLength: number) {
    var cluesDisplay = [];
    for (var i: number = 0; i < clues.length; i++) {
      cluesDisplay[i] = clues[i];
      var shamt = maxLength - clues[i].length
      for (var n: number = 0; n < shamt; n++) { // adds 0's (empty spots) before the clue in the 2D array
        clues[i].unshift(0);
      }
    }
    return cluesDisplay;
  }

  // transposes a 2D array i.e. its rows become its columns and vice versa
  transpose(arr: number[][]) {
    var clues: number[][] = [];
    for (var i: number = 0; i < arr[0].length; i++) {
      clues[i] = [];
      for (var j: number = 0; j < arr.length; j++) {
        clues[i][j] = arr[j][i];
      }
    }
    return clues;
  }
}
