import React, { useContext } from 'react'

import AppContext from '../../app/context'
import Layout from '../../layouts/default'

import TeamNavigator from './navigator'
import EmptyState from './components/empty-state'

function TeamScreen() {
  const { currentTeam } = useContext(AppContext)

  return <Layout>{currentTeam ? <TeamNavigator /> : <EmptyState />}</Layout>
}

export default TeamScreen
