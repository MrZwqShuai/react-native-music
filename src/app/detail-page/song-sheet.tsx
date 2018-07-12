import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import screen from '../../utils/screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { getPlaylistDetailById } from '../api/index';
import { PlayList, TrackSong } from '../interface/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setSongDetail } from '../../redux/action';
import { SongDetailState } from '../../redux/redux-model';
import { connect } from 'react-redux';

type Props = {
  navigation: any;
  goPlayMusicScreen: any;
}

type State = {
  playlist: PlayList;
}

class SongSheetDetail extends PureComponent<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = {
      playlist: {
        creator: {
        },
        tracks: []
      }
    };
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: '歌单',
      headerLeft: (
        <Icon name="ios-arrow-back" size={28} color="#fff" style={{ marginLeft: 10 }} onPress={() => { navigation.goBack() }} />
      ),
      headerRight: <View />,
      headerStyle: {
        backgroundColor: 'rosybrown'
      },
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
        fontWeight: 'normal',
      },
    }
  }

  public createSongListItem(trackSong: TrackSong, idx: number) {
    const songListItem = (
      <TouchableWithoutFeedback onPress={() => {this.props.goPlayMusicScreen({id: trackSong.id, name: trackSong.name, coverImg: trackSong.al.picUrl}, this.props.navigation)}} key={trackSong.id}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingBottom: 10, paddingTop: 10, backgroundColor: '#fff' }} >
        <View style={{ flexDirection: 'row',alignItems: 'center'}}>
          <Text style={{ marginLeft: 14 }}>
            {idx + 1}
          </Text>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: '#000' }}>
              {trackSong.name}
            </Text>
            <Text style={{ color: '#ccc', fontSize: 11 }}>
              {trackSong.ar[0].name} - {trackSong.al.name}
            </Text>
          </View>
        </View>
        <Ionicons name="ios-more" size={20} color="#ccc"  style={{marginRight: 15}}/>
      </View>
      </TouchableWithoutFeedback>
    )
    return songListItem;
  }

  public render() {
    const songListItem = this.state.playlist.tracks.map((trackitem: TrackSong, idx: number) => {
      return this.createSongListItem(trackitem, idx);
    })
    return (
      <View>
        <View style={{ backgroundColor: 'rosybrown' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <Image style={styles.songCover} source={{ uri: this.state.playlist.coverImgUrl }} />
            </View>
            <View>
              <Text style={{ width: screen.width / 2, marginTop: 10, color: '#fff' }}>
                {this.state.playlist.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, }}>
                <Image source={{ uri: this.state.playlist.creator.avatarUrl }} style={{ width: 20, height: 20, borderRadius: 10, }} />
                <Text style={{ marginLeft: 3, color: '#d3d3d3', fontSize: 12 }}>
                  {this.state.playlist.creator.nickname}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.songBrower}>
            <View style={{ alignItems: 'center' }}>
              <EvilIcons name="comment" size={24} color="#fff" />
              <Text style={styles.songBrowerTxt}>
                {this.state.playlist.commentCount}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <EvilIcons name="external-link" size={24} color="#fff" />
              <Text style={styles.songBrowerTxt}>
                {this.state.playlist.shareCount}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <EvilIcons name="arrow-down" size={24} color="#fff" />
              <Text style={styles.songBrowerTxt}>
                下载
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <EvilIcons name="gear" size={24} color="#fff" />
              <Text style={styles.songBrowerTxt}>
                多选
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rosybrown', borderBottomColor: '#ddd', borderBottomWidth: .5}}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderTopLeftRadius: 10, backgroundColor: '#fff' }}>
              <EvilIcons name="play" size={25} color="#000" style={{marginLeft: 6}}/>
              <Text style={{ marginLeft: 5, color: '#000' }}>播放全部</Text>
              <Text style={{ fontSize: 12, color: '#a9a9a9', marginLeft: 2 }}>(共{this.state.playlist.trackCount}首)</Text>
            </View>
            <View style={{ width: screen.width / 4, height: 45, backgroundColor: '#D43C33', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 10 }}>
              <Text style={{ fontSize: 11, color: '#fff' }}>
                +收藏({this.state.playlist.subscribedCount})
              </Text>
            </View>
          </View>
          <ScrollView>
            {songListItem}
          </ScrollView>
        </View>
      </View>
    )
  }

  componentDidMount() {
    let personalizedId = this.getIdFromNav();
    this.getPlaylistDetailById(personalizedId);
  }

  async getPlaylistDetailById(personalizedId: number) {
    let response = await getPlaylistDetailById(personalizedId);
    let responseJson = await response.json();
    if (responseJson.code === 200) {
      this.setState({
        playlist: responseJson.playlist
      });
    }
  }

  getIdFromNav(): number {
    const { personalizedId } = this.props.navigation.state.params;
    return personalizedId;
  }

}


const styles = StyleSheet.create({
  songCover: {
    width: screen.width / 3.33,
    height: screen.width / 3.33,
    borderRadius: 3,
  },
  songBrower: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15
  },
  songBrowerTxt: {
    marginTop: 2,
    paddingBottom: 4,
    color: '#fff',
    fontSize: 12
  }
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    goPlayMusicScreen: (song: SongDetailState, navigation: any) => {
      dispatch(setSongDetail(song));
      const { navigate } = navigation;
      console.log(song.id);
        navigate('PlayMusic', {
          songId: song.id
        });
    }
  }
}

export default connect(null, mapDispatchToProps)(SongSheetDetail);