import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, StyleSheet, Easing, Image, TouchableWithoutFeedback } from 'react-native';
import { Animated } from 'react-native';
import screen from '../../utils/screen';
import CDScene from './cd';
import LyricScene from './lyric';
import { connect } from 'react-redux';
import { setLyricShow } from '../../redux/action';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import { getAudioTime } from '../../utils/index';
import { getMusicUrlById } from '../api/index';
import { SongDetail } from '../../redux/redux-model';
type Props = {
  isShowLyric: boolean;
  navigation: any;
  songDetail: SongDetail
}

type State = {
  isPlaying: boolean;
  progressSpeed: number;
  totalDuration: number;
  currentDuration: number;
  songUrl: string;
}
declare const alert: any;
class PlayMusicScene extends PureComponent<Props, State> {

  static navTitle = '';

  static navigationOptions = ({ navigation }: any) => ({
    title: PlayMusicScene.navTitle,
    tabBarVisible: false
  })

  player: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isPlaying: false,
      progressSpeed: 0,
      totalDuration: 0,
      currentDuration: 0,
      songUrl: ''
    };
  }

  public render() {
    let playMusicSceneRender = null;
    let musicState = null;
    if (this.props.isShowLyric) {
      playMusicSceneRender = <LyricScene />
    } else {
      playMusicSceneRender = <CDScene isPlaying={this.state.isPlaying} coverImg={this.props.songDetail.coverImg} onRef={(ref: any) => { this.onRef(ref) }} />
    }
    if (this.state.isPlaying) {
      musicState = <Icon name="control-pause" size={22} color="#fff" />;
    } else {
      musicState = <Icon name="control-play" size={22} color="#fff" />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#9e9e9e' }}>
        {playMusicSceneRender}
        <View>
          <Video source={{ uri: this.state.songUrl}}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}                                      // Store reference
            onLoad={(e: any) => { this.onLoadMusic(e) }}
            onProgress={(e: any) => { this.onProgressMusic(e) }}
            onEnd={this.onEnd}                      // Callback when playback finishes
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            paused={!this.state.isPlaying}
          />
        </View>
        <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.audioDurationComplete}>
            {getAudioTime(this.state.currentDuration)}
          </Text>
          <Slider
            value={this.state.progressSpeed}
            onValueChange={(progressSpeed: number) => { this.dropMusicSlider(progressSpeed) }}
            onSlidingStart={() => { this.slidingStart() }}
            onSlidingComplete={() => { this.slidingComplete() }}
            style={{ width: screen.width - 100 }}
            minimumTrackTintColor="#D43C33"
            maximumTrackTintColor="#f3f3f3"
            trackStyle={{ height: 2 }}
            thumbStyle={{ width: 14, height: 14, backgroundColor: '#fff' }}
          />
          <Text style={styles.audioDurationTotal}>
            {getAudioTime(this.state.totalDuration)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
          <Icon name="loop" size={22} color="#fff" />
          <Icon name="control-start" size={22} color="#fff" />
          <TouchableWithoutFeedback onPress={() => { this.toggleMusicState() }}>
            {musicState}
          </TouchableWithoutFeedback>
          <Icon name="control-end" size={22} color="#fff" />
          <Icon name="list" size={22} color="#fff" />
        </View>
      </View>
    )
  }

  componentDidMount() {
    this.getMusicUrlById();
  }

  getSongId(): number {
    let songId = this.props.navigation.state.params.songId;
    return songId;
  }

  onEnd() {
    console.log('音频移除...');
  }

  videoError() {
    alert('播放失败, 请重试');
  }

  onLoadMusic(e: any) {
    console.log(this.player, '-------e--------');
    this.setState({
      totalDuration: e.duration
    })
  }

  // 正在播放音乐
  onProgressMusic(e: any) {
    let currentTime = Math.floor(e.currentTime);
    let progressSpeed = e.currentTime/this.state.totalDuration;
    this.setState({
      currentDuration: currentTime,
      progressSpeed: Number(progressSpeed)
    });
  }

  toggleMusicState() {
    if (this.state.isPlaying) {
      this.setState({
        isPlaying: false
      });
      this.CDSceneRef.rotateStop();
    } else {
      this.CDSceneRef.rotateStart();
    }
    this.setState((prevState: any) => {
      return {
        isPlaying: !this.state.isPlaying
      }
    });

  }

  /**
   * 拖动进度条
   */
  dropMusicSlider(speed: number) {
    this.setState({
      currentDuration: Math.floor(speed * this.state.totalDuration)
    });
    this.player.seek(this.state.currentDuration);
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps, '----nextProps----');
  }

  /**
   * 按下音乐暂停
   */
  slidingStart() {

  }

  /**
   * 松开音乐滑块
   */
  slidingComplete() {
    this.setState({
      isPlaying: this.state.isPlaying
    });
  }

  onRef(ref: any) {
    this.CDSceneRef = ref;
  }

  async getMusicUrlById() {
    let songId = this.getSongId();
    let response = await getMusicUrlById(songId);
    let responseJson = await response.json();
    if (responseJson.code === 200) {
      this.setState({
        songUrl: responseJson.data[0].url
      });
      console.log(this.state.songUrl, '--90dsadsad0---')
    }
  }
}

const styles = StyleSheet.create({
  audioDurationTotal: {
    fontSize: 10,
    color: '#ddd'
  },
  audioDurationComplete: {
    fontSize: 10,
    color: '#f6f6f6'
  },
  backgroundVideo: {
    height: 0
  }
})


const mapStateToProps = ({ CDReducer, songDetailReducer }: any) => {
  PlayMusicScene.navTitle = songDetailReducer.song.name;
  return {
    isShowLyric: CDReducer.isShowLyric,
    songDetail: songDetailReducer.song
  }
}

export default connect(mapStateToProps)(PlayMusicScene);