import React from 'react'
import { StyleSheet, View } from 'react-native'

import Header from './header'
import Content from './content'

interface IProps {
  children?: React.ReactNode
}

function Layout({ children }: IProps) {
  return (
    <View style={styles.wrapper}>
      <Header />
      <Content>{children}</Content>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default Layout
