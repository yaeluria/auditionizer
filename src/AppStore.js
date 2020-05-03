import { observe, observable, action, decorate, toJS, computed } from 'mobx';
import firebase from './firebase';
import App from './App';

export class Piece {
  text = '';
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}
// const localCurrentListId = localStorage.getItem("currentListId")


class AppStore {

  localCurrentListId = localStorage.getItem("currentListId");
  selectedPieces = [];
  pieceFieldError = '';
  piecesToSelectFrom = [];
  selectedOption;
  selectionDone;
  lists = {};
  // currentListId;
  currentListId = (this.lists.hasOwnProperty(this.localCurrentListId) && this.localCurrentListId) || undefined;
  loggedIn = false;
  user = null;
  openLogin = false;
  pieces = []; //maybe pieces should be computed
  listName;


  add = piece => {
    if (piece && this.pieceFieldError === undefined) {
      console.log(toJS(this.lists));
      const userId = this.user.uid;
      const currentListRef = this.currentListId && firebase.database().ref('users/' + userId + '/lists/' + this.currentListId + "/pieces");
      currentListRef.push(new Piece(piece))
    }
  };


  choose = p => {
    localStorage.setItem("currentListId", p);
    this.currentListId = p;
    const piecesObject =
      this.lists[this.currentListId] &&
      toJS(this.lists[this.currentListId].pieces);
    this.pieces = piecesObject ? Object.values(piecesObject) : [];
    this.listName =  this.lists[this.currentListId] && toJS(this.lists[this.currentListId].name);
  }
  


  createList = (name, afterFunc) => {
    const listsRef = firebase.database().ref('users/' + this.user.uid + '/lists');
    listsRef.push(
      {
        "name": name,
      }
    ).then((snap) => {
      console.log(1);
      const currentListId = snap.key;
      console.log(currentListId);
      localStorage.setItem("currentListId", currentListId);
      this.currentListId = currentListId; 
      console.log(this.currentListId);
      afterFunc();     
  })
  // .then((currentListId) => {
  //     // AppStore.currentListId = currentListId;

  //     afterFunc();
  //     console.log(2);
  //     console.log(currentListId);
  // })
}
  
  
  delete = p => {
    const userId = this.user.uid;
    const pieceToDeleteRef = firebase.database().ref('users/' + userId + '/lists/' + this.currentListId + "/pieces/" + p[0]);
    pieceToDeleteRef.remove();
  };

  deleteList = p => {
    const userId = this.user.uid;
    const listToDeleteRef = firebase.database().ref('users/' + userId + '/lists/' + p);
    listToDeleteRef.remove();
    console.log(toJS(this.lists));
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

//   get listName() {
//     return this.list && this.lists[AppStore.currentListId] && this.lists[this.currentListId].name;
// }
  // AppStore.lists && AppStore.lists[AppStore.currentListId] && AppStore.lists[AppStore.currentListId].name)
  // || "No Name"
}
decorate(AppStore, {
  pieces: observable,
  add: action,
  selectedOption: observable,
  delete: action,
  deleteList: action,
  select: action,
  pieceFieldError: observable,
  piecesToSelectFrom: observable,
  selectionDone: observable,
  currentListId: observable,
  lists: observable,
  loggedIn: observable,
  user: observable,
  openLogin: observable,
  listName: observable,
  createList: action,
  localCurrentListId: observable
});
decorate(Piece, {
  text: observable,
});

export default new AppStore();

