import * as React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
console.log(Icon, '-------------')

type Props = {
  navigation: any
}

class MemberScreen extends Component<Props>{

  static navigationOptions = ({ navigation }: any) => ({
    header: null,
    });

  public render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>我的账号</Text>
        <Icon.Button name="facebook" backgroundColor="#3b5998" fontSize={10} onPress={() => { alert('9999') }}>
        </Icon.Button>
      </View>
    )
  }
}

export default MemberScreen;