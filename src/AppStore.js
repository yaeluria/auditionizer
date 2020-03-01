import { observe, observable, action, decorate, toJS, computed } from 'mobx';
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
  currentListId = (this.lists.hasOwnProperty(localCurrentListId) && localCurrentListId) || null;
  loggedIn = false;
  user = null;
  openLogin = false;
  pieces = []; //maybe pieces should be computed



  add = piece => {
    if (piece && this.pieceFieldError === undefined) {
      const userId = this.user.uid;
      const currentListRef = firebase.database().ref('users/' + userId + '/lists/' + this.currentListId + "/pieces");
      currentListRef.push(new Piece(piece))
      console.log("pieces after adding", this.pieces)
    }
  };


  choose = p => {
    localStorage.setItem("currentListId", p);
    this.currentListId = p;
    const piecesObject =
      this.lists[this.currentListId] &&
      toJS(this.lists[this.currentListId].pieces);
    this.pieces = piecesObject ? Object.values(piecesObject) : [];
  }


  delete = p => {
    const userId = this.user.uid;
    const pieceToDeleteRef = firebase.database().ref('users/' + userId + '/lists/' + this.currentListId + "/pieces/" + p[0]);
    pieceToDeleteRef.remove();

  };

  select = () => {
    if (this.piecesToSelectFrom.length === 0 && this.selectionDone !== true) {
      this.piecesToSelectFrom = [...this.pieces]
    }

    const randomNum = Math.floor(Math.random() * this.piecesToSelectFrom.length);
    this.selectedOption = this.piecesToSelectFrom[randomNum];
    this.piecesToSelectFrom = this.piecesToSelectFrom.filter(p => p !== this.selectedOption);
    if (this.piecesToSelectFrom.length === 0) {
      this.selectionDone = true;
    }
  }

  exitSelection = () => {
    this.selectionDone = false;
    this.piecesToSelectFrom = [];
  }
}
decorate(AppStore, {
  pieces: observable,
  add: action,
  selectedOption: observable,
  delete: action,
  select: action,
  pieceFieldError: observable,
  piecesToSelectFrom: observable,
  selectionDone: observable,
  currentListId: observable,
  lists: observable,
  loggedIn: observable,
  user: observable,
  openLogin: observable,
});
decorate(Piece, {
  text: observable,
});

export default new AppStore();

