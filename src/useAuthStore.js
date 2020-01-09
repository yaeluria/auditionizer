import { createContext, useContext } from 'react'
import AuthStore from './AuthStore';

const authContext = createContext(AuthStore)

export const useAuthStore = () => useContext(authContext);

