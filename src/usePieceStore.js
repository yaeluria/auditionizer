import { createContext, useContext } from 'react'
import PieceStore from './PieceStore';

const storeContext = createContext(PieceStore)

export const usePieceStore = () => useContext(storeContext);

