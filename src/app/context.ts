import React from 'react'
import { Theme } from 'react-native-paper'

import { Team, User } from '../models'

import theme from './theme'

export interface IAppContext {
  theme: Theme
  currentUser?: User | null
  currentTeam: Team | null
  updateCurrentUser: (user: User | null | undefined) => void
  updateCurrentTeam: (team: Team | null) => void
}

export const INITIAL_CONTEXT: IAppContext = {
  theme,
  currentUser: undefined,
  currentTeam: null,
  updateCurrentUser: () => {},
  updateCurrentTeam: () => {},
}

const AppContext = React.createContext(INITIAL_CONTEXT)

export default AppContext
