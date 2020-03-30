import React from 'react'
import { Theme } from 'react-native-paper'

import { User } from '../models'

import theme from './theme'

export interface IAppContext {
  theme: Theme
  currentUser?: User | null
  updateCurrentUser: (user: User | null | undefined) => void
}

export const INITIAL_CONTEXT: IAppContext = {
  theme,
  currentUser: undefined,
  updateCurrentUser: () => {},
}

const AppContext = React.createContext(INITIAL_CONTEXT)

export default AppContext
