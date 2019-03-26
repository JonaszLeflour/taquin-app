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

  suffleTiles(){
    var j, x, i;
    for (i = this.boardTiles.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.boardTiles[i];
        this.boardTiles[i] = this.boardTiles[j];
        this.boardTiles[j] = x;
    }
  }

  //array start at 0
  getTile(x:number, y:number):number{
    return this.boardTiles[x + y*this.rowLength()];
  }

  getTilePos(tile:number):number[]{
    let index = this.boardTiles.indexOf(tile);
    let y = Math.floor(index / this.boardRowLength);
    let x = index % this.boardRowLength;
    return [x, y];
  }

  setTile(x:number, y:number, val:number){
    this.boardTiles[x + y*this.rowLength()] = val;
  }

  canTileBeMoved(tile:number){
    let tilePos = this.getTilePos(tile);
    return this._canTileBeMoved(tilePos[0], tilePos[1]);
  }

  _canTileBeMoved(x:number,y:number): boolean {
    let emptyTilePos = this.getTilePos(this.emptyTile);
    return ((Math.abs(x - emptyTilePos[0]) + Math.abs(y - emptyTilePos[1])) == 1);
  }

  canTileMoveTo(x_from :number, y_from:number, x_to:number, y_to:number) : boolean{
    if(this.getTile(x_to, y_to) != this.emptyTile 
        ||  (Math.abs(x_from - x_to) + Math.abs(y_from - y_to) != 1)) {
      return false
    }
    return true;
  }

  moveTile(tile1: number, tile2: number):boolean{
    let posT1 = this.getTilePos(tile1);
    let posT2 = this.getTilePos(tile2);
    return this._moveTile(posT1[0],posT1[1], posT2[0], posT2[1]);
  }

  //return true if the tile is moved
  //tile can move to 0 if next to 0
  _moveTile(x_from :number, y_from:number, x_to:number, y_to:number) : boolean{
    if(!this.canTileMoveTo(x_from, y_from, x_to,y_to)){
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

  //drag and drop
  drag(event) {
    event.dataTransfer.setData("tile", event.target.id);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    let tileDragged = parseInt(event.dataTransfer.getData("tile"));
    let tileDroppedOn = parseInt(event.currentTarget.id);
    this.moveTile(tileDragged, tileDroppedOn);
  }

  showCouldNotMoveDialog(){

  }


  ngOnInit() {
  }



}
