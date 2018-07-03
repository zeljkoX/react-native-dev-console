/**
 * Display log entry
 *
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import prettyFormat from 'pretty-format'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { ghcolors } from 'react-syntax-highlighter/styles/prism'

type Props = {
  isExpandable: boolean,
  style: Object,
  emptyLine: boolean
}

type State = {
  isExpanded: boolean
}

export default class Entry extends Component<Props, State> {

  static defaultProps = {
    emptyLine: false
  }
  state = {
    isExpanded: false
  }

  toggleExpanded = () => {
    if (this.props.isStatusMode || !this.isExpandable(this.props.data)) {
      return
    }
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }))
  }

  isExpandable(item): boolean {
    return typeof item === 'object' || (typeof item === 'string' && item.length > 100)
  }

  render() {
    const { isExpanded } = this.state
    const { isStatusMode, data, emptyLine } = this.props
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity onPress={this.toggleExpanded} activeOpacity={1} style={styles.row} disabled={isStatusMode}>
          <Text style={styles.arrow}>{this.state.isExpanded ? ' ▾ ' : ' ▸ '}</Text>
          {!emptyLine && (
            <SyntaxHighlighter
              customStyle={highlighterStyle}
              highlighter={'prism'}
              language="javascript"
              style={ghcolors}>
              {prettyFormat(data, {
                maxDepth: isExpanded ? Infinity : 1,
                min: isStatusMode
              })}
            </SyntaxHighlighter>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  arrow: {
    top: -2
  }
})

const highlighterStyle = {
  backgroundColor: 'transparent',
  padding: 0,
  margin: 0
}
