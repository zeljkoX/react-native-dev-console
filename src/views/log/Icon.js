/**
 * @flow
 */
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import icons from '../assets'

function getIcon(type: string): ?number {
  switch (type) {
    case 'info':
      return icons.info
    case 'warn':
    case 'error':
      return icons.error
    default:
      return null
  }
}

const Icon = ({ data }) => {
  if (!data) {
    return null
  }
  const icon = getIcon(data.type)
  if (!icon) {
    return null
  }
  return (
    <View style={styles.center}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Icon
