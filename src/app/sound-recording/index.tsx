import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation: any
}

class SoundRecordingDetail extends PureComponent<Props>{

  static navigationOptions = ({ navigation }: any) => ({
    headerLeft: null,
    headerTitle: (
      <Icon name="ios-arrow-back" size={28} color="#fff" style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }} />
    ),
    headerStyle: {
      backgroundColor: '#D43C33'
    },
  });

  public render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>录音测试....</Text>
      </View>
    )
  }
}

export default SoundRecordingDetail;