/**
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Log } from './log'
import type { Logs } from '../ConsoleProvider'

type Props = {
  data: Logs
}
export default class StatusView extends Component<Props, null> {
  getLastEntry(data) {
    return data.length ? data[data.length - 1] : null
  }

  render() {
    const lastEntry = this.getLastEntry(this.props.data)
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.onToggleViewMode}
        style={[styles.container, this.props.statusViewContainer]}>
        <Log data={lastEntry} isStatusMode={true} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 35,
    left: 0,
    opacity: 0.7,
    position: 'absolute',
    top: 25,
    width: '100%',
    zIndex: 10000
  }
})
