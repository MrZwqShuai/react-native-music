import * as React from 'react';
import { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import { Icons } from './recommend-model';
import RecommendPlate from './recommend-plate';
type Props = {
  navigation: any
}
declare const alert: any;

class RecommendList extends PureComponent<Props>{

  constructor(props: Props) {
    super(props);
  }

  public render() {
    console.log(this.props)
    const { navigate } = this.props.navigation;
    const icons: Icons[] = [
      { name: 'md-radio', title: '私人FM' },
      { name: 'md-calendar', title: '每日推荐' },
      { name: 'ios-musical-notes', title: '歌单' },
      { name: 'md-stats', title: '排行榜' }
    ]
    const recommendMenu = icons.map((icon: Icons, index: number) => {
      return (
        <View style={{ alignItems: 'center' }} key={index}>
          <TouchableOpacity style={styles.recommendMenuItem}>
            <Icon name={icon.name} size={25} color="#D43C33" />
          </TouchableOpacity>
          <Text style={{ fontSize: 12, marginTop: 8 }}>{icon.title}</Text>
        </View>
      )
    })
    return (
      <View>
        <View style={styles.recommendMenu}>
          {recommendMenu}
        </View>
        <View style={{ height: .4, backgroundColor: '#ccc', marginTop: 15, transform: [{ translateY: 0 }] }}></View>
        <RecommendPlate navigation={this.props.navigation} />
      </View>
    )
  }

  _onPress() {
  }
}


const styles = StyleSheet.create({
  recommendMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12
  },
  recommendMenuItem: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#D43C33',
    backgroundColor: '#fff',
  }
})
export default RecommendList;