import React from 'react'
import { Theme } from 'react-native-paper'

import theme from './theme'

export interface IAppContext {
  theme: Theme
}

export const INITIAL_CONTEXT: IAppContext = {
  theme,
}

const AppContext = React.createContext(INITIAL_CONTEXT)

export default AppContext
