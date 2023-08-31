import React, { useState, useRef, useEffect } from 'react';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import UserDetail from './UserDetail';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { calculateAge } from '../services/Utils'
import * as style from '../style'
import NextDestinations from './NextDestinations';
import {Image} from "react-native-expo-image-cache";
import {CacheManager} from "react-native-expo-image-cache";

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
import InterestsProfile from './InterestsProfile';
import ConnectModal from './ConnectModal';
import ProfileInfoContainer from './ProfileInfoContainer';
import { relativeTimeRounding } from 'moment';
import { index, ribbon } from 'd3';
import { FontAwesome } from "@expo/vector-icons"

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

  useEffect (() => {
    setCurrentProfile(items[0])
    const clearImageCache = async () => {
      await CacheManager.clearCache();
    }
    clearImageCache()
  },[])
  
  useEffect (() => {
    setCurrentProfile(items[0])
  },[items])

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
      setInstagramImages(tempPictures.slice(0, 4))
    }
    getInstagramMedia()
  }, [])

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentPosition = contentOffset.y;
    setPaginationOpacity(0.75 - 2.5 * currentPosition / 100)
    // console.log('currentScreenIndex', parseInt(event.nativeEvent.contentOffset.x/Dimensions.get('window').width));
  };

  const handleMomentumEnd = (event) => {
    // console.log('currentScreenIndex', parseInt(event.nativeEvent.contentOffset.x/Dimensions.get('window').width))
    let currentScreenIndex =  parseInt(event.nativeEvent.contentOffset.x/Dimensions.get('window').width)
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
            <View style={styles.item}>
               {/* Image below just for caching for quick loading in modal */}
              <Image style={{ height: 0, width: 0 }} uri={item.picture} />

              <Animated.View
                style={
                  { flex: 1, backgroundColor: 'transparent' }
                }
              >
                <Animated.Image
                  onLoadEnd={() => {
                    setImagesLoaded(prev => prev + 1)
                  }}
                  source={{ uri: item.picture }}
                  style={[
                    styles.image,
                  ]}
                />
                <ScrollView
                  contentContainerStyle={{
                    width: width,
                    paddingBottom: "10%"
                  }}
                  showsVerticalScrollIndicator={false}
                  ref={(element) => refsArray.current.push(element)}
                  overScrollMode='never'
                  bounces={false}>
                  <View style={styles.slider} />
                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={{
                        ...style.FLEX_CENTERED,
                        height: 90,
                        width: 90,
                        borderRadius: 100,
                        backgroundColor: COLORS.mainTheme,
                        position: 'relative',
                        top: 40,
                        left: width - width / 3,
                        zIndex: 10,
                      }}
                      onPress={() => {
                        setCurrentImage(item.picture)
                        showConnectModal()
                      }}
                    >
                      <Ionicons
                        style={{
                          ioniconStrokeWidth: 100
                        }}
                        // ionicon-stroke-width
                        name="paper-plane-outline"
                        size={45} color="white"
                      />
                    </TouchableOpacity>
                    <View style={{
                      flex: 1,
                      backgroundColor: "white",
                      borderTopLeftRadius: 40,
                      borderTopRightRadius: 40
                    }}>
                      <View style={{
                        width: "63%",
                        marginLeft: "10%",
                        marginTop: "10%",
                      }}>
                        <StyleText
                          text={`${item.name}, ${calculateAge(item.birthDate)}`}
                          semiBold
                          fontSize={FONT_SIZE.profileName}
                        />
                      </View>
                      <View style={{
                        display: 'flex',
                        alignItems: 'left',
                        marginLeft: '10%',
                        marginTop: '2%',
                      }}>
                        {item.home && <UserDetail
                          icon="person-outline"
                          text={item.home}
                        />}
                        {item.profession && <UserDetail
                          icon="person-outline"
                          text={item.profession}
                        />}
                        {item.education && <UserDetail
                          icon="person-outline"
                          text={item.education}
                        />}
                      </View>

                      <View style={{
                        marginLeft: '10%',
                        marginTop: '10%',
                      }}>
                        <StyleText
                          text='About'
                          bold
                          fontSize={22}
                          style={{ marginBottom: "3%" }}
                        />
                        <Profile />
                      </View>
                      <View
                        style={{
                          marginLeft: '10%',
                          marginTop: '10%',
                        }}
                      >
                        <StyleText
                          text='Interests'
                          bold
                          fontSize={22}
                          style={{ marginBottom: "3%" }}
                        />
                        <InterestsProfile interests={item.interests} />
                      </View>

                      <View
                        style={{
                          marginLeft: '10%',
                          marginTop: '10%',
                        }}
                      >
                        <StyleText
                          text='Next Stop'
                          bold
                          fontSize={22}
                          style={{ marginBottom: "3%" }}
                        />
                        <NextDestinations
                          destinations={["🇵🇭 Philippines", "🇯🇵 Japan"]}
                        />
                      </View>
                      <View style={{ marginHorizontal: "10%" }}>
                        <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '10%'
                        }}>
                          {/* <Ionicons
                            color="black"
                            name="logo-instagram" size={30} 
                            style={{marginRight: "1%"}}
                            /> */}
                          <StyleText
                            text={"Instagram"}
                            bold
                            fontSize={22}
                          />
                          <StyleText
                            text={`@${instagramHandle}`}
                            fontSize={20}
                            style={{
                              color: COLORS.mainTheme
                            }}
                          />
                        </View>
                        <InstagramPhotos
                          images={instagramImages}
                          handle={instagramHandle}
                        />
                      </View>
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

