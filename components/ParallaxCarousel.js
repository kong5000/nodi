import React, { useState, useRef, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import queryString from 'query-string';
import axios from 'axios';
import InstagramPhotos from './InstagramPhotos';
import {
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

const ParallaxCarousel = ({ items }) => {

  const [paginationOpacity, setPaginationOpacity] = useState()
  const [instagramImages, setInstagramImages] = useState([])
  const [showWebView, setShowWebView] = useState(true)
  const [instagramHandle, setInstagramHandle] = useState('')
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

  const handleWebViewNavigation = async (event) => {
    const { url } = event;
    if (url.includes('code=')) {
      const parsed = queryString.parseUrl(url);
      try {
        let formData = new FormData()
        const cliendId = "2254471901397577"
        const client_secret = "7751441530536c99bc699c666c2666ee"
        const grant_type = 'authorization_code'
        const redirect_uri = "https://github.com/kong5000"
        const code = parsed.query.code

        formData.append('client_id', cliendId);
        formData.append('client_secret', client_secret);
        formData.append('grant_type', grant_type);
        formData.append('redirect_uri', redirect_uri);
        formData.append('code', code);

        const response = await axios.post('https://api.instagram.com/oauth/access_token', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // const graphResponse = await axios.get(`https://graph.instagram.com/${userId}?fields=id,username&access_token=${accessToken}`)
        const graphResponse = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`)
        // const graphResponse = await axios.get(`https://graph.instagram.com/${userId}`, {
        //     params: {
        //       fields: 'id,username',
        //       access_token: accessToken,
        //     },
        //   });
        // Handle the response data here
        setShowWebView(false)
        let tempPictures = []
        graphResponse.data.data.forEach(mediaObject => {
          if (mediaObject.media_type != "VIDEO") {
            tempPictures.push(mediaObject)
          }
        })
        setInstagramImages(tempPictures.slice(0, 6))
      } catch (error) {
        console.log(error);
        // Handle any errors that occurred during the request
      }
      // maybe close this view?
      // setEnabled(true)
    }
  };

  useEffect(() => {
    const getInstagramMedia = async () => {
      const graphResponse = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`)
      // const graphResponse = await axios.get(`https://graph.instagram.com/${userId}`, {
      //     params: {
      //       fields: 'id,username',
      //       access_token: accessToken,
      //     },
      //   });
      // Handle the response data here
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
      {!items.length &&
        <View style={{
          height: "90%",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ fontSize: 20 }}>
            No matches for this trip yet.
          </Text>
        </View>}
      {items.length > 0 && <Connect />}

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
              <ScrollView
                ref={(element) => refsArray.current.push(element)}

                onScroll={handleScroll}
                scrollEventThrottle={15}
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.scroll}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Animated.Image
                  source={{ uri: item.image }}
                  style={[
                    styles.image,
                    // {
                    //   transform: [
                    //     {
                    //       translateX: scrollAnimation.interpolate({
                    //         inputRange: [
                    //           width * (index - 1),
                    //           width * index,
                    //           width * (index + 1),
                    //         ],
                    //         outputRange: [-width * 0.5, 0, width * 0.5],
                    //       }),
                    //     },
                    //   ],
                    // },
                  ]}
                />
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
                  <UserInfoScroller interests={["🎂 30", "🏠 Brasilia", "💼 Illustrator"]} />
                  <Interests interests={item.interests} />

                  <Profile />

                  {item.goingTo && <DestinationScroller label={"Going To"} items={item.goingTo.map(location => {
                    return location.split(',')[0]
                  })} />}
                  <DestinationScroller label={"Went To"} items={["Vancouver", "Tokyo", "Madrid", "Barcelona"]} />

                  <InstagramPhotos images={instagramImages} handle={instagramHandle} />


                </Animated.View>
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
