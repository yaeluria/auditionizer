// import React, { useContext } from "react";
// import { createStore } from "./PieceStore";
// import { useLocalStore } from "mobx-react-lite";

// const storeContext = React.createContext();

// export const StoreProvider = ({ children }) => {
//   const store = useLocalStore(createStore);
//   return (
//     <storeContext.Provider value={store}>{children}</storeContext.Provider>
//   );
// };

// export const useStore = () => {
//   const store = useContext(storeContext);
//   if (!store) {
//     throw new Error("No Store here.");
//   }
//   return store;
// };
import { createContext, useContext } from 'react';

export const useStore = store => useContext(createContext(store))