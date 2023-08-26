import React, { useState, useRef, useEffect } from 'react';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

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
  TouchableOpacity,
  View,
} from 'react-native';
import Connect from './Connect';
import { COLORS, FONT_SIZE, SIZES } from '../style';
const { width, height } = Dimensions.get('window');
import Profile from './Profile';
import Interests from './Interests';
import DestinationScroller from './DestinationScroller';
import UserInfoScroller from './UserInfoScroller';
import StyleText from './StyleText';
import ConnectModal from './ConnectModal';
import ProfileInfoContainer from './ProfileInfoContainer';
import { relativeTimeRounding } from 'moment';
import { ribbon } from 'd3';

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
                style={
                  { flex: 1, backgroundColor: 'transparent' }
                }
              >
                <Animated.Image
                  onLoadEnd={() => {
                    setImagesLoaded(prev => prev + 1)
                  }}
                  source={{ uri: item.image }}
                  style={[
                    styles.image,
                  ]}
                />
                <ScrollView
                  contentContainerStyle={{
                    // flex: 1
                    width: width
                  }}
                  showsVerticalScrollIndicator={false}
                  ref={(element) => refsArray.current.push(element)}
                  overScrollMode='never'
                  bounces={false}>
                  <View style={styles.slider} />
                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={{
                        height: 90,
                        width: 90,
                        borderRadius: 100,
                        backgroundColor: COLORS.mainTheme,
                        position: 'relative',
                        top: 40,
                        left: width - width / 3,
                        zIndex: 10,
                      }}
                    >
                    </TouchableOpacity>
                    <View style={{
                      flex: 1,
                      backgroundColor: "white",
                      borderTopLeftRadius: 40,
                      borderTopRightRadius: 40
                    }}>
                      <StyleText
                        text={`${item.name}, ${item.age}`}
                        semiBold
                        fontSize={FONT_SIZE.profileName}
                      />
                    </View>
                  </View>
                </ScrollView>
              </Animated.View>
            </View>
          );
        }}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slider: {
    height: height * 0.45,
    // borderBottomEndRadius: 55
  },
  footer: {
    flex: 1,
    height: height,
    position: 'relative',
    top: -40
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
  image: {
    width: width,
    height: height / 2 + height / 10,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0
    // borderTopLeftRadius: 50
  },
});

export default ParallaxCarousel;

