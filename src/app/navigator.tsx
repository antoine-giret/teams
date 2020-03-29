import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen } from '../screens'

const Stack = createStackNavigator()

export enum Screens {
  HOME = 'Home',
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen component={HomeScreen} name={Screens.HOME} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
