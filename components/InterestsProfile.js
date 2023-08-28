import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '@fortawesome/free-solid-svg-icons/faHouse'
import StyleText from './StyleText'
import { COLORS } from '../style'

const InterestsProfile = ({ interests }) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
        }}>
            {interests && interests.map(interest =>
                <View style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: COLORS.neutralGrey,
                    maxWidth: "50%",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginRight: '2.5%',
                    marginBottom: '2.5%'
                }}>
                    <StyleText
                        text={interest}
                        fontSize={19}
              
                    />
                </View>
            )}
        </View>
    )
}

export default InterestsProfile

const styles = StyleSheet.create({})