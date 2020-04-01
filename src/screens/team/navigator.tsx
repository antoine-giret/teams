import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons'

import { GamesScreen, HomeScreen, RankingScreen, SettingsScreen } from './screens'

const Tab = createMaterialBottomTabNavigator()

export enum TeamScreens {
  HOME = 'Home',
  GAMES = 'Games',
  RANKING = 'Ranking',
  SETTINGS = 'Settings',
}

function TeamNavigator() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#212121' }} labeled={false}>
      <Tab.Screen
        component={HomeScreen}
        name={TeamScreens.HOME}
        options={{
          tabBarIcon: ({
            // eslint-disable-next-line react/prop-types
            color,
          }) => <MaterialIcons color={color} name="home" size={26} />,
        }}
      />
      <Tab.Screen
        component={GamesScreen}
        name={TeamScreens.GAMES}
        options={{
          tabBarIcon: ({
            // eslint-disable-next-line react/prop-types
            color,
          }) => <MaterialIcons color={color} name="event" size={26} />,
        }}
      />
      <Tab.Screen
        component={RankingScreen}
        name={TeamScreens.RANKING}
        options={{
          tabBarIcon: ({
            // eslint-disable-next-line react/prop-types
            color,
          }) => <MaterialCommunityIcons color={color} name="trophy" size={26} />,
        }}
      />
      <Tab.Screen
        component={SettingsScreen}
        name={TeamScreens.SETTINGS}
        options={{
          tabBarIcon: ({
            // eslint-disable-next-line react/prop-types
            color,
          }) => <MaterialIcons color={color} name="settings" size={26} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default TeamNavigator
