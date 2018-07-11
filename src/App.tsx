/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as React from 'react';
import { Component } from 'react';
import { createStore } from 'redux';
import { StackNavigator, TabNavigator, TabBarBottom, DrawerNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './app/home/index';
import MyMusicScreen from './app/my-music/mymusic.screen';
import MemberScreen from './app/member/index';
import FriendsScreen from './app/friends/index';
import Icon from 'react-native-vector-icons/Ionicons';
import SoundRecordingDetail from './app/sound-recording/index';
import PlayMusicScene from './app/play-music/index';
import reducer from './redux/reducer';
import { Provider } from 'react-redux';
import { setLyricShow } from './redux/action';
import SongSheetDetail from './app/detail-page/song-sheet';
const store = createStore(reducer);
console.log(store.getState(), '-------999---888---')
setTimeout(() => {
  console.log(store.getState(), '-------999---888---')
}, 4000);
type Props = {};
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  }
});

const MyMusicStack = createStackNavigator({
  MyMusic: {
    screen: MyMusicScreen
  }
});

const FriendsStack = createStackNavigator({
  Friends: {
    screen: FriendsScreen
  }
});

const MemberStack = createStackNavigator({
  Member: {
    screen: MemberScreen
  }
});



const MainScreentNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: '发现音乐',
        tabBarIcon: ({ focused, tintColor }: any) => {
          return (<Icon name="ios-disc-outline" size={30} color={tintColor} />);
        },
      },
    },
    MyMusic: {
      screen: MyMusicStack,
      navigationOptions: ({ navigation }: any) => ({
        tabBarLabel: '我的音乐',
        tabBarIcon: ({ focused, tintColor }: any) => {
          return (<Icon name="ios-musical-notes-outline" size={30} color={tintColor} />);
        },
      }),
    },
    Friends: {
      screen: FriendsStack,
      navigationOptions: ({ navigation }: any) => ({
        tabBarLabel: '朋友',
        tabBarIcon: ({ focused, tintColor }: any) => {
          return (<Icon name="ios-pin-outline" size={30} color={tintColor} />);
        },
      }),
    },
    Member: {
      screen: MemberStack,
      navigationOptions: ({ navigation }: any) => ({
        title: '账号',
        tabBarIcon: ({ focused, tintColor }: any) => {
          return (<Icon name="ios-person-outline" size={30} color={tintColor} />);
        },
      }),
    }
  }, {
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: 'Home',
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#cccccc',
      style: {
        backgroundColor: '#333333',
      }
    }
  })

  const RootScene = createStackNavigator({
    MainScreentNavigator: {
      screen: MainScreentNavigator,
      navigationOptions: {
        header: null
      }
    },SoundRecord: {
      screen: SoundRecordingDetail,
    },
    PlayMusic: {
      screen: PlayMusicScene
    },
    SongSheet: {
      screen: SongSheetDetail
    }
  })



export default class App extends React.Component<Props> {
  render() {
    return( 
    <Provider store={store}>
    <View style={{ flex: 1 }}>  
      <RootScene />
    </View>
    </Provider>
    )
  }
}