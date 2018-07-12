/**
 * Display list of logs
 *
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, FlatList } from 'react-native'
import { Log } from './'
import type { Logs as LogsType } from '../../ConsoleProvider'

type Props = {
  data: LogsType
}
export default class Logs extends Component<Props, null> {
  flatListRef = null

  componentDidMount() {
    setTimeout(() => {
      this.flatListRef && this.flatListRef.scrollToEnd()
    }, 100);
  }

  renderEmptyLogsMsg() {
    return (
      <View style={styles.emptyLogsMsg}>
        <Text> Empty log list </Text>
      </View>
    )
  }

  renderItem = ({item, index}) => {
    return <Log data={item} key={index} />
  }

  keyExtractor = (item, index) => {
    return String(index)
  }

  render() {
    const { data, style } = this.props
    return (
      <FlatList
        ref={(ref) => (this.flatListRef = ref)}
        bounces={false}
        contentContainerStyle={[styles.container, style]}
        data={data}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={this.renderEmptyLogsMsg}
        renderItem={this.renderItem}
      />
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
