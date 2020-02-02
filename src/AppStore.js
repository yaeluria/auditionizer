import { observable, action, decorate, toJS } from 'mobx';
import firebase from './firebase';

export class Piece {
  text = '';
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
}

const piecesData = JSON.parse(localStorage.getItem('pieces'))

class AppStore {

  pieces = piecesData || [] ;
  selectedPieces = [];
  pieceFieldError = '';
  piecesToSelectFrom = [];
  selectedOption;
  selectionDone;
  lists;
  currentListId;
  loggedIn = false;
  user = null;
  openLogin = false;

  // useEffect(()=>{
  //   console.log("component mount", userId);
  //   if(userId){
  //     firebase
  //     .database()
  //     .ref(
  //       'users/' + userId 
  //     )
  //     .on("value", snapshot => {
  //       if (snapshot && snapshot.exists()) {
  //          const user = snapshot.val();
  //          if (user && user.lists){
  //            AppStore.lists = {...user.lists};
  //          }
  //          else{
  //            AppStore.lists = {}
  //          }
  //       }})
  // }
  //   }
  // ,[])
  //   const userUid = AppStore.user && AppStore.user.uid
  //   const currentListId =  AppStore.currentListId || null;
  //   const pieces = (AppStore.lists && currentListId) ? (AppStore.lists[currentListId]).pieces : AppStore.pieces;
  //   useEffect(() => {
  //     localStorage.setItem('pieces', JSON.stringify(AppStore.pieces));
  //     if(AppStore.loggedIn && currentListId){
  //       const userId = AppStore.user.uid;
  //       const updates = {};
  //       updates['users/' + userId  + '/lists/' + currentListId + '/pieces'] = AppStore.pieces.slice();
  //       firebase.database().ref().update(updates);
  
  //     }
  
  //   },[AppStore.loggedIn, userUid, currentListId, AppStore.currentList, AppStore.pieces])

  // constructor() {
  //   const userId = this.user && this.user.uid
  //   if(userId){
  //     firebase
  //         .database()
  //         .ref(
  //           'users/' + userId 
  //         )
  //         .on("value", snapshot => {
  //           this.lists = {};
  //           if (snapshot && snapshot.exists()) {
  //              const dbUser = snapshot.val();
  //              if (dbUser && dbUser.lists){
  //               //  this.lists = {...dbUser.lists};
  //                this.lists = {
  //                 name: "test",
  //                 number: 2
  //               }
  //              }
  //           }})
  //     }

  //   }
    // fb.products.on('value', (snapshot) => {
    //   this.products = [];
    //   snapshot.forEach((child) => {
    //     this.products.push({
    //       id: child.key,
    //       ...child.val()
    //     });
    //   });
    // });
  
  



  
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

  choose = p => {
    this.currentListId = p
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
