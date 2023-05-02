import {View, Text, Stack} from 'native-base';
import React from 'react';
import {Header} from '../components';

const ArticleScreen = ({navigation}) => {
  return (
    <Stack>
      <Text>Ini Artikel</Text>
      {/* <Header text={'All Article'} navigation={navigation} /> */}
    </Stack>
  );
};

export default ArticleScreen;
