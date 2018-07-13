import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, StyleSheet, Easing, Image, TouchableWithoutFeedback, Alert } from 'react-native';
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
import Sound from 'react-native-sound';
import { TrackSong, AL } from '../interface/index';
type Props = {
  isShowLyric: boolean;
  navigation: any;
  songDetail: SongDetail;
  songTracks: TrackSong[];
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
    tabBarVisible: false,
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      fontSize: 14,
      color: '#000',
      fontWeight: 'normal',
    },
  })

  player: any;

  // 歌曲的引用
  sound: any;

  // 定时器引用
  timer: number;

  // 用于set滑动条
  currentTimer: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      isPlaying: false,
      progressSpeed: 0,
      totalDuration: 0,
      currentDuration: 0,
      songUrl: ''
    };
    Sound.setCategory('Playback', true);
  }

  public render() {
    PlayMusicScene.navTitle = this.props.songDetail.name
    let playMusicSceneRender = null;
    let musicState = null;
    if (this.props.isShowLyric) {
      playMusicSceneRender = <LyricScene />
    } else {
      playMusicSceneRender = <CDScene isPlaying={this.state.isPlaying} tracks={this.props.songTracks} songDetail={this.props.songDetail} onRef={(ref: any) => { this.onRef(ref) }} toggleMusic={this.toggleMusic.bind(this)} />
    }
    if (this.state.isPlaying) {
      musicState = <Icon name="control-pause" size={22} color="#fff" />;
    } else {
      musicState = <Icon name="control-play" size={22} color="#fff" />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#9e9e9e' }}>
        {playMusicSceneRender}
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
    this.getMusicUrlByIdx(this.props.songDetail.idx);
  }

  componentWillUnmount() {
    this.destoryMusic();
    this.stopMusic();
    clearTimeout(this.timer);
    clearInterval(this.currentTimer);
  }

  getSongId(songIdx: number): number {
    let songId = this.props.songTracks[songIdx].id;
    return songId;
  }
  videoError() {
    clearInterval(this.currentTimer);
  }


  // 正在播放音乐
  onProgressMusic(e: any) {
    let currentTime = Math.floor(e.currentTime);
    let progressSpeed = e.currentTime / this.state.totalDuration;
    this.setState({
      currentDuration: currentTime,
      progressSpeed: Number(progressSpeed)
    });
  }

  toggleMusicState() {
    clearInterval(this.currentTimer);
    if (this.state.isPlaying) {
      this.pauseMusic()
      this.setState({
        isPlaying: false
      });
      // this.CDSceneRef.rotateStop();
    } else {
      this.playMusice(this.sound)
      // this.CDSceneRef.rotateStart();
    }
    this.setState((prevState: any) => {
      return {
        isPlaying: !this.state.isPlaying
      }
    });

  }

  /**
   * 播放音乐
   */
  playMusice(sound: any) {
    sound.play((success: any) => {
      this.videoError();
      sound.reset();
    });
    this.currentTimer = setInterval(() => {
      sound.getCurrentTime((seconds: number) => {
        this.setState({
          currentDuration: Math.floor(seconds),
          progressSpeed: seconds/this.state.totalDuration
        });
      });
    }, 1000);
  }

  /**
   * 暂停当前播放
   */
  pauseMusic() {
    this.sound.pause();
  }

  /**
   * 销毁音乐
   */
  destoryMusic() {
    this.sound.release();
  }

  /**
   * stop music
   */
  stopMusic() {
    this.sound.stop();
  }


  /**
   * 给子组件调用 滑屏切换音乐
   */
  async toggleMusic(currentIdx: number) {
    this.stopMusic();
    clearInterval(this.currentTimer);
    this.setState((prevState: any) => {
      return {
        isPlaying: true
      }
    });
    // this.CDSceneRef.rotateStop();
    let soundInstance = await this.getMusicUrlByIdx(currentIdx);
    // 这里有问题 为毛定时器不准...
    this.timer = setTimeout(() => {
      this.playMusice(soundInstance);
      // this.CDSceneRef.rotateStart();
      clearTimeout(this.timer);
    }, 9000);
  }

  /**
   * 拖动进度条
   */
  dropMusicSlider(speed: number) {
    this.setState({
      currentDuration: Math.floor(speed * this.state.totalDuration)
    });
    this.sound.setCurrentTime(speed * this.state.totalDuration);
    // this.player.seek(this.state.currentDuration);
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

  /**
   * 播放音乐
   */

  playSound(songResource: string) {
    const callback = (error, sound) => {
      if (error) {
        Alert.alert('error', error.message);
        return;
      }
      this.setState({
        totalDuration: sound._duration
      });
    };
    this.sound = new Sound(songResource, Sound.MAIN_BUNDLE, error => callback(error, this.sound));
    return this.sound;
  }

  /**
   * 
   * @param songIdx 
   * 返回音乐实例 供应链调用
   */
  async getMusicUrlByIdx(songIdx: number) {
    let songId = this.getSongId(songIdx);
    let response = await getMusicUrlById(songId);
    let responseJson = await response.json();
    let soundInstance;
    if (responseJson.code === 200) {
      this.setState({
        songUrl: responseJson.data[0].url
      });
      soundInstance = this.playSound(responseJson.data[0].url);
    }
    return soundInstance
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
  return {
    isShowLyric: CDReducer.isShowLyric,
    songDetail: songDetailReducer.song,
    songTracks: songDetailReducer.tracks
  }
}

export default connect(mapStateToProps)(PlayMusicScene);


/**
 * 如果用户点进来没等请求 直接点击播放是有问题的
 */