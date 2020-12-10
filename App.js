/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TextInput, ActivityIndicator, Dimensions, TouchableOpacity, Clipboard, StatusBar } from 'react-native'
import { WebView } from 'react-native-webview'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IOSIcon from 'react-native-vector-icons/Ionicons'
import Orientation from 'react-native-orientation-locker'

let DEVICE = Dimensions.get('window')
let isIOS = Platform.OS === 'ios'

let StatusBarHeight = StatusBar.currentHeight

export default class App extends Component {
  state = {
    url: 'https://gs.statcounter.com/detect',
    inputurl: 'https://gs.statcounter.com/detect',
    width: DEVICE.width
  }

  ActivityIndicatorLoadingView = () => {
    return (
      <ActivityIndicator
        size='large'
        color='#000'
        style={styles.loadingContainer}
      />
    )
  }

  changeHeaderText = (inputurl) => {
    this.setState({
      inputurl
    })
  }

  goHome = () => {
    this.setState({
      url: 'https://manpower-console.lrn.com/auth/backdoor',
      inputurl: 'https://manpower-console.lrn.com/auth/backdoor'
    })
  }

  goToUrl = () => {
    this.setState({
      url: this.state.inputurl
    })
  }

  getNewUrl = (state) => {
    console.log(state.url)
    this.setState({
      inputurl: state.url
    })
  }

  componentWillMount() {
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      this.setState({
        width: DEVICE.width
      })
    } else {
      this.setState({
        width: DEVICE.height
      })
    }
  }

  _onOrientationDidChange = (orientation) => {
    console.log('orie', orientation)
    if (orientation == 'LANDSCAPE-LEFT') {
      //do something with landscape left layout
      this.setState({
        width: DEVICE.height
      })
    } else if (orientation == 'LANDSCAPE-RIGHT') {
      //do something with landscape left layout
      this.setState({
        width: DEVICE.height
      })
    } else {
      //do something with portrait layout
      this.setState({
        width: DEVICE.width
      })
    }
  };

  componentDidMount =() => {
    Orientation.addOrientationListener(this._onOrientationDidChange)
  }

  componentWillUnmount = () => {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }

  render () {
    return (
      <>
      <View style={styles.container}>
        <View style={{width: this.state.width, height: isIOS ? 100 : 65, padding: 10, backgroundColor: '#292929', paddingTop: isIOS ? 45 : 10, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.goHome()} style={styles.homeButtonContainer}>
            <Icon style={styles.homeIcon} size={20} color='#fff' name='home' />
          </TouchableOpacity>
          <TextInput style={styles.textInput} value={this.state.inputurl} onChangeText={(text) => this.changeHeaderText(text)} />
          <TouchableOpacity onPress={() => this.goToUrl()} style={styles.sendButtonContainer}>
            <Icon style={styles.sendIcon} size={24} color='#fff' name='caret-square-right' />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => Clipboard.setString('ZZTESTCATALYST')} style={styles.sendButtonContainer}>
            <Icon style={styles.sendIcon} size={16} color='#333' name='send' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Clipboard.setString('Welcome12')} style={styles.sendButtonContainer}>
            <Icon style={styles.sendIcon} size={16} color='#333' name='send' />
          </TouchableOpacity> */}
        </View>
        <View style={{flex: 1, width: this.state.width}}>
          <WebView
            style={styles.webview}
            source={{ uri: this.state.url }}
            javaScriptEnabled
            domStorageEnabled
            renderLoading={this.ActivityIndicatorLoadingView}
            startInLoadingState
            onNavigationStateChange={(state) => this.getNewUrl(state)}
            onMessage={() => console.log('OnMessage log')}
            applicationNameForUserAgent={'LRNCatalystConnectApp'}
            setSupportMultipleWindows={false}
          />
        </View>

      </View>
      <StatusBar backgroundColor='#292929' />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    borderRadius: 100
  },
  homeButtonContainer: {
    width: 45,
    height: 45,
    // backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10
  },
  sendButtonContainer: {
    width: 45,
    height: 45,
    // backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 10
  },
  webview: {
    flex: 1
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
