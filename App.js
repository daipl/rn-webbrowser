/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TextInput, ActivityIndicator, Dimensions, TouchableOpacity, Clipboard } from 'react-native'
import { WebView } from 'react-native-webview'
import Icon from 'react-native-vector-icons/FontAwesome'
let DEVICE = Dimensions.get('screen')
let isIOS = Platform.OS === 'ios'
export default class App extends Component {
  state = {
    url: 'https://manpower-console.lrn.com/auth/backdoor',
    inputurl: 'https://manpower-console.lrn.com/auth/backdoor'
  }

  ActivityIndicatorLoadingView = () => {
    return (
      <ActivityIndicator
        size='large'
        color='#000'
        style={styles.container}
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

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => this.goHome()} style={styles.homeButtonContainer}>
            <Icon style={styles.homeIcon} size={20} color='#333' name='home' />
          </TouchableOpacity>
          <TextInput style={styles.textInput} value={this.state.inputurl} onChangeText={(text) => this.changeHeaderText(text)} />
          <TouchableOpacity onPress={() => this.goToUrl()} style={styles.sendButtonContainer}>
            <Icon style={styles.sendIcon} size={16} color='#333' name='send' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Clipboard.setString('ZZTESTCATALYST')} style={styles.sendButtonContainer}>
            <Icon style={styles.sendIcon} size={16} color='#333' name='send' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Clipboard.setString('Welcome12')} style={styles.sendButtonContainer}>
            <Icon style={styles.sendIcon} size={16} color='#333' name='send' />
          </TouchableOpacity>
        </View>
        <View style={styles.webviewContainer}>
          <WebView
            style={styles.webview}
            source={{ uri: this.state.url }}
            javaScriptEnabled
            domStorageEnabled
            renderLoading={this.ActivityIndicatorLoadingView}
            startInLoadingState
            onNavigationStateChange={(state) => this.getNewUrl(state)}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    width: DEVICE.width,
    height: isIOS ? 100 : 65,
    padding: 10,
    backgroundColor: '#fff',
    paddingTop: isIOS ? 45 : 10,
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    borderRadius: 10
  },
  homeButtonContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10
  },
  sendButtonContainer: {
    width: 60,
    height: 45,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 10
  },
  webviewContainer: {
    flex: 1,
    width: DEVICE.width
  },
  webview: {
    flex: 1
  }
})
