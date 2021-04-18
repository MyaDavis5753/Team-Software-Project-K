import { Component, OnInit } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';

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
  solved!: boolean

  constructor() { }

  ngOnInit(): void {
    this.difficulty=4;
  }
  setDifficulty(){
    this.difficulty=this.difficulty-.5;
    if(this.difficulty==2){
      this.difficulty=4;
    }
  }
  //check to see if the puzzle is right
  validate(){
    this.solved=true
    for(var i=0;i<this.height;i++){
      for(var j=0;j<this.width;j++){
        if(this.solution[i][j]!=this.squares[i][j]){
          this.solved=false;
          break
        }
      }
    }
    return this.solved
  }
  
  generatePuzzle(difficulty: number){
//create baseline arrays for each of what we are going to use, arranged this way to note that they should have patterns of a 3x3 grid
  this.squares=[
    [],[],[],
    [],[],[],
    [],[],[],
  ]
  this.solution=[
    [],[],[],
    [],[],[],
    [],[],[],
  ]

  //get some inital parameters set.  
    this.width = 9;
    this.height = 9;
    for(var i=0;i<this.height;i++){
      for(var j=0;j<this.width;j++){
        this.solution[i][j]=0
      }
    }
    var validEntryB = new Array(10).fill(false)
  /*  for(var k=0;k<35;k=k+4){
      this.BoxMaker(k%9+1,validEntryB)
    } */
    //generate a row of random numbers 1-9, without doubling down on any number.
    var rows=new Array(9)
    for(var k=0;k<this.width;){
      var n=Math.floor(Math.random()*9+1)
      if(!validEntryB[n]){
        rows[k]=n
        k++
        validEntryB[n]=true;
      }
    }
    //this is where we make the puzzle, needing to shift our row of numbers 3 times.
    //either with a single increase, double increase, or no increase to our row.
    var used=new Array(3).fill(false)
    var count=Math.floor(Math.random()*3)
    used[count]=true
    for(var i=0;i<this.height;i++){
      if(i%3==0&&i!=0){//make it so our shift by 1 2 or 0 is randomized, but non-repetitions.
        while(used[count]){count=Math.floor(Math.random()*3)}
        used[count]=true
      }
      for(var j=0;j<this.width;j++){
        //fill the puzzle with the numbers from our row, ensuring that no number ends up in the same collumn
        this.solution[i][j]=rows[(j+i*3+count)%9]        
        //what we show, based of difficulty
        this.squares[i][j]=this.difficulty/9>Math.random()?this.solution[i][j]:null
      }
    }
    //loged for testing purposes
    console.log(this.solution)
    console.log(this.squares)
  }

  /*Welcome to the graveyard of failed ideas.
  //make each box indivually, going from 1-5-9-4...., didn't work out well.
  // BoxMaker(rows:Array<number>,used:Array<boolean>,k:number){
  //   var n=Math.floor(Math.random()*3)
  //   while(used[n]==true){n=Math.floor(Math.random()*3)}
  //   used[n]=true
  //   for(var l=k;l<l+3;l++){
  //     for(var j=0;j<this.width;j++){
  //       this.solution[l][j]=rows[(n+j)%9]
  //     }
  //     n=n+3
  //   }
  // }
  /*
  BoxMaker(boxnum:number,validEntryB:Array<boolean>){
    var indicies =this.BoxIndeciesFinder(boxnum)
    var h=indicies[0]
    var w=indicies[1]
    for (var i: number = h; i < 3+h;i++) {
       for (var j: number = w;  j < 3+w;) {
         this.colChecker(8,j,validEntryB)
         this.rowChecker(i,9,validEntryB)
         this.boxChecker(i,j,validEntryB)
        console.log(validEntryB)
        var n=Math.floor(Math.random()*9+1)
        var count=0
        while(count<=9){
          if(!validEntryB[n]||count==9){
            this.solution[i][j]=count==9?-1:n
            this.colRemover(i,j,validEntryB);
            this.rowRemover(i,j,validEntryB);
            this.boxRemover(i,j,validEntryB);
            j++;
            break
          }
          n=n%9+1
          count++
        } 
      }
    }
  } 
  //check the collumn for a like number and mark it
    colChecker(i:number,j:number,B:Array<boolean>){
      while(i>=0){
        B[this.solution[i][j]]=true;
        i--;
      }
    }
    //remove marked numbers that were in the collunm
    colRemover(i:number,j:number,B:Array<Boolean>){
      while(i>=0){
        B[this.solution[i][j]]=false;
        i--;
      }
    }
    //check the row for like numbers and mark thm
    rowChecker(i:number,j:number,B:Array<boolean>){
      while(j>=0){
        B[this.solution[i][j]]=true;
        j--;
      }
    }
    //remove marked numbers in the row
    rowRemover(i:number,j:number,B:Array<Boolean>){
      while(j>=0){
        B[this.solution[i][j]]=false;
        j--;
      }
    }
    //When given 2 indeicies(row, collum), return the box number
   BoxNumberDeterminer(i: number,j:number){
      var boxnum;
      if(i<3){boxnum=Math.ceil((j+1)/3)}
      else if(i<6){boxnum=Math.ceil((j+1)/3)+3}
      else(boxnum=Math.ceil((j+1)/3)+6)
      return boxnum;
    }
    //when given a boxnumber, return the indicies(row,collom), where that box starts
    BoxIndeciesFinder(boxnum:number){
      var indecies = new Array(2)
      if(boxnum%3==1){
        indecies[0]=boxnum-1
        indecies[1]=0
      }
      if(boxnum%3==2){
        indecies[0]=boxnum-2
        indecies[1]=3
      }
      if(boxnum%3==0){
        indecies[0]=boxnum-3
        indecies[1]=6
      }
      return indecies
    }
    //make sure there are no similar values in a box
  boxChecker(i:number,j:number,B:Array<Boolean>){
    var boxnum=this.BoxNumberDeterminer(i,j)
    while(i>=0&&boxnum==this.BoxNumberDeterminer(i,j)){
      while(boxnum==this.BoxNumberDeterminer(i,j)){
        B[this.solution[i][j]]=true
        j--;
      }
      j=j+3
      i--
    }
  }
  //reset the checker for the box
  boxRemover(i:number,j:number,B:Array<Boolean>){
    var boxnum=this.BoxNumberDeterminer(i,j)
    while(i>=0&&boxnum==this.BoxNumberDeterminer(i,j)){
      while(boxnum==this.BoxNumberDeterminer(i,j)){
        B[this.solution[i][j]]=false
        j--;
      }
      j=j+3
      i--
    }
  }

/* generates individual rows with nums 1-9 in rand order.
this.width = 9;
    this.height = 9;
    var validEntryB = new Array(10).fill(false)
    for (var i: number = 0; i < this.height; i++) {
      this.squares[i] = [];
      for (var j: number = 0;  j < this.width;) {
        var n=Math.floor(Math.random()*9+1)
        if(!validEntryB[n]){
          this.squares[i][j] = n
          validEntryB[n]=true
          j++;
        }
      }
      for(var k: number=0;k<validEntryB.length;k++){
        validEntryB[k]=false;
      }
    } */

    /*
  var validEntryC = new Array(9)//confirms a valid entry for the collums
  var newI=true;
    for(var i=0; i<9;){
      for (var j=0; j<9;){
        if(newI){
          newI=false;
          this.BoxChecker(this.BoxNumberDeterminer(i,j),validEntryB)//mark invalid every number already in box
          this.ColChecker(validEntryC,i,j,validEntryB)//mark invalid every number in collumn, saving those numbers, in case of box and column overlap
        }
        var n=Math.floor(Math.random()*9+1);  
        if(validEntryB[n]==false){
          this.squares[i][j]==n
          validEntryB[n]=true
          this.ColRemover(validEntryC,validEntryB)
          j++
          newI=true
        }
      }
      for(var k=0;k<validEntryB.length;k++){
        validEntryB[k]=false;
      }
      j++;
    }*/
  
    
  /*
  Above is code that I actually wrote bassed on the pseudocode blow
  the above is the true code for generating a puzzle, to be tested once I can
  see the base numbers in the grid.
  /*

How Sudoku Works
  1 2 3
  4 5 6
  7 8 9

    this.width=9;
    this.height=9;

  }

  BoxChecker(boxnum:number,B:Array<boolean>){
      var vert=0;
      var horz=0;
      if(boxnum<=3){vert=2}
      else if(boxnum<=6){vert=5}
      else{vert=8}//last index of col where the box ends
      if(boxnum%3==1){horz=2}
      if(boxnum%3==2){horz=5} 
      if(boxnum%3==0){horz=8}//last index of row where box ends
      var i=0;
      var j=horz;
      while(j>vert-3){
        if(this.squares[j][horz-i]>0){
          B[this.squares[j][horz-i]]=true;
        }
        i++;
        if(i==3){
          j--;
          i=0;
        }
      }
    }
    ColChecker(C: Array<number>,i:number,j:number,B:Array<boolean>){
      var k=0;
      i=i-1
      while(i>=0){
        C[k]=this.squares[i][j]
        B[C[k]]=true
        i--;k++
      }
    } 
    ColRemover(C:Array<number>,B:Array<boolean>){
      var k=0;
      while(k<C.length&&C[k]>0){
        if(C[k]>0){
          B[C[k]]=false
          C[k]=-1
        }
        k++
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
