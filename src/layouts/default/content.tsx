import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

interface IProps {
  children?: React.ReactNode
}

function Content({ children }: IProps) {
  return <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default Content
