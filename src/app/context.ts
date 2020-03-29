import React from 'react'

import theme, { TTheme } from './theme'

export interface IAppContext {
  theme: TTheme
}

export const INITIAL_CONTEXT: IAppContext = {
  theme,
}

const AppContext = React.createContext(INITIAL_CONTEXT)

export default AppContext
