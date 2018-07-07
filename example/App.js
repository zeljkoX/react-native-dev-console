/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import ConsoleProvider from 'react-native-dev-console'

export default class App extends Component <Props> {

  componentDidMount() {
    console.log('')
    console.info('test', 'test1', {
      'one': 1
    }, []);
    console.log(1);
    console.warn([1, '2', ['2']]);
    console.log({
      test: 1,
      test: '2',
      test: [3]
    });
  }

  addLog = () => {
    console.log('add log', 1)
  }

  render() {
    return (
      <View style={
        styles.container
      }>
        <ConsoleProvider style={
          {
            height: '100%',
            opacity: 0.5
          }
        }/>
        <TouchableOpacity onPress={this.addLog}>
          <Text>Add log</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  }
})