import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css', '../app.component.css']
})
export class SudokuComponent implements OnInit {

  width!: number;
  height!: number;
  squares!: number[][];
  difficulty!: number;//1==easy,2==medium;3==hard;4==expert
  solution!: number[][];

  constructor() { }

  ngOnInit(): void {
  }
  generatePuzzle(width: number, height: number){

  this.solution=[
    [],[],[],
    [],[],[],
    [],[],[],
  ]
  var validEntryC = new Array(9)//confirms a valid entry for the collums
  var validEntryB = new Array(9).fill(false)//confirms a valid entry for the box
  var newI=true;
    for(var j=0; j<9;){
      for (var i=0; i<9;){
        if(newI){
          newI=false;
          this.BoxChecker(this.BoxCheckerDeterminer(i,j),validEntryB)//mark invalid every number already in box
          this.ColChecker(validEntryC,i,j,validEntryB)//mark invalid every number in collumn, saving those numbers, in case of box and column overlap
        }
        var n=Math.floor(Math.random()*9+1);  
        if(validEntryB[n]==false){
          this.solution[j][i]==n
          validEntryB[n]=true
          this.ColRemover(validEntryC,validEntryB)
          i++
          newI=true
        }
      }
      for(var k=0;k<validEntryB.length;k++){
        validEntryB[k]=false;
      }
      j++;
    }
  }
  BoxCheckerDeterminer(i: number,j:number){
    var boxnum;
    if(j<3){boxnum=Math.ceil(i+1/3)}
    else if(j<6){boxnum=Math.ceil(i+1/3)+3}
    else(boxnum=Math.ceil(i+1/3)+6)
    return boxnum;
  }
  BoxChecker(boxnum:number,B:Array<Boolean>){
    var v=(boxnum-1)%3+2//(boxnum%3)(if boxnum%3=0; change to 3)
    var h=3*(boxnum%3)-1
    if(h==-1)h=8
    var i=0;var j=h
    while(i<3){
      if(this.solution[v-i][j]>0){B[this.solution[v-1][j]]=true}
      j--;
      if(j=h-3){i--;j=h;}
    } 
  }
  ColChecker(C: Array<number>,i:number,j:number,B:Array<boolean>){
    var k=0;
    while(j>=0){
      C[k]=this.solution[j][i]
      B[this.solution[j][i]]=true
      j--;k++
    }
  } 
  ColRemover(C:Array<number>,B:Array<boolean>){
    var k=C.length-1;
    while(k>=0){
      B[C[k]]=false
      k++
    }
  }
  /*

How Sudoku Works
  1 2 3
  4 5 6
  7 8 9
Make the puzzle(This took way to long to write out, but I think I got it all)
  9x9 Array of ints(A)(set all to -1 on init) 
  9 Array of bools(B)(starting all false)
  9 Array of Col ints C, and counter k
  newI=true;
  puzzleMaker(
    For int j=0; j<9
      for int i=0; i<9{
        if(newI){
          newI=false;
          if(i%3==0)(BoxChecker(BoxCheckerDeterminer(i,j),A,B))
          ColChecker(A,i,j,B)
        }
        n=rand num(1-9);  
        if(B[n]==false){
          A[j][i]==n
          B[n]=true
          ColRemover(A,i,j,B)
          i++
          newI=true
        }
      }
      B resets to all false;
      j++;
    }
  )
  BoxCheckerDeterminer(i,j){
    if(j<3){boxnum=ceil(i/3)}
    else if(j<6){boxnum=ceil(i/3)+3}
    else(boxnum=ceil(i/3)+6)
  }
  boxConflictChecker(needs box number,A,B)(
    v=(boxnum-1)%3+2(boxnum%3)(if boxnum%3=0; change to 3)
    h=3*(boxnum%3)-1
    if(h==-1)h=8
    i=0;j=h
    while(i<3){
      if(A[v-i][j]>0){B[A[v-1][j]]=true}
      j--;
      if(j=h-3){i--;j=h;}
    } 
  )
  ColChecker(A,i,j,B){
    while(j>=0){
      C[k]=A[j][i]
      B[A[j][i]]=true
      j--;k++
    }
  } 
  ColRemover(A,B){
    while(k>=0){
      B[C[k]}=false
      j--;k++
    }
  }

 Now with the puzzle made in Array A, transfer it to a subset of boxes(I'm not writeing this out on Thurs as I'm doing this)
 Bassically every "isCorrect" turns into whatever the coresponding spot holds in the Array

Set Dificulty:
  Easy =4
  Medium =3.3
  Hard = 3
  Expert =2.5    

  For each Box in the Grid;
    Revealed=(generate randome 0-1 num);
    if(Dificulty/9=<randnum){holding=isCorrect}
    else(holding=userInput;)

    anglular material
*/
}
