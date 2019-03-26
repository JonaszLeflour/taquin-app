import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taquin-board',
  templateUrl: './taquin-board.component.html',
  styleUrls: ['./taquin-board.component.scss']
})
export class TaquinBoardComponent implements OnInit {
  boardTiles: number[];
  boardWinState: number[];
  boardRowLength: number = 4;
  boardColLength: number = 4;
  emptyTile: number = 0;
  

  constructor() {
    this.boardWinState = [1,2,3,4,
                          5,6,7,8,
                          9,10,11,12,
                          13,14,15,this.emptyTile];
    this.boardTiles = [1,2,3,4,
                        5,6,7,8,
                        9,10,11,12,
                        13,14,this.emptyTile,15];
   }

  rowLength() : number {
    return this.boardRowLength;
  }

  colLength() : number {
    return this.boardColLength;
  }

  //array start at 0
  getTile(x:number, y:number){
    return this.boardTiles[x + y*this.rowLength()];
  }

  setTile(x:number, y:number, val:number){
    this.boardTiles[x + y*this.rowLength()] = val;
  }

  canMove(x_from :number, y_from:number, x_to:number, y_to:number) : boolean{
    if(this.getTile(x_to, y_to) != this.emptyTile 
        || (Math.abs(x_from - x_to) + Math.abs(y_from - y_to) != 1) ) {
      return false
    }
    return true;
  }

  //return true if the tile is moved
  //tile can move to 0 if next to 0
  moveTile(x_from :number, y_from:number, x_to:number, y_to:number) : boolean{
    if(!this.canMove(x_from, y_from, x_to,y_to)){
      return false;
    }
    this.setTile(x_to, y_to, this.getTile(x_from, y_from));
    this.setTile(x_from, y_from, this.emptyTile);
    return true;
  }

  isGameWon() : Boolean {
    for(let i in this.boardTiles) {
        if(this.boardTiles[i] != this.boardWinState[i]) {
          return false;
      }
    }
    return true;
  }

  ngOnInit() {
  }



}
