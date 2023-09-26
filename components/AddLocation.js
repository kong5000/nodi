import React, { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, Text, FlatList, TouchableOpacity } from 'react-native'
import CustomButton from './CustomButton'
import { TextInput } from 'react-native-paper'
import { COLORS, FLEX_CENTERED, TEXT_STYLES } from '../style'
import StyleText from './StyleText'
import CountryFlag from "react-native-country-flag";
import { COUNTRIES, COUNTRY_NAMES, COUNTRY_ISO_MAP } from '../data'

const AddLocation = ({ onAdd }) => {
    const [input, setInput] = useState(null);
    const [isoCode, setIsoCode] = useState('')
    const [data, setData] = useState(null);
    const [valid, setValid] = useState(false)
    const filterData = () => {
        if (input && input != " ") {
            return COUNTRIES.filter(country => country.name.includes(input)).slice(0, 5)
        }
        return null
    }

    const checkCountryInputValid = () => {
        if (COUNTRY_NAMES.includes(input)) {
            setValid(true)
        } else {
            setValid(false)
        }
    }

    useEffect(() => {
        setData(filterData())
        checkCountryInputValid()
    }, [input])

    useEffect(() => {
        setData(null)
    }, [valid])


    return (
        <View>
            <View style={{
                display: "flex",
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TextInput
                    theme={{
                        colors: {
                            onSurfaceVariant: COLORS.halfGrey,
                        }
                    }}
                    label='Country'
                    activeOutlineColor='black'
                    mode='outlined'
                    style={{
                        ...TEXT_STYLES.textInput,
                        flex: 1,
                    }}
                    outlineStyle={TEXT_STYLES.textInputOutline}
                    value={input}
                    onChangeText={text => {
                        setInput(text)
                        setData(filterData())
                    }}
                />
                {valid && <TouchableOpacity style={{
                    height: 50,
                    width: 50,
                    backgroundColor: valid ? COLORS.mainTheme : COLORS.neutralGrey,
                    borderRadius: 15,
                    marginHorizontal: 15,
                    ...FLEX_CENTERED,
                    marginBottom: 7
                }}
                    disabled={!valid}

                    onPress={() => {
                        onAdd({ name: input, iso: COUNTRY_ISO_MAP[input] })
                        setData(null)
                        setInput('')
                        setIsoCode('')
                    }}
                >
                    <StyleText
                        style={{ color: 'white' }}
                        fontSize={27}
                        text="+"
                    />
                </TouchableOpacity>}

            </View>
            <FlatList
                style={{ position: 'absolute', top: 70, backgroundColor: 'white' }}
                data={data}
                renderItem={(item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            minWidth: "100%",
                            display: 'flex',
                            flexDirection: 'row',
                            padding: 20,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: COLORS.neutralGrey,
                        }}
                        onPress={() => {
                            setInput('')
                            setIsoCode('')
                            onAdd({ name: item.item.name, iso: item.item.iso })
                            setData(null)

                        }}>
                        <CountryFlag isoCode={item.item.iso} size={30}
                            style={{ borderRadius: 2, marginRight: 10 }} />
                        <StyleText
                            fontSize={20}
                            text={item.item.name} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default AddLocation

const styles = StyleSheet.create({})