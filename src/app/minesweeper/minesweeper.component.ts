import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-minesweeper',
    templateUrl: './minesweeper.component.html',
    styleUrls: ['./minesweeper.component.css', '../app.component.css']
})
export class MinesweeperComponent implements OnInit {
    width!: number;
    height!: number;
    squares!: number[][]; // 0: empty, 1: filled
    solved!: number; // 0: no solution submitted, 1: solution incorrect, 2: solution correct
    solution!: number[][];

    constructor() {
    }

    ngOnInit() {
    }

    // initializes the grid to be all 0 (empty)
    generatePuzzle(width: number, height: number) {

        this.solution = [
            [1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1]
        ];

        this.width = width;
        this.height = height;
        this.squares = [];
        for (var i: number = 0; i < this.height; i++) {
            this.squares[i] = [];
            for (var j: number = 0; j < this.width; j++) {
                this.squares[i][j] = 0;
            }
        }
    }

    // updates the cell when left clicked
    onLClick(row: number, col: number) {
        if (this.squares[row][col] == 1) { // if filled, turn empty
            this.squares[row][col] = 0;
        } else { // otherwise, turn filled
            this.squares[row][col] = 1;
        }
    }

    // updates the cell when right clicked
    onRClick(event: Event, row: number, col: number) {
        event.preventDefault();
        if (this.squares[row][col] == 0) { // if empty, turn filled
            this.squares[row][col] = 1;
        } else { // otherwise, turn empty
            this.squares[row][col] = 0;
        }
    }

    // checks if the solution submitted is valid, marks solved as 2 if correct or 1 if incorrect
    // sets valid[r] or valid[c] as false if the row or column respectively contains an incorrect cell
    validate() {
        this.solved = 2;
        for (var i: number = 0; i < this.height; i++) {
            for (var j: number = 0; j < this.width; j++) {
                if (this.solution[i][j] != this.squares[i][j]) {
                    this.solved = 1;
                }
            }
        }
    }

}
