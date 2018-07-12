import * as React from 'react';
import { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import screen from '../../utils/screen';
import RecommendScene from './recommend/index';

type Props = {
  navigation: any
}
const styles = StyleSheet.create({
  searchbox: {
    borderRadius: 30,
    backgroundColor: '#ffffff',
    width: screen.width * .7,
    height: screen.width / 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInp: {
    width: 200,
    height: screen.width / 8,
  },

  lineStyle: {
    width: screen.width / 2,
    height: 2,
    backgroundColor: '#fff',
    marginTop: 100
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    color: '#000'
  }
})

const FirstRoute = () => (
  <View style={{ backgroundColor: '#ff4081' }} />
);


export default class HomeScreen extends PureComponent<Props> {

  state: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
    };
  }

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: (
      <TouchableOpacity style={styles.searchbox}>
        <Icon name="ios-search-outline" size={15} color="#cccccc" />
        <TextInput style={styles.searchInp} underlineColorAndroid='transparent' placeholder="搜索音乐、歌词、电台" />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: '#D43C33'
    },
    headerLeft: (
      <TouchableOpacity onPress={() => { navigation.navigate('SoundRecord') }}>
        <SimpleLineIcons name="microphone" size={22} color="#fff" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    )
  });

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props.navigation, 9)
    return (
      <ScrollableTabView
        tabBarBackgroundColor="#D43C33"
        tabBarUnderlineStyle={styles.lineStyle}
        tabBarActiveTextColor='#fff'
        tabBarInactiveTextColor='#fff'
        scrollWithoutAnimation={true}
        onChangeTab={() => {
        }}
      >
        <RecommendScene tabLabel='个性推荐' navigation={this.props.navigation} />
        <Text tabLabel='主播电台' navigation={navigate} >主播电台</Text>
      </ScrollableTabView>
    )
  }

  public navigateSoundRecording() {

  }
}

