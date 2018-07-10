import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import screen from '../../../utils/screen';

type Props = {
  navigation: any
}

class RecommendPlate extends PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { navigate } = this.props.navigation;
    const songSheetItem = (
      <TouchableHighlight style={styles.songSheet} onPress={() => {this._onPress(this.props.navigation)}}>
        <View>
          <Image style={styles.songCover} source={require('../../../assets/images/recommendmusic1.png')}>
          </Image>
          <Text style={styles.songListener}>
            <Icons name="ios-headset-outline" color="#fff" />
            101万
          </Text>
          <Text style={styles.songDesc}>
            一个让你念念不忘的声音
          </Text>
        </View>
      </TouchableHighlight >
    );
    return (
      <View style={{ marginTop: 20 }}>
        <View>
          <Text style={styles.plateTitle}>
            推荐歌单
            <Icon name="chevron-right" size={15} />
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {songSheetItem}
          {songSheetItem}
          {songSheetItem}
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {songSheetItem}
          {songSheetItem}
          {songSheetItem}
        </View>
      </View>
    )
  }

  public _onPress(navigate: any) {
    navigate.navigate('PlayMusic')
    console.log(navigate , '----')
  }
}

const styles = StyleSheet.create({
  plateTitle: {
    marginLeft: 8,
    color: '#000',
    fontSize: 16
  },
  songSheet: {
    position: 'relative',
    marginLeft: 8,
    marginTop: 8,
  },
  songCover: {
    width: screen.width / 3.33,
    height: screen.width / 3.33,
    borderRadius: 3
  },
  songDesc: {
    width: screen.width / 3.33,
    fontSize: 11
  },
  songListener: {
    position: 'absolute',
    right: 6,
    fontSize: 11,
    color: '#fff'
  }
})

export default RecommendPlate;