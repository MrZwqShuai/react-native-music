import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text } from 'react-native';
let Icon = require('react-native-vector-icons/FontAwesome');
console.log(Icon, '-------------')

type Props = {
  navigation: any
}

class FriendsScreen extends PureComponent<Props>{

  public render() {
    return (
      <View>
        <Text>朋友</Text>
  <Icon.Button name="facebook" backgroundColor="#3b5998" fontSize={10} onPress={() => {alert('9999')}}>
    Login with Facebook
  </Icon.Button>
      </View>
    )
  }
}

export default FriendsScreen;