import * as React from 'react';
import { PureComponent } from 'react';
import { Text, View, ScrollView, FlatList, RefreshControl } from 'react-native';
import BannerComponent from '../../../components/banner/index';
import RecommendList from './recommend-list';
import { getBanners, getPersonalizedPlayList, getNewestPlayList } from '../../api/index';
import { personalized } from './recommend-model';

type Props = {
  tabLabel: string;
  navigation: any;
}

type Banner = {
  picUrl: string;
}

type State = {
  banners: Array<Banner>;
  isRefresh: boolean;
  personalizedPlayList: Array<personalized>
}

class RecommendScene extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      banners: [],
      isRefresh: false,
      personalizedPlayList: []
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefresh}
            onRefresh={() => this._onRefresh()}
            tintColor="#ff0000"
            title="加载中..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffffff"
          />
        }
      >
        <View >
          <BannerComponent banners={this.state.banners} />
          <RecommendList navigation={this.props.navigation} personalizedPlayList={this.state.personalizedPlayList} />
        </View>
      </ScrollView>
    )
  }

  componentDidMount() {
    this.renderBanners();
    this.getPersonalizedPlayList();
    this.getNewestPlayList();
  }


  showRefresh() {
    this.setState({
      isRefresh: true
    });
  }

  hideRefresh() {
    this.setState({
      isRefresh: false
    });
  }

  async _onRefresh() {
    if (!this.state.isRefresh) {
      this.showRefresh();
      let banners = await this.getBanners();
      if (banners && banners.length >= 0) {
        this.hideRefresh();
      }
    }
  }

  async renderBanners(): Promise<object> {
    let bannerElList: JSX.Element[];
    let banners: Array<{ picUrl: string }> = await this.getBanners();
    this.setState({
      banners: banners
    });
    console.log(banners, '-dsadsad-9-');
    return banners;
  }

  /**
   * 获取轮播图地址
   */
  async getBanners(): Promise<any> {
    let response = await getBanners();
    let responseJson = await response.json();
    let banners = responseJson.banners;
    return banners;
  }

/**
 * 获取热门歌单
 */

  async getPersonalizedPlayList(): Promise<any> {
    let response = await getPersonalizedPlayList();
    let responseJson = await response.json();
    console.log(responseJson, '-0090222-9-');
    let personalizedPlayList;
    if(responseJson.code === 200) {
      personalizedPlayList = responseJson.result;
    } else {
      alert('获取歌单失败...');
    }
    this.setState({
      personalizedPlayList: personalizedPlayList
    });
    return personalizedPlayList;
  }

  
/**
 * 获取最新音乐
 */
async getNewestPlayList(): Promise<any> {
  let response = await getNewestPlayList();
  let responseJson = await response.json();
  console.log(responseJson, '-getNewestPlayList-9-');
  let newestPlayList;
  if(responseJson.code === 200) {
    // newestPlayList = responseJson.result;
  } else {
    alert('获取最新音乐失败...');
  }
  this.setState({
    // newestPlayList: newestPlayList
  });
  return newestPlayList;
}


}

export default RecommendScene;