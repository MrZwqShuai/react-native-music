import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import screen from '../../../utils/screen';
import { personalized } from './recommend-model';

type Props = {
  navigation: any;
  personalizedPlayList: Array<personalized>;
}



class RecommendPlate extends PureComponent<Props> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { navigate } = this.props.navigation;
    const { personalizedPlayList } = this.props;
    let songSheetItem: any;
    let newSongSheetItem: any;
    try {
      songSheetItem = personalizedPlayList.slice(0, 6).map((personalized: personalized) => {
        return (
          this.createSongSheetItem(personalized)
        )
      });
      newSongSheetItem = personalizedPlayList.slice(7, 13).map((personalized: personalized) => {
        return (
          this.createSongSheetItem(personalized)
        )
      });
    } catch (e) {
      alert(e.message);
    }
    return (
      <View style={{ marginTop: 15 }}>
        <View>
          <View>
            <Text style={styles.plateTitle}>
              推荐歌单
            <Icon name="chevron-right" size={16} />
            </Text>
          </View>
          <View style={styles.songList}>
            {songSheetItem}
          </View>
        </View>
        <View>
          <View style={{marginTop: 23}}>
            <Text style={styles.plateTitle}>
              最新音乐
            <Icon name="chevron-right" size={16} />
            </Text>
          </View>
          <View style={styles.songList}>
            {newSongSheetItem}
          </View>
        </View>
      </View>
    )
  }

  
  public _onPress(navigate: any, personalizedId: number) {
    navigate.navigate('SongSheet', {
      personalizedId: personalizedId
    });
  }

  public createSongSheetItem(personalized: personalized) {
    return (
      <TouchableWithoutFeedback style={styles.songSheet} onPress={() => { this._onPress(this.props.navigation, personalized.id) }} key={personalized.id}>
        <View>
          <Image style={styles.songCover} source={{ uri: personalized.picUrl }}>
          </Image>
          <Text style={styles.songListener}>
            <Icons name="ios-headset-outline" color="#fff" />
            {Math.floor(personalized.playCount / 10000)}万
        </Text>
          <Text style={styles.songDesc}>
            {personalized.name}
          </Text>
        </View>
      </TouchableWithoutFeedback >
    )
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
    width: screen.width / 3.33,
    height: screen.width / 3.33,
    marginLeft: 8,
    marginTop: 8,
  },
  songList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8
  },
  songCover: {
    width: screen.width / 3.33,
    height: screen.width / 3.33,
    borderRadius: 3
  },
  songDesc: {
    width: screen.width / 3.33,
    fontSize: 11,
    color: '#000'
  },
  songListener: {
    position: 'absolute',
    right: 6,
    fontSize: 11,
    color: '#fff'
  }
})

export default RecommendPlate;