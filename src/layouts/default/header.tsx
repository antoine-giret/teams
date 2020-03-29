import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Trans } from 'react-i18next'

import AppContext from '../../app/context'

function Header() {
  const {
    theme: {
      palette: {
        primary: { main, contrastColor },
      },
    },
  } = useContext(AppContext)

  return (
    <View style={[styles.wrapper, { backgroundColor: main }]}>
      <Text style={[styles.title, { color: contrastColor }]}>
        <Trans i18nKey="app.title" />
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 0,
    height: 64,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
  },
})

export default Header
