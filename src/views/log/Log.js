/**
 * Display log
 *
 * @flow
 */

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Entries, FileInformation, Icon } from './'
import type { Log as LogType } from '../../ConsoleProvider'

type Props = {
  data: LogType,
  isStatusMode: boolean,
  key: any
}

const Log = ({ data, isStatusMode = false, key }: Props) => {
  return (
    <View style={[styles.row, data && data.meta && data.meta.type && styles[data.meta.type]]} key={key}>
      <Icon data={data ? data.meta : null} />
      <View style={[styles.entriesContainer, isStatusMode && styles.entriesContainerStatusMode]}>
        <Entries data={data} isStatusMode={isStatusMode} />
      </View>
      <FileInformation data={data ? data.meta : null} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    width: '100%'
  },
  entriesContainer: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row'
  },
  entriesContainerStatusMode: {
    flexWrap: 'nowrap',
    overflow: 'hidden'
  },
  info: {
    backgroundColor: '#FFFBE5'
  },
  warn: {
    backgroundColor: '#FFF0F0'
  },
  error: {
    backgroundColor: '#FFF0F0'
  },
  log: {
    backgroundColor: '#fff'
  }
})

export default Log
