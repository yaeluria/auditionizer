import { observable, action, decorate, toJS, computed } from 'mobx';
import firebase from './firebase';

export class Piece {
  text = '';
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}
const localCurrentListId = localStorage.getItem("currentListId")

class AppStore {
  selectedPieces = [];
  pieceFieldError = '';
  piecesToSelectFrom = [];
  selectedOption;
  selectionDone;
  lists = {};
  currentListId = (this.lists.hasOwnProperty(localCurrentListId) && localCurrentListId) || null ;
  loggedIn = false;
  user = null;
  openLogin = false;
  pieces = [];
  

  
  add = piece => {
    console.log("currentListId", this.currentListId);
    console.log("lists", toJS(this.lists));
    
    console.log("pieces of current list" , toJS(this.lists[this.currentListId].pieces))
    console.log("pieces before adding" , toJS(this.pieces))
    const isSame = this.pieces && this.pieces.some(pieceOnList => pieceOnList.text === piece);
    if (!piece) {
      this.pieceFieldError = 'Please enter a piece name';
    } else if (isSame){
      this.pieceFieldError = 'You already have this piece in your piece list';
    }
    else {
      this.pieceFieldError = undefined;
      const userId = this.user.uid;
      const currentListRef = firebase.database().ref('users/' + userId+ '/lists/' + this.currentListId + "/pieces" );
      currentListRef.push(new Piece(piece))}
      console.log(toJS(this.pieces));
  };

  choose = p => {
    this.currentListId = p;
  }

  delete = p => {
    console.log(toJS(this.pieces));
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
decorate(AppStore, {
  // pieces: observable,
  pieces: observable,
  add: action,
  selectedOption: observable,
  delete: action,
  select: action,
  pieceFieldError: observable,
  piecesToSelectFrom: observable,
  selectionDone:observable,
  currentListId:observable,
  lists: observable,
  loggedIn: observable,
  user: observable,
  openLogin: observable,
});
decorate(Piece, {
  text: observable,
});

export default new AppStore();
