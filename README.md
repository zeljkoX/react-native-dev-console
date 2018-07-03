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

import ConsoleProvider from 'react-natice-dev-console'

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
containerStyle | Style | - | Informs you if the user cancelled the process
disableRNWarnings | boolean | true | Contains an error message, if there is one
disableYellowBox | boolean | true | If the user tapped one of your custom buttons, contains the name of it
isActive | boolean | true | The base64 encoded image data (photos only)
logEntryStyle | Style | - | The uri to the local file asset on the device (photo or video)
menuContainerStyle | Style | - | The URL of the original asset in photo library, if it exists
passtrough | boolean | trye | Will be true if the image is vertically oriented
statusViewContainerStyle | Style | - | Image dimensions (photos only)
render | Function | - | Used to extend default package view

## TODO
- support more logs types
- group logs

## License

MIT License. © Željko Marković 2018