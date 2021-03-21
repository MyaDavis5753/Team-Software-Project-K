import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nonogram',
  templateUrl: './nonogram.component.html',
  styleUrls: ['./nonogram.component.css']
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
    this.generateClues(); //TEMP method

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

    this.maxCluesInCol = 0;
    this.maxCluesInRow = 0;
    for (var i: number = 0; i < this.width; i++) {
      if (this.clues[i].length > this.maxCluesInCol) {
        this.maxCluesInCol = this.clues[i].length;
      }
    }
    for (var i: number = this.width; i < this.clues.length; i++) {
      if (this.clues[i].length > this.maxCluesInRow) {
        this.maxCluesInRow = this.clues[i].length;
      }
    }

    var cluesTopTemp = [];
    for (var i: number = 0; i < this.width; i++) {
      cluesTopTemp[i] = this.clues[i];
      var shamt = this.maxCluesInCol - this.clues[i].length
      for (var n: number = 0; n < shamt; n++) {
        cluesTopTemp[i].unshift(0);
      }
    }
    this.cluesTop = [];
    for (var i: number = 0; i < this.maxCluesInCol; i++) {
      this.cluesTop[i] = [];
      for (var j: number = 0; j < this.width; j++) {
        this.cluesTop[i][j] = cluesTopTemp[j][i];
      }
    }

    this.cluesLeft = [];
    for (var i: number = 0; i < this.height; i++) {
      this.cluesLeft[i] = this.clues[i+this.width];
      var shamt = this.maxCluesInRow - this.clues[i+this.width].length;
      for (var n: number = 0; n < shamt; n++) {
        this.cluesLeft[i].unshift(0);
      }
    }
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
}
