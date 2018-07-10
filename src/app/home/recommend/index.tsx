import * as React from 'react';
import { PureComponent } from 'react';
import { Text, View, ScrollView, FlatList, RefreshControl } from 'react-native';
import BannerComponent from '../../../components/banner/index';
import RecommendList from './recommend-list';
import { getBanners, getPlayListNewest } from '../../api/index';

type Props = {
  tabLabel: string;
  navigation: any;
}

type Banner = {
  path: string;
}

type State = {
  banners: Array<Banner>;
  isRefresh: boolean;
}

class RecommendScene extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      banners: [],
      isRefresh: false
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
          <RecommendList navigation={this.props.navigation} />
        </View>
      </ScrollView>
    )
  }

  componentDidMount() {
    this.renderBanners();
    // this.getPlayListNewest();
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
    let banners: Array<{ path: string }> = await this.getBanners();
    this.setState({
      banners: banners
    });
    return banners;
  }

  /**
   * 获取轮播图地址
   */
  async getBanners(): Promise<any> {
    let response = await getBanners();
    let responseJson = await response.json();
    let banners = responseJson.data;
    return banners;
  }

  async getPlayListNewest(): Promise<any> {
    let response = await getPlayListNewest();
    let responseJson = await response.json();
    let banners = responseJson.data;
    console.log(responseJson, 'response')
  }
}

export default RecommendScene;