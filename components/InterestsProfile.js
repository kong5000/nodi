import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../style'
import StyleText from './StyleText'

const InterestsProfile = ({ interests }) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
        }}>
            {interests && interests.map(interest =>
                <View
                    key={interest}
                    style={{
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