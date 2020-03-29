import React, { useState } from 'react'
import { AppLoading } from 'expo'

import AppContext, { IAppContext, INITIAL_CONTEXT } from './context'
import AppNavigator from './navigator'
import './i18n'

function App() {
  const [context] = useState<IAppContext>(INITIAL_CONTEXT)
  const [isReady, setReady] = useState(false)

  async function init() {
    //
  }

  if (!isReady) {
    return <AppLoading onError={console.warn} onFinish={() => setReady(true)} startAsync={init} />
  }

  return (
    <AppContext.Provider value={{ ...context }}>
      <AppNavigator />
    </AppContext.Provider>
  )
}

export default App
