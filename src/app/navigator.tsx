import React, { useEffect, useRef, useState } from 'react'
import { NavigationContainer, useLinking } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { LoginScreen, TeamFormScreen, TeamScreen } from '../screens'
import { User } from '../models'

import Screens from './screens'

const Stack = createStackNavigator()

interface IProps {
  currentUser?: User | null
}

function AppNavigator({ currentUser }: IProps) {
  const [initialState, setInitialState] = useState()
  const [isReady, setIsReady] = useState(false)
  const navigationRef = useRef()

  const { getInitialState } = useLinking(navigationRef, {
    prefixes: [],
    config: {
      [Screens.LOGIN]: { path: 'login' },
      [Screens.TEAM_FORM]: { path: 'team/new' },
      [Screens.TEAM]: { path: 'team' },
    },
  })

  useEffect(() => {
    getInitialState().then(state => {
      if (state) setInitialState(state)
      setIsReady(true)
    })
  }, [getInitialState])

  if (!isReady) return null

  return (
    <NavigationContainer initialState={initialState} ref={navigationRef}>
      {currentUser ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen component={TeamScreen} name={Screens.TEAM} />
          <Stack.Screen component={TeamFormScreen} name={Screens.TEAM_FORM} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen component={LoginScreen} name={Screens.LOGIN} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default AppNavigator
