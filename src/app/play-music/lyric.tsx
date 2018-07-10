import * as React from 'react';
import { PureComponent } from 'react';
import screen from '../../utils/screen';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { setLyricShow } from '../../redux/action';
import { connect } from 'react-redux';
type Props = {
}

type State = {
}
declare const alert: any;
class LyricScene extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={{ alignItems: 'center' }}>
      <TouchableWithoutFeedback
        onPress={() => { this.props._onLyricPress() }}
      >
      <View>
        <Text>
          歌词歌词
        </Text>
        <Text>
          歌词歌词
        </Text>
        <Text>
          歌词歌词
        </Text>
        <Text>
          歌词歌词
        </Text>
      </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  componentDidMount() {
  }

}
const styles = StyleSheet.create({

})

const mapDispatchToProps = (dispatch: any) => {
  return {
    _onLyricPress: () => {
      dispatch(setLyricShow(false))
    }
  };
};
export default connect(null, mapDispatchToProps)(LyricScene);