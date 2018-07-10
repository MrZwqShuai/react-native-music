import { AppRegistry } from 'react-native';
import App from './src/App';
import React, { Component } from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class WxMusicApp extends Component{
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('WyMusic', () => WxMusicApp);
