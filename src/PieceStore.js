import { observable, action, decorate } from 'mobx';

import firebase from './firebase';
import AuthStore from './AuthStore';

export class Piece {
  text = '';
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}

const piecesData = JSON.parse(localStorage.getItem('pieces'))

const userId = (AuthStore.user && AuthStore.user.uid) || null;




class PieceStore {
 
  // pieces = AuthStore.!loggedIn ?  (piecesData || []) : 
  pieces = piecesData || [] ;
  selectedPieces = [];
  pieceFieldError = '';
  piecesToSelectFrom = [];
  selectedOption;
  selectionDone;
  lists;
  currentList = {
    id: '',
    name: ''
  };
  
  

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
  selectionDone:observable,
  currentList:observable,
  lists: observable
});
decorate(Piece, {
  text: observable,
});

export default new PieceStore();
