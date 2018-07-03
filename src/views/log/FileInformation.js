/**
 * Display file name and line numeber
 *
 * @flow
 */

import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { isBabelPluginFileData } from '../../utils'
import type { Log } from '../../ConsoleProvider'

function extractFilename(filepath: string): string {
  const filenamePath = filepath.split('/')
  return filenamePath[filenamePath.length - 1]
}

const FileInformation = ({ data }, { data: Log }) => {
  if (!data) {
    return null
  }

  const filename = extractFilename(data.filename)
  return (
    <View style={styles.container}>
      <Text> {`${filename}:${data.line}`} </Text>
    </View>
  )
}

export default FileInformation

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
