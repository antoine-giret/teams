import React, { useState } from 'react'
import { AppLoading } from 'expo'
import { Provider as PaperProvider } from 'react-native-paper'

import { Team, User } from '../models'
import { FirebaseService, UserService } from '../services'

import AppContext, { IAppContext, INITIAL_CONTEXT } from './context'
import AppNavigator from './navigator'
import './i18n'

function App() {
  const [context, setContext] = useState<IAppContext>(INITIAL_CONTEXT)
  const [isReady, setReady] = useState(false)

  async function init() {
    const { auth } = FirebaseService.getInstance()

    await new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        unsubscribe()
        resolve()
      })
    })

    const [currentUser] = await Promise.all([UserService.getInstance().reconnect()])

    setContext({ ...context, currentUser, currentTeam: currentUser ? currentUser.defaultTeam : null })
  }

  function updateCurrentUser(currentUser: User | null | undefined) {
    setContext({ ...context, currentUser })
  }

  function updateCurrentTeam(currentTeam: Team | null) {
    setContext({ ...context, currentTeam })
  }

  if (!isReady) {
    return <AppLoading onError={console.warn} onFinish={() => setReady(true)} startAsync={init} />
  }

  const { theme, currentUser } = context

  return (
    <AppContext.Provider value={{ ...context, updateCurrentUser, updateCurrentTeam }}>
      <PaperProvider theme={theme}>
        <AppNavigator currentUser={currentUser} />
      </PaperProvider>
    </AppContext.Provider>
  )
}

export default App
