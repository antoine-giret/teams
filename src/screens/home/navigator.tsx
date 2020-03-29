import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons'

import { DashboardScreen, GamesScreen, RankingScreen, SettingsScreen } from './screens'

const Tab = createMaterialBottomTabNavigator()

export enum HomeScreens {
  DASHBOARD = 'Dashboard',
  GAMES = 'Games',
  RANKING = 'Ranking',
  SETTINGS = 'Settings',
}

function HomeNavigator() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#212121' }} labeled={false}>
      <Tab.Screen
        component={DashboardScreen}
        name={HomeScreens.DASHBOARD}
        options={{
          tabBarIcon: ({
            // eslint-disable-next-line react/prop-types
            color,
          }) => <MaterialIcons color={color} name="home" size={26} />,
        }}
      />
      <Tab.Screen
        component={GamesScreen}
        name={HomeScreens.GAMES}
        options={{
          tabBarIcon: ({
            // eslint-disable-next-line react/prop-types
            color,
          }) => <MaterialIcons color={color} name="event" size={26} />,
        }}
      />
      <Tab.Screen
        component={RankingScreen}
        name={HomeScreens.RANKING}
        options={{
          tabBarIcon: ({
            // eslint-disable-next-line react/prop-types
            color,
          }) => <MaterialCommunityIcons color={color} name="trophy" size={26} />,
        }}
      />
      <Tab.Screen
        component={SettingsScreen}
        name={HomeScreens.SETTINGS}
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

export default HomeNavigator
