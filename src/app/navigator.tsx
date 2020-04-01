import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { LoginScreen, TeamScreen } from '../screens'
import { User } from '../models'

const Stack = createStackNavigator()

export enum Screens {
  LOGIN = 'Login',
  TEAM = 'Team',
}

interface IProps {
  currentUser?: User | null
}

function AppNavigator({ currentUser }: IProps) {
  return (
    <NavigationContainer>
      {currentUser ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen component={TeamScreen} name={Screens.TEAM} />
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
