import React from 'react'
import { StyleSheet, View } from 'react-native'

interface IProps {
  children?: React.ReactNode
}

function TabLayout({ children }: IProps) {
  return <View style={styles.wrapper}>{children}</View>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default TabLayout
