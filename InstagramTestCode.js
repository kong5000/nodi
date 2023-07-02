import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { WebView } from 'react-native-webview';
import queryString from 'query-string';
const App = () => {
    const [enabled, setEnabled] = useState(false)
    const [comments, setComments] = useState([])
    const [data, setData] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const access_token = "IGQVJXMUtFbVNBZAF9ZAZA3RGUDFlSVNEcUpxUXBFdFF3OFl0MkZA4bWdPMGRrSXpKNDlrNWFyRDFpdEJWOGp4anFuU3Q2RGpkY2d2WkNfS01rMDZAqYmFvUURMdmhZALTZA6cEUxTWs3ZAnVZAV2o5SC1mbXFEcgZDZD"
                          
    const fetchFeed = async () => {
        try {
            console.log("FEED")
            const user_id = "keef5000"
            const response = await axios.get(
                `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`
                // `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
            );

            console.log("AAAA")
            console.log(response.data);
        } catch (err) {
            console.log(err)
        }

    }
    const handleWebViewNavigation = async (event) => {
        const { url } = event;
        if (url.includes('code=')) {
            const parsed = queryString.parseUrl(url);
            console.log(parsed.query.code)
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
                console.log(response.data);
                let accessToken = response.data.access_token
                let userId = response.data.user_id
                console.log("await permanent access")
                
                // const graphResponse = await axios.get(`https://graph.instagram.com/${userId}?fields=id,username&access_token=${accessToken}`)
                const graphResponse = await axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${accessToken}`)
                // const graphResponse = await axios.get(`https://graph.instagram.com/${userId}`, {
                //     params: {
                //       fields: 'id,username',
                //       access_token: accessToken,
                //     },
                //   });
                  console.log(graphResponse.data)
                // Handle the response data here
            } catch (error) {
                console.log(error);
                // Handle any errors that occurred during the request
            }
            // maybe close this view?
            setEnabled(true)
        }
    };
    return (
        <>
            {!enabled && <WebView
                source={{
                    uri: `https://api.instagram.com/oauth/authorize?client_id=2254471901397577&redirect_uri=https://github.com/kong5000&scope=user_profile,user_media,instagram_graph_user_profile&response_type=code`,
                }}
                onNavigationStateChange={handleWebViewNavigation}
                style={{ marginTop: 20 }}
            />}
            {enabled && <View><Text>HELLO WORLD</Text></View>}
        </>

    )
}

export default App

const styles = StyleSheet.create({})