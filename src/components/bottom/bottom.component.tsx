import * as React from 'react';
import { Component } from 'react';

import {
  ScrollView, 
  View,
  Text
} from 'react-native';

export default class BottomComponent extends Component {

  render() {
    return (
    <View style={{height: 45, backgroundColor: 'rgba(0, 0, 0, 0.8588235294117647)'}}>
          <View style={{width: 50, }}><Text style={{color: 'white',width: 50,}}>发现音乐</Text></View>
          <View style={{width: 50, }}><Text style={{color: 'white',width: 50,}}>我的音乐</Text></View>
          <View style={{width: 50, }}><Text style={{color: 'white', flex: 0.25,width: 50,}}>朋友</Text></View>
          <View style={{width: 50, }}><Text style={{color: 'white', flex: 0.25,width: 50,}}>账号</Text></View>
    </View>
    )
  }
}