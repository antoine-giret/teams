import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import Header from './header'
import Content from './content'

interface IProps {
  children?: React.ReactNode
}

function Layout({ children }: IProps) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header />
      <Content>{children}</Content>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default Layout
