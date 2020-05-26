import { observable, action, decorate, toJS, computed } from 'mobx';
import firebase from './firebase';

export class Piece {
  text = '';
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}

class AppStore {

  localCurrentListId = localStorage.getItem("currentListId");
  selectedPieces = [];
  pieceFieldError = '';
  piecesToSelectFrom = [];
  selectedOption;
  selectionDone;
  lists = {};
  loggedIn = false;
  user = null;
  pieceEntry;
  
  
  add = piece => {
      const userId = this.user.uid;
      const currentListRef = this.currentListId && firebase.database().ref('users/' + userId + '/lists/' + this.currentListId + "/pieces");
      currentListRef.push(new Piece(piece))
  };
  
  get currentListId () {
    if(this.localCurrentListId){
      return this.lists.hasOwnProperty(this.localCurrentListId) && this.localCurrentListId;
    }
    else{
      return Object.keys(toJS(this.lists)).slice(-1)[0];
    }
  }

  choose = p => {
    localStorage.setItem("currentListId", p);
    this.localCurrentListId = p;
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
      this.localCurrentListId = currentListId; 
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
  currentListId: computed,
  lists: observable,
  loggedIn: observable,
  user: observable,
  createList: action,
  localCurrentListId: observable,
  pieceEntry: observable
});
decorate(Piece, {
  text: observable,
});

export default new AppStore();

