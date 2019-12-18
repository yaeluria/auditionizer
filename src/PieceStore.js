import { observable, action, decorate } from 'mobx';

export class Piece {
  text = '';
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}

class PieceStore {
  pieces = [];
  selectedPieces = [];
  pieceFieldError = '';
  piecesToSelectFrom = [];
  selectedOption;
  selectionDone;

  add = piece => {
    const isSame = this.pieces.some(pieceOnList => pieceOnList.text === piece);
    if (!piece) {
      this.pieceFieldError = 'Please enter a piece name';
    } else if (isSame){
      this.pieceFieldError = 'You already have this piece in your piece list';
    }
    else {
      this.pieces.push(new Piece(piece));
      this.pieceFieldError = undefined;
    }
  };

  delete = p => {
    const itemToRemove = this.pieces.find(item => item.id === p.id);
    this.pieces.remove(itemToRemove);
  };

  

  select = () => {
    if(this.piecesToSelectFrom.length === 0 && this.selectionDone !== true){
      this.piecesToSelectFrom = [...this.pieces]
    } 
    
    const randomNum = Math.floor(Math.random() * this.piecesToSelectFrom.length);
    this.selectedOption = this.piecesToSelectFrom[randomNum];
    this.piecesToSelectFrom = this.piecesToSelectFrom.filter(p => p !== this.selectedOption);
    if(this.piecesToSelectFrom.length === 0){
      this.selectionDone = true;
    }
  }

}
decorate(PieceStore, {
  pieces: observable,
  add: action,
  selectedOption: observable,
  delete: action,
  select: action,
  pieceFieldError: observable,
  piecesToSelectFrom: observable,
  selectionDone:observable
});
decorate(Piece, {
  text: observable,
});

export default new PieceStore();
