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
      <ConnectModal
        visible={connectModalVisible}
        hideModal={hideConnectModal}
        imageUri={currentImage}
        currentProfile={currentProfile}
      />
      {!items.length &&
        <View style={{
          height: "90%",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {noTrips ?
            <StyleText
              text="Add your first trip"
              fontSize={25}
              semiBold
              style={{margin: 10}}
            />
            : <StyleText
              text="Sorry, no matches for this trip yet"
              fontSize={25}
              semiBold
              style={{margin: 10}}
            />}
        </View>}
      <StatusBar hidden />
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
                style={[
                  styles.connectButton,
                  {
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
              </Animated.View>
              <View style={{
                position: 'absolute',
                top: 615,
                left: 115,
                zIndex: 1,

              }}>
                {!connectModalVisible && <Connect
                  onPress={() => {
                    setCurrentImage(item.image)
                    setCurrentProfile(item)
                    showConnectModal()
                  }}
                />}

              </View>

              <ScrollView
                scrollEnabled={(imagesLoaded == items.length)}
                ref={(element) => refsArray.current.push(element)}

                onScroll={handleScroll}
                scrollEventThrottle={15}
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.scroll}
              >
                {(imagesLoaded == items.length) &&
                  <View style={{
                    width,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 15
                  }
                  }>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 25
                    }}>
                      <StyleText
                        text={item.title}
                        semiBold
                        style={
                          { fontSize: 30 }
                        }
                      />
                      <StyleText
                        text={" / " + item.age}
                        style={
                          { fontSize: 20 }
                        }
                      />
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 25
                      }}
                    >
                      <StyleText
                        text={"Brasilia"}
                        style={
                          { fontSize: 20 }
                        }
                      />
                      <Ionicons
                        style={styles.detailIcon}
                        name="location-outline"
                        size={32} />
                    </View>
                  </View>
                }
                {
                  (imagesLoaded !== items.length) &&
                  <View
                    style={{
                      height: height - SIZES.headerHeight - SIZES.footerHeight,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <StyleText
                      semiBold
                      text={`${selectedTrip.city.split(',')[0]}`}
                      style={{ fontSize: 30, margin: 30 }}
                    />
                    <ActivityIndicator
                      style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                      animating={true}
                      size="large"
                    />
                  </View>
                }
                <Animated.Image
                  // onLoadStart={() => console.log(true)}
                  onLoadEnd={() => {
                    setImagesLoaded(prev => prev + 1)
                  }}
                  source={{ uri: item.image }}
                  style={[
                    styles.image,
                    (imagesLoaded !== items.length && {
                      backgroundColor: 'red',
                    })
                  ]}
                />
                {(imagesLoaded == items.length) &&
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
                    {/* <UserInfoScroller
                      interests={["🎂 30", "🏠 Brasilia", "💼 Illustrator"]}
                    /> */}
                    <View style={{ marginVertical: 15 }}>
                      <ProfileInfoContainer
                        text='Illustrator'
                        icon='briefcase-outline'
                      />
                      <ProfileInfoContainer
                        text='University of Brasília'
                        icon='school-outline'
                      />
                      <ProfileInfoContainer
                        text='Brasilia'
                        icon='home-outline'
                      />
                    </View>
                    {item.goingTo &&
                      <View style={{ marginBottom: 15 }}>
                        <DestinationScroller
                          selectedTrip={selectedTrip}
                          label={"Going To"}
                          items={item.goingTo}
                        />
                      </View>}
                    <Profile />
                    <View style={{ marginTop: 15 }}>
                      <DestinationScroller
                        label={"Went To"}
                        items={["Vancouver", "Tokyo", "Madrid", "Barcelona"]}
                      />
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <Interests
                        interests={item.interests}
                      />
                    </View>
                    <InstagramPhotos
                      images={instagramImages}
                      handle={instagramHandle}
                    />
                  </Animated.View>
                }
              </ScrollView>
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
  optionalInfoContainer: {
    position: 'relative',
    // bottom: 20,
    // backgroundColor: 'red',
    // alignItems: 'flex-start',

  },
  professionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,

  },
  professionText: {
    color: "white",
    fontSize: 18,
    fontWeight: '600',
    shadowOffset: {
      // width: 10,
      height: 4,
    },
    shadowOpacity: 0.8,
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
    paddingBottom: 175,
  },
  itemOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  image: {
    width: width - 15,
    height: 400,
    resizeMode: 'cover',
    borderRadius: 20,
    // borderTopLeftRadius: 50
  },
  secondImage: {
    marginLeft: 7,
    width: width - 15,
    height: 400,
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: "black",
  },
  connectButtonContainer: {
    position: 'absolute',
    bottom: SIZES.footerHeight,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "orange",
    width: "100%",
    height: 55,
  }
});

export default ParallaxCarousel;
