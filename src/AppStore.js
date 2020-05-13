import { observable, action, decorate, toJS, computed } from 'mobx';
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
  pieceEntry;
  
  
  add = piece => {
      const userId = this.user.uid;
      const currentListRef = this.currentListId && firebase.database().ref('users/' + userId + '/lists/' + this.currentListId + "/pieces");
      currentListRef.push(new Piece(piece))
  };


  choose = p => {
    localStorage.setItem("currentListId", p);
    this.currentListId = p;
    this.pieceFieldError = '';
    this.listName =  this.lists[this.currentListId] && toJS(this.lists[this.currentListId].name);
  }
  
  createList = (name, afterFunc) => {
    const listsRef = firebase.database().ref('users/' + this.user.uid + '/lists');
    listsRef.push(
      {
        "name": name,
      }
    ).then((snap) => {
      const currentListId = snap.key;
      localStorage.setItem("currentListId", currentListId);
      this.currentListId = currentListId; 
      this.pieceFieldError = '';
      afterFunc();     
  })
}

get pieces() {
  const piecesObject =
      this.lists[this.currentListId] &&
      toJS(this.lists[this.currentListId].pieces);
      return piecesObject ? Object.values(piecesObject) : [];
   
}
  
  delete = p => {
    const userId = this.user.uid;
    if (this.pieceFieldError){
      if(this.pieceEntry === p[1].text){
        this.pieceFieldError = "";
      }
    }
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
//     return this.lists && this.lists[AppStore.currentListId] && this.lists[this.currentListId].name;
// }

}
decorate(AppStore, {
  pieces: computed,
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
  createList: action,
  localCurrentListId: observable,
  pieceEntry: observable
});
decorate(Piece, {
  text: observable,
});

export default new AppStore();

