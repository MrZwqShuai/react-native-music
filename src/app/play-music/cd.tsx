import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, StyleSheet, Easing, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Animated } from 'react-native';
import screen from '../../utils/screen';
import { setLyricShow } from '../../redux/action';
import { connect } from 'react-redux';
import { TrackSong } from '../interface/index';
import { SongDetail } from '../../redux/redux-model';
type Props = {
  isPlaying: boolean;
  songDetail: SongDetail;
  tracks: TrackSong[];
  toggleMusic: () => void;
}

type State = {
  rotate: number
}
declare const alert: any;
class CDScene extends PureComponent<Props, State> {

  rotateAnimTiming: any;

  rotateAnim: any;

  timer: number;

  wiperAnim: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      rotate: 100
    };
    this.rotateAnim = new Animated.Value(0);
    this.wiperAnim = new Animated.Value(0);
  }

  public renderCDCore() {
    const rotateAnimInterpolate = this.rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const CDCore = this.props.tracks.map((trackSong: TrackSong, idx: number) => {
      return (
      <View style={{ width: screen.width, alignItems: 'center' }} key={idx}>
      <TouchableWithoutFeedback
        onPress={() => { this.props._onCDPress() }}>
        <Animated.View style={[styles.CdBox, {
          transform: [{
            rotate: rotateAnimInterpolate
          }]
        }]}
        >
          {this.props.children}
          <Image source={{ uri: trackSong.al.picUrl }} style={styles.CdCover} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
      )
    })
    return CDCore
  }

  public render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Animated.Image source={require('../../assets/images/needle.png')} style={styles.CdNeedle}>
        </Animated.Image>
        <View
          style={styles.CdBoxBg}
        >
        </View>
        <ScrollView
          horizontal={true}
          alwaysBounceVertical={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          stickyHeaderIndices={[2]}
          onMomentumScrollEnd={(e) => { this.onScrollEnd(e) }}
        >
          {this.renderCDCore()}
        </ScrollView>
      </View>
    )
  }

  componentDidMount() {
    console.log('this.props.onRef', this.props.onRef);
    this.props.onRef(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  private onScrollEnd(scroll: any) {
    console.log(scroll.nativeEvent.contentOffset.x);
    let currentIdx = scroll.nativeEvent.contentOffset.x/screen.width;
    this.props.toggleMusic(currentIdx);
  }

  createRotateAnim() {
    return Animated.timing(
      this.rotateAnim,
      {
        toValue: 1,
        easing: Easing.out(Easing.linear),
        duration: 10000,
      });
  }

  rotateStart() {
    this.createRotateAnim().start();
  }

  rotateStop() {
    this.createRotateAnim().stop();
  }

}

const styles = StyleSheet.create({
  CdBox: {
    width: screen.width / 1.32,
    height: screen.width / 1.32,
    marginTop: (screen.width / 1.2 - screen.width / 1.32) / 2,
    borderRadius: screen.width / 1.32 / 2,
    backgroundColor: '#fff',
    borderWidth: 40,
    borderColor: '#000',
  },
  CdBoxBg: {
    position: 'absolute',
    width: screen.width / 1.2,
    height: screen.width / 1.2,
    top: screen.width / 3.5,
    borderRadius: screen.width / 1.2,
    backgroundColor: '#f0f8ff',
    borderWidth: 12,
    borderColor: '#f0f8ff',
    opacity: .1
  },
  CdCover: {
    width: screen.width / 1.82,
    height: screen.width / 1.82,
    borderRadius: screen.width / 1.32 / 2,
  },
  CdNeedle: {
    width: screen.width / 5,
    height: screen.width / 3.5,
  }
})

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    _onCDPress: () => {
      dispatch(setLyricShow(true))
    }
  };
};

export default connect(null, mapDispatchToProps)(CDScene);