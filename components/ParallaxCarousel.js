import React from 'react';

import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pagination from './Pagination';
import { TEXT_STYLES } from '../style';
import TripInfo from './TripInfo';
const { width, height } = Dimensions.get('window');
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
                </Animated.View>
                <Animated.View
                  style={[
                    {
                      position: 'relative',
                      bottom: 70,
                      width: "80%",
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
                  <TripInfo city={item.city}/>
                  <TripInfo city={item.city}/>
                  <TripInfo city={item.city}/>
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
    height: height - 175,
    resizeMode: 'cover',
  },
  titleContainer: {
    position: 'relative',
    bottom: 150,
    zIndex: 1,
  },
  title: {
    ...TEXT_STYLES.header,
    fontSize: 35,
    // color: '#fff',
  },
});

export default ParallaxCarousel;
