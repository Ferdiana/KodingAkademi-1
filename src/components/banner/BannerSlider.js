import React from 'react';
import {Image, Center, NativeBaseProvider} from 'native-base';
import Swiper from 'react-native-swiper';
import Data from '../../data/Data';
import {customTheme} from '../../theme';

const BannerSlider = () => {
  return (
    <Swiper
      autoplay={true}
      loop={true}
      height={120}
      paginationStyle={{bottom: 5}}
      dotColor={'#0B2347'}
      activeDotColor={'#F9AD0A'}
      style={{overflow: 'hidden'}}>
      {Data.map(Banner => (
        <Center key={Banner.id} mx={5}>
          <Image
            source={{uri: `${Banner.image}`}}
            alt={'img'}
            w={'100%'}
            h={'100%'}
            borderRadius={10}
          />
        </Center>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
