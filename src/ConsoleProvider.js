/**
 * @flow
 */

import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { LogService, DefaultView } from './'
import { isRNWarningLog, isBabelPluginFileData } from './utils'

type Props = {
  containerStyle?: StyleSheet.Styles,
  disableRNWarnings: boolean,
  disableYellowBox: boolean,
  isActive: boolean,
  logEntryStyle?: StyleSheet.Styles,
  menuContainerStyle?: SteleSheet.Styles,
  passtrough: boolean, // interceptet calls to console pass to original funciton
  statusViewContainerStyle?: StyleSheet.Styles
}

export type Log = {
  args: Array<any>,
  meta: Array<{
    filename: String,
    id: String,
    line: number,
    msg: String,
    type: 'log' | 'info' | 'warn' | 'error'
  }>
}

export type Logs = Array<Log>

type State = {
  logs: Logs,
  isActive: boolean,
  start: Function,
  stop: Function,
  stopByUser: Function,
  clearByUser: Function
}

export const DevConsoleContext = React.createContext('react-native-dev-console')

export default class ConsoleProvider extends Component<Props, State> {
  static defaultProps = {
    disableRNWarnings: true,
    disableYellowBox: true,
    isActive: true,
    passtrough: true
  }

  state = {
    isActive: false,
    logs: []
  }

  componentWillMount() {
    this.start()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isActive && !nextProps.isActive) {
      this.stop()
    }
    if (!this.props.isActive && nextProps.isActive) {
      this.start()
    }
  }

  componentWillUnmount() {
    this.stop()
  }

  start = () => {
    if (!this.props.isActive) {
      return
    }
    if (this.props.disableYellowBox) {
      console.disableYellowBox = true
    }
    LogService.init(this.addLog, { passtrough: this.props.passtrough })
    this.setState(() => ({
      isActive: true
    }))
  }

  stop = () => {
    LogService.stop()
    this.setState(() => ({
      isActive: false
    }))
  }

  stopByUser = () => {
    Alert.alert('Disable Dev Console', 'Are you sure?', [
      { text: 'Yes', onPress: () => this.stop() },
      { text: 'Cancel', onPress: () => {}, style: 'cancel' }
    ])
  }

  clearByUser = () => {
    this.setState(() => ({
      logs: []
    }))
  }

  addLog = log => {
    let meta = null
    if (!log || !log.length || (this.props.disableRNWarnings && isRNWarningLog(log))) {
      return
    }
    if (isBabelPluginFileData(log[log.length - 1])) {
      meta = log.pop()
    }
    this.setState(prevState => ({
      logs: [...prevState.logs, { args: log, meta }]
    }))
  }

  getControlFunctions = () => ({
    clearByUser: this.clearByUser,
    start: this.start,
    stop: this.stop,
    stopByUser: this.stopByUser
  })

  render() {
    const { isActive } = this.state
    const { children, render } = this.props
    if (!isActive) {
      return children ? children : null
    }
    const data = { ...this.state, ...this.getControlFunctions() }
    return (
      <DevConsoleContext.Provider value={data}>
        {children}
        {render ? render(data) : <DefaultView {...this.props} />}
      </DevConsoleContext.Provider>
    )
  }
}
