import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

interface IProps {
  children?: React.ReactNode
}

function Content({ children }: IProps) {
  return <ScrollView style={styles.wrapper}>{children}</ScrollView>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default Content
