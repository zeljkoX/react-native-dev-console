# React Native Dev Console

## React Native Dev Console is small package designed to help debug apps in non debug mode

<p align="center" >
    <img alt="react-native-dev-console" src="https://i.imgur.com/ZgJU2Dp.jpg" width="300" height="550" />
</p>

## Why

Debuging React native apps in debug mode is slow and error prone. With this package user is able to debug app without activating debug mode and being tied to computer.

## Installation

Since the package is a JS-based solution, to install the latest version of react-native-dev-console you only need to run:

```bash
yarn add react-native-dev-console
```

or

```bash
npm install --save react-native-dev-console
```

## Babel plugin

This package comes with babel plugin included. Babel plugin role is to add meta information needed for debuging. For example, file line number.

To enable plugin add entry to `.babelrc` file:

```
{
  "plugins": ["./node_modules/react-native-dev-console/src/babel-plugin.js"]
}
```

## Quick Start

```javascript

import ConsoleProvider from 'react-native-dev-console'

export default class App extends Component {

  render() {
    return (
    <View>
      <ConsoleProvider />
    </View >
    )
  }
}
```
## Props

key | type | Value | Description
------ | ---- | ------- | ----------------------
containerStyle | Style | - | Full screen mode container style
statusViewContainerStyle | Style | - | Status View container style
disableRNWarnings | boolean | true | Disable displaying of RN warnings
disableYellowBox | boolean | true | Disable displaying of RN YellowBox
isActive | boolean | true | Plugin is active
logEntryStyle | Style | - | Console log entry style
menuContainerStyle | Style | - | Bottom menu container style
passtrough | boolean | trye | Call original console log
render | Function | - | Override render function

## TODO

- status view move logic
- support more logs types
- docs how to add custom entry
- docs how to start log service before react render phase

## License

MIT License. © Željko Marković 2018