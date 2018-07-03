/**
 * @flow
 */

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Menu = ({
  onClose,
  onClear,
  onToggleViewMode,
  menuContainer
}: {
  onClose: Function,
  onClear: Function,
  onToggleViewMode: Function,
  menuContainer: Object
}) => {
  return (
    <View style={[styles.bottomMenu, menuContainer]}>
      <TouchableOpacity activeOpacity={1} onPress={onToggleViewMode} style={styles.bottomMenuItem}>
        <Text style={styles.menuItemText}>Minimize</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} onPress={onClear} style={styles.bottomMenuItem}>
        <Text style={styles.menuItemText}>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.bottomMenuItem}>
        <Text style={styles.menuItemText}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomMenu: {
    height: 45,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    flexDirection: 'row',
    borderTopColor: '#333',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuItemText: {
    color: '#333'
  }
})

export default Menu
