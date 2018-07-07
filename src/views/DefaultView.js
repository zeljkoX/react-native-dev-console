/**
 * @flow
 */

import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native'
import { Menu, StatusView } from './'
import { Logs } from './log/'
import { DevConsoleContext } from '../ConsoleProvider'

type Props = {
  isVisible: boolean,
  logEntryStyle: Object
}

type State = {
  isStatusMode: boolean,
  logs: Array<Object>
}

export default class DefaultView extends Component<Props, State> {

  state = {
    isStatusMode: true
  }

  toggleViewMode = () => this.setState(prevState => ({ isStatusMode: !prevState.isStatusMode }))

  render() {
    return (
      <DevConsoleContext.Consumer>
        {value => {
          if (this.state.isStatusMode) {
            return <StatusView data={value.logs} onToggleViewMode={this.toggleViewMode} visible={this.state.isStatusMode}/>
          }
          return (
            <View style={[styles.container, this.props.containerStyle]}>
              <Logs data={value.logs} />
              <Menu onToggleViewMode={this.toggleViewMode} onClear={value.clearByUser} onClose={value.stopByUser} />
            </View>
          )
        }}
      </DevConsoleContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000
  }
})
