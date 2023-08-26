import React, { useState, useRef, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import InstagramPhotos from './InstagramPhotos';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Connect from './Connect';
import { SIZES } from '../style';
const { width, height } = Dimensions.get('window');
import Profile from './Profile';
import Interests from './Interests';
import DestinationScroller from './DestinationScroller';
import UserInfoScroller from './UserInfoScroller';
import StyleText from './StyleText';
import ConnectModal from './ConnectModal';
import ProfileInfoContainer from './ProfileInfoContainer';

const ParallaxCarousel = ({ items, selectedTrip, noTrips }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [paginationOpacity, setPaginationOpacity] = useState()
  const [instagramImages, setInstagramImages] = useState([])
  const [showWebView, setShowWebView] = useState(true)
  const [instagramHandle, setInstagramHandle] = useState('')
  const [connectModalVisible, setConnectModalVisible] = useState(false)

  const showConnectModal = () => setConnectModalVisible(true);
  const hideConnectModal = () => setConnectModalVisible(false);
  const [currentImage, setCurrentImage] = useState('')
  const [currentProfile, setCurrentProfile] = useState(null)

  const refsArray = useRef([]);
  const scrollRef = React.useRef();
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;

  const handleScrollToTop = () => {
    if (refsArray.current) {
      refsArray.current.forEach(ref => {
        if (ref) {
          ref.scrollTo({
            y: 0,
            animated: true,
          })
        }
      }
      )
    }
  };
  const access_token = "IGQVJWUTE0aHFHa1dsNWk1NVU2bHpIWnFnLW9iZA2swalRyajMzeXl1c1IzVk5YRnBMUURJaWxXdktNWTNtelN0X183WDZAxellYTWtkZAWROaUc2LXZAPZAUpGVjh1R0NMcTdKd2lPbndVakhOYkd6TUVxeQZDZD"

  useEffect(() => {
    setImagesLoaded(0)
  }, [selectedTrip])

  useEffect(() => {
    const getInstagramMedia = async () => {
      const graphResponse = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`)

      setInstagramHandle(graphResponse.data.data[0].username)
      setShowWebView(false)
      let tempPictures = []
      graphResponse.data.data.forEach(mediaObject => {
        if (mediaObject.media_type != "VIDEO") {
          tempPictures.push(mediaObject)
        }
      })
      setInstagramImages(tempPictures.slice(0, 6))
    }
    getInstagramMedia()
  }, [])

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentPosition = contentOffset.y;
    setPaginationOpacity(0.75 - 2.5 * currentPosition / 100)
  };

  return (
    <View style={styles.screen}>
      <Animated.FlatList
        onMomentumScrollEnd={() => {
          handleScrollToTop()
        }}
        ref={scrollRef}
        data={[1,2,3]}
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
                  {
                    width: "100%",
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
                <ScrollView overScrollMode='never' bounces={false}>
                  <View style={styles.slider}>
                    <ScrollView
                      horizontal
                      snapToInterval={width}
                      decelerationRate="fast"
                      showsHorizontalScrollIndicator={false}
                      bounces={false}
                    >
                    </ScrollView>
                  </View>
                  <View style={styles.footer}>
                    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "cyan" }}></View>
                    <View style={{
                      flex: 1,
                      backgroundColor: "white",
                      borderTopLeftRadius: 40,
                      borderTopRightRadius: 40
                    }}></View>
                  </View>
                </ScrollView>
              </Animated.View>
            </View>
          );
        }}
      />
      {/* <Pagination
        opacity={paginationOpacity}
        items={items}
        scrollAnimation={scrollAnimation}
        scrollRef={scrollRef}
      /> */}
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slider: {
    height: height / 2,
    backgroundColor: 'cyan',
    // borderBottomEndRadius: 55
  },
  footer: {
    flex: 1,
    height: height,
    backgroundColor: 'red'
  },
  screen: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width,
    height,
    // backgroundColor: 'red'
  },
});

export default ParallaxCarousel;
