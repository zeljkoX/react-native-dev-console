/**
 * Status View
 * Display last console entry
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, PanResponder, Animated } from 'react-native'
import { Log } from './log'
import type { Logs } from '../ConsoleProvider'

type Props = {
  data: Logs
}

type State = {
  animation: Animated.Value,
  isDragging: boolean
}
export default class StatusView extends Component<Props, State> {

  state = {
    animation: new Animated.Value(0),
    isDragging: false
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      this.state.animation.extractOffset();
    },
    onPanResponderMove: Animated.event([
      null,
      { dy: this.state.animation }
    ]),
    onPanResponderRelease: ()  => {
      this.disableDrag()
    }
  })

  getLastEntry(data) {
    return data.length ? data[data.length - 1] : null
  }

  enableDrag = () => {
    this.setState(() => ({
      isDragging: true
    }))
  }

  disableDrag = () => {
    this.setState(() => ({
      isDragging: false
    }))
  }

  render() {
    const lastEntry = this.getLastEntry(this.props.data)
    const animatedStyle = {
      transform: [{ translateY: this.state.animation }]
    }
    const handlers = this.state.isDragging ? this.panResponder.panHandlers : {}
    return (
      <Animated.View  style={[styles.container, this.props.statusViewContainer, this.state.isDragging && styles.draggingContainer ,animatedStyle]} {...handlers}>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={this.enableDrag}
          onPress={this.props.onToggleViewMode}
        >
          <Log data={lastEntry} isStatusMode={true} />
        </TouchableOpacity>
      </Animated.View>
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
  },
  draggingContainer: {
    borderColor: '#000',
    borderStyle: 'dashed',
    borderWidth: 1
  }
})