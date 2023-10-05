import React, { useState, useRef, useEffect } from 'react';
import UserDetail from './UserDetail';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { calculateAge } from '../services/Utils'
import * as style from '../style'
import NextDestinations from './NextDestinations';
import { Image } from "react-native-expo-image-cache";
import { CacheManager } from "react-native-expo-image-cache";

import InstagramPhotos from './InstagramPhotos';
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
import { COLORS, FONT_SIZE } from '../style';
const { width, height } = Dimensions.get('window');
import Profile from './Profile';
import StyleText from './StyleText';
import InterestsProfile from './InterestsProfile';
import ConnectModal from './ConnectModal';
import ProfileCard from './ProfileCard';

const ParallaxCarousel = ({ items }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [paginationOpacity, setPaginationOpacity] = useState()
  const [instagramImages, setInstagramImages] = useState([])
  const [instagramHandle, setInstagramHandle] = useState('')
  const [connectModalVisible, setConnectModalVisible] = useState(false)

  const showConnectModal = () => setConnectModalVisible(true);
  const hideConnectModal = () => setConnectModalVisible(false);
  const [currentImage, setCurrentImage] = useState('')
  const [currentProfile, setCurrentProfile] = useState(null)

  const refsArray = useRef([]);
  const scrollRef = React.useRef();
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;

  const handleScrollToTop = (event) => {
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
    setCurrentProfile(items[0])
    const clearImageCache = async () => {
      await CacheManager.clearCache();
    }
    clearImageCache()
  }, [])

  useEffect(() => {
    setCurrentProfile(items[0])
  }, [items])

  // useEffect(() => {
  //   const getInstagramMedia = async () => {
  //     const graphResponse = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`)

  //     setInstagramHandle(graphResponse.data.data[0].username)
  //     let tempPictures = []
  //     graphResponse.data.data.forEach(mediaObject => {
  //       if (mediaObject.media_type != "VIDEO") {
  //         tempPictures.push(mediaObject)
  //       }
  //     })
  //     setInstagramImages(tempPictures.slice(0, 4))
  //   }
  //   try {
  //     getInstagramMedia()

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [])

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentPosition = contentOffset.y;
    setPaginationOpacity(0.75 - 2.5 * currentPosition / 100)
  };

  const handleMomentumEnd = (event) => {
    let currentScreenIndex = parseInt(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
    setCurrentImage(items[currentScreenIndex].picture)
    setCurrentProfile(items[currentScreenIndex])
    handleScrollToTop(event)
  }

  return (
    <View style={styles.screen}>
      <ConnectModal
        visible={connectModalVisible}
        hideModal={hideConnectModal}
        imageUri={currentImage}
        currentProfile={currentProfile}
      />
      <Animated.FlatList
        onMomentumScrollEnd={(event) => {
          handleMomentumEnd(event)
        }}
        ref={scrollRef}
        data={items}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={(e) => {
          Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
            { useNativeDriver: true },
          )
          handleScroll(e)
        }}
        renderItem={({ item, index }) => {
          return (
            <ProfileCard
              item={item}
              instagramImages={instagramImages}
              instagramHandle={instagramHandle}
              setCurrentImage={setCurrentImage}
              refsArray={refsArray}
              setImagesLoaded={setImagesLoaded}
              showConnectModal={showConnectModal}
              currentProfile={currentProfile}
            />
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
    // height: height * 1.5,
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

