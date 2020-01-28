import { createContext, useContext } from 'react'
import AppStore from './AppStore';

const storeContext = createContext(AppStore)

export const useAppStore = () => useContext(storeContext);

