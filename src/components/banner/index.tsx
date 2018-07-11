import * as React from 'react';
import { PureComponent } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';

import screen from '../../utils/screen';

type Banner = {
  picUrl: string;
}

type Props = {
  banners: Array<Banner>
}

class BannerComponent extends PureComponent<Props> {

  constructor(propps: Props) {
    super(propps);
  }   

  render() {
    const bannerView = this.props.banners.map((banner: Banner, i: number) => {
      return <Image key={i} source={{ uri: banner.picUrl }} style={{ width: screen.width, height: 120 }} />
    });
    return (
      <ScrollView
        style={{ height: 120 }}
        horizontal={true}
        alwaysBounceVertical={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      >
      {bannerView}
      </ScrollView>
    )
  }

}

export default BannerComponent;