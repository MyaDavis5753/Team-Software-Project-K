import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinesweeperComponent } from './minesweeper/minesweeper.component'

const routes: Routes = [
	{path: 'minesweeper', component: MinesweeperComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
