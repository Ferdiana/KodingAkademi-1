import React from 'react';
import {Image, Center} from 'native-base';
import Swiper from 'react-native-swiper';
import Data from '../../data/Data';
import Colors from '../../theme/colors';

const BannerSlider = () => {
  return (
    <Swiper
      autoplay={true}
      loop={true}
      height={120}
      paginationStyle={{bottom: 5}}
      dotColor={Colors.neutral[100]}
      activeDotColor={Colors.neutral[900]}
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
