import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css', '../app.component.css']
})
export class MinesweeperComponent implements OnInit {
    width!: number;
    height!: number;
    mines!: number; //Number of mines
    cells!: number[][]; //[Collumn][Row], a mine is less than 0, not adjacent to a mine is 0, adjacent to x mines is x.
    solution!: number[][]; //Is the same size as cells, 0 is unrevealed empty, 1 is revealed empty, 2 is flagged but not mine, 3 is flagged mine
    hasLost!: boolean;
    hasWon!: boolean;
    correctFlags!: number; //Number of correct flags found in validation
    incorrect!: boolean; //Are any incorrect flags present
    firstClick!: boolean;

    //Generates a random int between given min and max, including those numbers
    getRandomIntInclusive(min:number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    //Places mines and sets adjacency values
    setupGame(width: number, height: number, mines: number) {

        //Creates the array and initializes to 0, plus other initialization stuff
        this.height = height;
        this.width = width;
        this.mines = mines;

        this.cells = [];
        this.solution = [];
        for (let i = 0; i < this.width; i++) {
            this.cells[i] = [];
            this.solution[i] = [];
            for (let j = 0; j < this.height; j++) {
                this.cells[i][j] = 0;
                this.solution[i][j] = 0;
            }
        }

        this.hasLost = false;
        this.hasWon = false;

        this.firstClick = true;
    }

    //Places Mines
    placeMines(x: number, y: number) {
        //mines are represented with negative numbers, so this confirms that the cell in question is not a mine
        if (this.cells[x][y] >= 0) {
            this.cells[x][y] = -20;

            //The following set of if statements increases the values of all adjacent cells by 1, if those cells exist
            if (x > 0) {
                this.cells[x - 1][y] += 1;
            }
            if (y > 0) {
                this.cells[x][y - 1] += 1;
            }
            if (x > 0 && y > 0) {
                this.cells[x - 1][y - 1] += 1;
            }
            if ((x < this.width - 1) && (y > 0)) {
                
                this.cells[x + 1][y - 1] = this.cells[x + 1][y - 1] + 1;
            }
            if ((x < this.width - 1)) {
                this.cells[x + 1][y] += 1;
            }
            if ((x < this.width - 1) && (y < this.height - 1)) {
                this.cells[x + 1][y + 1] += 1;
            }
            if ((y < this.height - 1)) {
                this.cells[x][y + 1] += 1;
            }
            if (x > 0 && (y < this.height - 1)) {
                this.cells[x - 1][y + 1] += 1;
            }
        }
        else {
            //If the previous location already has a mine, find a new one
            this.placeMines(this.getRandomIntInclusive(0, this.width-1), this.getRandomIntInclusive(0, this.height-1));
        }
    }

    //Flags cells believed to have mines on them
    onRClick(event: Event, x: number, y: number) {
        event.preventDefault();
        if (this.hasLost == false) {
            if (this.solution[x][y] == 1) {
                return; //If the cell is revealed, you cannot flag it
            }
            if (this.solution[x][y] == 0) {
                if (this.cells[x][y] >= 0) {
                    this.solution[x][y] = 2; //If cells[x][y] is not a mine, set a incorrect flag
                }
                else {
                    this.solution[x][y] = 3; //If cells[x][y] is a mine, set a correct flag
                }
            }
            else if (this.solution[x][y] == 2 || this.solution[x][y] == 3) {
                this.solution[x][y] = 0; //If they right click a flagged cell, unflag it
            }
        } 
    }

    onLClick(x: number, y: number) {
        if (this.hasLost == false || this.hasWon == true) {
            if (this.firstClick == true) {
                this.cells[x][y] = -100;

                for (let i = 0; i < this.mines; i++) {
                    this.placeMines(this.getRandomIntInclusive(0, this.width - 1), this.getRandomIntInclusive(0, this.height - 1));
                }

                this.cells[x][y] += 100;
                this.firstClick = false;
            }
            console.log(this.solution);
            this.revealCells(x, y);
            
        }
    }

    revealCells(x: number, y: number) {
        if (this.solution[x][y] == 1 || this.solution[x][y] == 2 || this.solution[x][y] == 3) {
            return; //You cannot reveal what is already revealed, or cells flagged as mines
        }
        else if (this.cells[x][y] > 0) {
            this.solution[x][y] = 1; //Revealing a cell adjacent to a mine reveals only that cell
        }
        else if (this.cells[x][y] < 0) {
            this.hasLost = true; //Revealing a mine ends the game
            alert("Game over, you stepped on a mine!");
        }
        else if (this.cells[x][y] == 0) {
            this.solution[x][y] = 1 //Revealing a cell that is not adjacent to a mine attempts to reveal all adjacent cells

            this.revealLeft(x, y);
            this.revealRight(x, y);
            this.revealUp(x, y);
            this.revealDown(x, y);

            this.solution[x][y] = 1;

        }
        
    }

    revealLeft(x: number, y: number) {
        var count: number;
        var done: boolean;

        count = 1;
        done = false;

        while (x - count >= 0 && done != true) {
            if (this.cells[x - count][y] > -1 && this.solution[x - count][y] == 0) {

                this.solution[x - count][y] = 1;


                if (this.cells[x - count][y] > 0) {
                    done = true;
                    break;
                }

                if (done == false) {
                    this.revealUp(x - count, y);
                    this.revealDown(x - count, y);
                }

                count++;
            }
            else {
                done = true;
            }
        }
    }

    revealRight(x: number, y: number) {
        var count: number;
        var done: boolean;

        count = 1;
        done = false;

        while (x + count < this.width && done != true) {
            if (this.cells[x + count][y] > -1 && this.solution[x + count][y] == 0) {
                this.solution[x + count][y] = 1;


                if (this.cells[x + count][y] > 0) {
                    done = true;
                    break;
                }

                if (done == false) {
                    this.revealUp(x + count, y);
                    this.revealDown(x + count, y);
                }

                count++;
            }
            else {
                done = true;
            }
        }
    }



    revealDown(x: number, y: number) {
        var count: number;
        var done: boolean;

        count = 1;
        done = false;

        while (y + count < this.height && done != true) {
            if ((this.cells[x][y + count] > -1) && this.solution[x][y + count] == 0) {
                this.solution[x][y + count] = 1;

                if (this.cells[x][y + count] > 0) {
                    done = true;
                    break;
                }

                if (done == false) {
                    this.revealLeft(x, y + count);
                    this.revealRight(x, y + count);
                }

                count++;
            }
            else {
                done = true;
            }
        }
    }



    revealUp(x: number, y: number) {
        var count: number;
        var done: boolean;

        count = 1;
        done = false;

        while (y - count >= 0 && done != true) {
            if (this.cells[x][y - count] >= 0 && this.solution[x][y - count] == 0) {
                this.solution[x][y - count] = 1;

                if (this.cells[x][y - count] > 0) {
                    done = true;
                    break;
                }
                this.revealLeft(x, y - count);
                this.revealRight(x, y - count);

                count++;
            }
            else {
                done = true;
            }
        }
    }

    validate() {
        this.incorrect = false;
        this.correctFlags = 0; //Clears previous values

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.solution[i][j] == 3) {
                    this.correctFlags += 1; //Making sure they've actually found all the mines and aren't just lucky
                }
                if (this.solution[i][j] == 2) {
                    this.incorrect = true;
                }
            }
        }
        if ((this.correctFlags == this.mines) && (this.incorrect == false)) {
            this.hasWon = true;
            alert("Congradulations, you win!")
        }
    }


title = 'Minesweeper';

  constructor() { }

  ngOnInit(): void {
  }

}
