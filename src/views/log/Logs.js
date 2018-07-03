/**
 * Display list of logs
 *
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform, ScrollView, StatusBar, Dimensions } from 'react-native'
import { Log } from './'
import type { Logs as LogsType } from '../../ConsoleProvider'

type Props = {
  data: LogsType
}
export default class Logs extends Component<Props, null> {
  renderEmptyLogsMsg() {
    return (
      <View style={styles.emptyLogsMsg}>
        <Text> Empty log list </Text>
      </View>
    )
  }

  renderLogs = (logs: Logs) => {
    if (!logs || !logs.length) {
      return null
    }
    return logs.map((i, index) => <Log data={i} key={index} />)
  }

  render() {
    const { data, style } = this.props
    return (
      <ScrollView contentContainerStyle={[styles.container, style]} bounces={false}>
        {data.length ? this.renderLogs(data) : this.renderEmptyLogsMsg()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height - 45,
    opacity: 0.7,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    width: '100%'
  },
  emptyLogsMsg: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
