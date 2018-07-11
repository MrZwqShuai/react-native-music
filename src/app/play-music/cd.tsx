import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, StyleSheet, Easing, Image, TouchableWithoutFeedback } from 'react-native';
import { Animated } from 'react-native';
import screen from '../../utils/screen';
import { setLyricShow } from '../../redux/action';
import { connect } from 'react-redux';
type Props = {
  isPlaying: boolean
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

  public render() {
    console.log(this.props, '777');
    const rotateAnimInterpolate = this.rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const wiperAnimInterpolate = this.wiperAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '70deg']
    });
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Animated.Image source={require('../../assets/images/needle.png')} style={styles.CdNeedle}>
        </Animated.Image>
        <TouchableWithoutFeedback
          onPress={() => { this.props._onCDPress() }}>
          <Animated.View style={[styles.CdBox, {
            transform: [{
              rotate: rotateAnimInterpolate
            }]
          }]}
          >
            {this.props.children}
            <Image source={require('../../assets/images/cdcover.png')} style={styles.CdCover} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  componentDidMount() {
    console.log('this.props.onRef', this.props.onRef)
    this.props.onRef(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
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
    this.createRotateAnim().start(() => {
      if(this.props.isPlaying) {
        this.rotateAnim.setValue(0);
        this.rotateStart();
      }
    });
    Animated.timing(
      this.wiperAnim,
      {
        toValue: 1,
        easing: Easing.out(Easing.linear),
        duration: 1000,
      }
    ).start();
  }

  rotateStop() {
    // this.createRotateAnim().stop();
  }

}

const styles = StyleSheet.create({
  CdBox: {
    width: screen.width / 1.32,
    height: screen.width / 1.32,
    marginTop: -20,
    zIndex: -1,
    borderRadius: screen.width / 1.32 / 2,
    backgroundColor: '#fff',
    borderWidth: 40,
    borderColor: '#000',
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