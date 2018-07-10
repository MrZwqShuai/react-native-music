import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, StyleSheet, Easing, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
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
type Props = {
  isShowLyric: boolean;
}

type State = {
  isPlaying: boolean;
  progressSpeed: number;
  totalDuration: number;
  currentDuration: number;
}
declare const alert: any;
class PlayMusicScene extends PureComponent<Props, State> {

  static navigationOptions = ({ navigation }: any) => ({
    title: '正在播放...',
    tabBarVisible: false
  })

  player: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isPlaying: false,
      progressSpeed: 0,
      totalDuration: 0,
      currentDuration: 0
    };
  }

  public render() {
    let playMusicSceneRender = null;
    let musicState = null;
    if (this.props.isShowLyric) {
      playMusicSceneRender = <LyricScene />
    } else {
      playMusicSceneRender = <CDScene isPlaying={this.state.isPlaying} onRef={(ref: any) => { this.onRef(ref) }} />
    }
    if (this.state.isPlaying) {
      musicState = <Icon name="control-pause" size={22} color="#fff" onPress={() => { this.toggleMusicState() }} />;
    } else {
      musicState = <Icon name="control-play" size={22} color="#fff" onPress={() => { this.toggleMusicState() }} />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#9e9e9e' }}>
        {playMusicSceneRender}
        <View>
          <Video source={{ uri: "http://47.98.137.213/wymusic/%E6%83%85%E9%9D%9E%E5%BE%97%E5%B7%B2.mp3" }}   // Can be a URL or a local file.
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
          {musicState}
          <Icon name="control-end" size={22} color="#fff" />
          <Icon name="list" size={22} color="#fff" />
        </View>
      </View>
    )
  }

  componentDidMount() {
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

  onProgressMusic(e: any) {
    let currentTime = Math.floor(e.currentTime);
    this.setState({
      currentDuration: currentTime
    });
    console.log(e.currentTime, '正在播放...');
  }

  toggleMusicState() {
    this.setState((prevState: any) => {
      if (prevState.isPlaying) {
        this.CDSceneRef.rotateStop()
      } else {
        this.CDSceneRef.rotateStart()
      }
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
    height: 60
  }
})


const mapStateToProps = ({ CDReducer }: any) => {
  return {
    isShowLyric: CDReducer.isShowLyric
  }
}

export default connect(mapStateToProps)(PlayMusicScene);