import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css', '../app.component.css']
})
export class MinesweeperComponent implements OnInit {

title = 'Minesweeper';

  constructor() { }

  ngOnInit(): void {
  }

}
