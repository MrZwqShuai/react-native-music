import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text } from 'react-native';
let Icon = require('react-native-vector-icons/FontAwesome');
console.log(Icon, '-------------')

type Props = {
  navigation: any
}

class MyMusicScreen extends PureComponent<Props>{
  static navigationOptions = ({navigation}: any) => ({
    title: '正在播放...',
    tabBarVisible: false,
  })
  public render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>我的音乐</Text>
  <Icon.Button name="facebook" backgroundColor="#3b5998" fontSize={10} onPress={() => {alert('9999')}}>
    Login with Facebook
  </Icon.Button>
      </View>
    )
  }
}

export default MyMusicScreen;