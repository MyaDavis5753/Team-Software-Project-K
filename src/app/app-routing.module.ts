import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinesweeperComponent } from './minesweeper/minesweeper.component'
import { NonogramComponent } from './nonogram/nonogram.component'
import { SudokuComponent } from './sudoku/sudoku.component'

const routes: Routes = [
	{path: 'minesweeper', component: MinesweeperComponent}, 
	{path: 'nonogram', component: NonogramComponent}, 
	{path: 'sudoku', component: SudokuComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
