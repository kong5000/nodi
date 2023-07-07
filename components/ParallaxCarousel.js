import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pagination from './Pagination';
import { SIZES, TEXT_STYLES } from '../style';
import TripInfo from './TripInfo';
const { width, height } = Dimensions.get('window');
import Profile from './Profile';
const ParallaxCarousel = ({ items }) => {
  const scrollRef = React.useRef();
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={scrollRef}
        data={items}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            width * (index - 0.5),
            width * index,
            width * (index + 0.5),
          ];
          return (
            <View style={styles.item}>
              <Animated.View
                style={[
                  styles.connectButton,
                  {
                    // position: 'relative',
                    // bottom: 70,
                    // width: "80%",
                    opacity: scrollAnimation.interpolate({
                      inputRange,
                      outputRange: [0, 1, 0],
                    }),
                    transform: [
                      {
                        translateY: scrollAnimation.interpolate({
                          inputRange: inputRange,
                          outputRange: [10, 0, -25],
                        }),
                      },
                    ],
                  },
                ]}>
                {/* <TouchableOpacity style={styles.connectButtonContainer} >
                <Ionicons
                  color="white"
                  name="chatbubble" size={40} />
              </TouchableOpacity> */}
              </Animated.View>

              <ScrollView
                bounces={false}
                contentContainerStyle={styles.scroll}
              >
                <Animated.Image
                  source={{ uri: item.image }}
                  style={[
                    styles.image,
                    {
                      transform: [
                        {
                          translateX: scrollAnimation.interpolate({
                            inputRange: [
                              width * (index - 1),
                              width * index,
                              width * (index + 1),
                            ],
                            outputRange: [-width * 0.5, 0, width * 0.5],
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.titleContainer,
                    {
                      opacity: scrollAnimation.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                      }),
                      transform: [
                        {
                          translateX: scrollAnimation.interpolate({
                            inputRange: inputRange,
                            outputRange: [250, 0, -250],
                          }),
                        },
                      ],
                    },
                  ]}>
                  <Text style={styles.title}>{item.title}, {item.age}</Text>
                  <View style={styles.optionalInfoContainer}>
                    <View style={styles.professionContainer}>
                      <Ionicons
                        color="white"
                        name="briefcase" size={30} />
                      <Text style={styles.professionText}> Accountant</Text>
                    </View>
                    <View style={styles.professionContainer}>
                      <Ionicons
                        color="white"
                        name="book" size={30} />
                      <Text style={styles.professionText}> University of British Columbia</Text>
                    </View>
                  </View>
                </Animated.View>
                <Animated.View
                  style={[
                    {
                      position: 'relative',
                      bottom: 70,
                      width: "90%",
                      opacity: scrollAnimation.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                      }),
                      transform: [
                        {
                          translateX: scrollAnimation.interpolate({
                            inputRange: inputRange,
                            outputRange: [250, 0, -250],
                          }),
                        },
                      ],
                    },
                  ]}>
                  <Profile />
                  <TripInfo city={"Rio De Janeiro"} imageSource={require('../assets/rio.jpg')} />
                  <TripInfo city={"Vancouver"} imageSource={require('../assets/vancouver.jpg')} />
                  <TripInfo city={"Tomorrowland"} imageSource={require('../assets/tomorrowland.jpg')} />
                </Animated.View>

              </ScrollView>
            </View>
          );
        }}
      />
      {/* <Pagination
        items={items}
        scrollAnimation={scrollAnimation}
        scrollRef={scrollRef}
      /> */}
    </View >
  );
};

const styles = StyleSheet.create({
  optionalInfoContainer: {
    position: 'relative',
    bottom: 20,
    // backgroundColor: 'red',
    // alignItems: 'flex-start',

  },
  professionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  professionText: {
    color: "white",
    fontSize: 22,
    fontWeight: '600',
    shadowOffset: {
      // width: 10,
      height: 4,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  connectButton: {
    bottom: 105,
    right: 30,
    zIndex: 12,
    position: 'absolute'
  },
  screen: {
    flex: 1,
  },
  item: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width,
    height,
    // backgroundColor: 'red'
  },
  scroll: {
    // position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  image: {
    width,
    height: height - SIZES.footerHeight,
    resizeMode: 'cover',
  },
  titleContainer: {
    display: 'flex',
    position: 'relative',
    bottom: 160,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    width: "100%",
    marginLeft:30
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 25,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    // color: '#fff',

  },
  connectButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "orange",
    width: 60,
    height: 60,
    borderRadius: 100
  }
});

export default ParallaxCarousel;
