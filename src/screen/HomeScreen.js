import React from 'react';
import {Text, ScrollView, HStack, VStack, Stack, Pressable} from 'native-base';
import {
  Article,
  BannerSlider,
  HeaderHome,
  MyCourse,
  Promo,
} from '../components';

function HomeScreen({navigation}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeaderHome navigation={navigation} />
      <Stack space={1}>
        <VStack space={2} py={2} bg={'neutral.50'}>
          <HStack px={5} justifyContent={'space-between'} alignItems={'center'}>
            <Text
              color={'neutral.900'}
              fontFamily={'Inter'}
              fontWeight={700}
              fontSize={'sm'}>
              My Course
            </Text>
            <Pressable onPress={() => navigation.navigate('MyCourse')}>
              <Text
                color={'primary.500'}
                underline
                fontFamily={'Inter'}
                fontWeight={400}
                fontSize={'xs'}>
                See all
              </Text>
            </Pressable>
          </HStack>
          <ScrollView
            px={5}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <HStack space={2}>
              <MyCourse flexDirection={'row'} mr={7} />
            </HStack>
          </ScrollView>
        </VStack>
        <VStack space={2} py={2} bg={'neutral.50'}>
          <HStack px={5} justifyContent={'space-between'} alignItems={'center'}>
            <Text
              color={'neutral.900'}
              fontFamily={'Inter'}
              fontWeight={700}
              fontSize={'sm'}>
              Latest Events
            </Text>
            <Pressable onPress={() => navigation.navigate('Event')}>
              <Text
                color={'primary.500'}
                underline
                fontFamily={'Inter'}
                fontWeight={400}
                fontSize={'xs'}>
                See all
              </Text>
            </Pressable>
          </HStack>
          <BannerSlider />
        </VStack>
        <VStack space={2} py={2} bg={'neutral.50'}>
          <HStack px={5} justifyContent={'space-between'} alignItems={'center'}>
            <Text
              color={'neutral.900'}
              fontFamily={'Inter'}
              fontWeight={700}
              fontSize={'sm'}>
              Article
            </Text>
            <Pressable onPress={() => navigation.navigate('Article')}>
              <Text
                color={'primary.500'}
                underline
                fontFamily={'Inter'}
                fontWeight={400}
                fontSize={'xs'}>
                See all
              </Text>
            </Pressable>
          </HStack>
          <ScrollView
            px={5}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <HStack space={2}>
              <Article flexDirection={'row'} mr={7} />
            </HStack>
          </ScrollView>
        </VStack>
        <VStack space={2} py={2} bg={'neutral.50'}>
          <VStack px={5}>
            <Text
              color={'neutral.900'}
              fontFamily={'Inter'}
              fontWeight={700}
              fontSize={'sm'}>
              Course Promo
            </Text>
            <Text
              color={'neutral.900'}
              fontFamily={'Inter'}
              fontWeight={400}
              fontSize={'xs'}>
              Learning promo, limited time. Grab it fast!
            </Text>
          </VStack>
          <ScrollView
            px={5}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <HStack space={2}>
              <Promo flexDirection={'row'} mr={7} />
            </HStack>
          </ScrollView>
        </VStack>
      </Stack>
    </ScrollView>
  );
}
export default HomeScreen;
