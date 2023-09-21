import React, { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, Text, FlatList, TouchableOpacity } from 'react-native'
import CustomButton from './CustomButton'
import { TextInput } from 'react-native-paper'
import { COLORS, FLEX_CENTERED, TEXT_STYLES } from '../style'
import StyleText from './StyleText'
const COUNTRIES = [
    { "id": "1", "title": "🇦🇫 Afghanistan" },
    { "id": "2", "title": "🇦🇱 Albania" },
    { "id": "3", "title": "🇩🇿 Algeria" },
    { "id": "4", "title": "🇦🇩 Andorra" },
    { "id": "5", "title": "🇦🇴 Angola" },
    { "id": "6", "title": "🇦🇬 Antigua and Barbuda" },
    { "id": "7", "title": "🇦🇷 Argentina" },
    { "id": "8", "title": "🇦🇲 Armenia" },
    { "id": "9", "title": "🇦🇺 Australia" },
    { "id": "10", "title": "🇦🇹 Austria" },
    { "id": "11", "title": "🇦🇿 Azerbaijan" },
    { "id": "12", "title": "🇧🇸 Bahamas" },
    { "id": "13", "title": "🇧🇭 Bahrain" },
    { "id": "14", "title": "🇧🇩 Bangladesh" },
    { "id": "15", "title": "🇧🇧 Barbados" },
    { "id": "16", "title": "🇧🇾 Belarus" },
    { "id": "17", "title": "🇧🇪 Belgium" },
    { "id": "18", "title": "🇧🇿 Belize" },
    { "id": "19", "title": "🇧🇯 Benin" },
    { "id": "20", "title": "🇧🇹 Bhutan" },
    { "id": "21", "title": "🇧🇴 Bolivia" },
    { "id": "22", "title": "🇧🇦 Bosnia and Herzegovina" },
    { "id": "23", "title": "🇧🇼 Botswana" },
    { "id": "24", "title": "🇧🇷 Brazil" },
    { "id": "25", "title": "🇧🇳 Brunei" },
    { "id": "26", "title": "🇧🇬 Bulgaria" },
    { "id": "27", "title": "🇧🇫 Burkina Faso" },
    { "id": "28", "title": "🇧🇮 Burundi" },
    { "id": "29", "title": "🇨🇻 Cape Verde" },
    { "id": "30", "title": "🇰🇭 Cambodia" },
    { "id": "31", "title": "🇨🇲 Cameroon" },
    { "id": "32", "title": "🇨🇦 Canada" },
    { "id": "33", "title": "🇨🇫 Central African Republic" },
    { "id": "34", "title": "🇹🇩 Chad" },
    { "id": "35", "title": "🇨🇱 Chile" },
    { "id": "36", "title": "🇨🇳 China" },
    { "id": "37", "title": "🇨🇴 Colombia" },
    { "id": "38", "title": "🇰🇲 Comoros" },
    { "id": "39", "title": "🇨🇬 Congo (Brazzaville)" },
    { "id": "40", "title": "🇨🇩 Congo (Kinshasa)" },
    { "id": "41", "title": "🇨🇷 Costa Rica" },
    { "id": "42", "title": "🇭🇷 Croatia" },
    { "id": "43", "title": "🇨🇺 Cuba" },
    { "id": "44", "title": "🇨🇾 Cyprus" },
    { "id": "45", "title": "🇨🇿 Czech Republic" },
    { "id": "46", "title": "🇩🇰 Denmark" },
    { "id": "47", "title": "🇩🇯 Djibouti" },
    { "id": "48", "title": "🇩🇲 Dominica" },
    { "id": "49", "title": "🇩🇴 Dominican Republic" },
    { "id": "50", "title": "🇪🇨 Ecuador" },
    { "id": "51", "title": "🇪🇬 Egypt" },
    { "id": "52", "title": "🇸🇻 El Salvador" },
    { "id": "53", "title": "🇬🇶 Equatorial Guinea" },
    { "id": "54", "title": "🇪🇷 Eritrea" },
    { "id": "55", "title": "🇪🇪 Estonia" },
    { "id": "56", "title": "🇪🇹 Ethiopia" },
    { "id": "57", "title": "🇫🇯 Fiji" },
    { "id": "58", "title": "🇫🇮 Finland" },
    { "id": "59", "title": "🇫🇷 France" },
    { "id": "60", "title": "🇬🇦 Gabon" },
    { "id": "61", "title": "🇬🇲 Gambia" },
    { "id": "62", "title": "🇬🇪 Georgia" },
    { "id": "63", "title": "🇩🇪 Germany" },
    { "id": "64", "title": "🇬🇭 Ghana" },
    { "id": "65", "title": "🇬🇷 Greece" },
    { "id": "66", "title": "🇬🇩 Grenada" },
    { "id": "67", "title": "🇬🇹 Guatemala" },
    { "id": "68", "title": "🇬🇳 Guinea" },
    { "id": "69", "title": "🇬🇼 Guinea-Bissau" },
    { "id": "70", "title": "🇬🇾 Guyana" },
    { "id": "71", "title": "🇭🇹 Haiti" },
    { "id": "72", "title": "🇭🇳 Honduras" },
    { "id": "73", "title": "🇭🇺 Hungary" },
    { "id": "74", "title": "🇮🇸 Iceland" },
    { "id": "75", "title": "🇮🇳 India" },
    { "id": "76", "title": "🇮🇩 Indonesia" },
    { "id": "77", "title": "🇮🇷 Iran" },
    { "id": "78", "title": "🇮🇶 Iraq" },
    { "id": "79", "title": "🇮🇪 Ireland" },
    { "id": "80", "title": "🇮🇱 Israel" },
    { "id": "81", "title": "🇮🇹 Italy" },
    { "id": "82", "title": "🇯🇲 Jamaica" },
    { "id": "83", "title": "🇯🇵 Japan" },
    { "id": "84", "title": "🇯🇴 Jordan" },
    { "id": "85", "title": "🇰🇿 Kazakhstan" },
    { "id": "86", "title": "🇰🇪 Kenya" },
    { "id": "87", "title": "🇰🇮 Kiribati" },
    { "id": "88", "title": "🇰🇵 North Korea" },
    { "id": "89", "title": "🇰🇷 South Korea" },
    { "id": "90", "title": "🇽🇰 Kosovo" },
    { "id": "91", "title": "🇰🇼 Kuwait" },
    { "id": "92", "title": "🇰🇬 Kyrgyzstan" },
    { "id": "93", "title": "🇱🇦 Laos" },
    { "id": "94", "title": "🇱🇻 Latvia" },
    { "id": "95", "title": "🇱🇧 Lebanon" },
    { "id": "96", "title": "🇱🇸 Lesotho" },
    { "id": "97", "title": "🇱🇷 Liberia" },
    { "id": "98", "title": "🇱🇾 Libya" },
    { "id": "99", "title": "🇱🇮 Liechtenstein" },
    { "id": "100", "title": "🇱🇹 Lithuania" },
    { "id": "101", "title": "🇱🇺 Luxembourg" },
    { "id": "102", "title": "🇲🇰 North Macedonia" },
    { "id": "103", "title": "🇲🇬 Madagascar" },
    { "id": "104", "title": "🇲🇼 Malawi" },
    { "id": "105", "title": "🇲🇾 Malaysia" },
    { "id": "106", "title": "🇲🇻 Maldives" },
    { "id": "107", "title": "🇲🇱 Mali" },
    { "id": "108", "title": "🇲🇹 Malta" },
    { "id": "109", "title": "🇲🇭 Marshall Islands" },
    { "id": "110", "title": "🇲🇷 Mauritania" },
    { "id": "111", "title": "🇲🇺 Mauritius" },
    { "id": "112", "title": "🇲🇽 Mexico" },
    { "id": "113", "title": "🇫🇲 Micronesia" },
    { "id": "114", "title": "🇲🇩 Moldova" },
    { "id": "115", "title": "🇲🇨 Monaco" },
    { "id": "116", "title": "🇲🇳 Mongolia" },
    { "id": "117", "title": "🇲🇪 Montenegro" },
    { "id": "118", "title": "🇲🇦 Morocco" },
    { "id": "119", "title": "🇲🇿 Mozambique" },
    { "id": "120", "title": "🇲🇲 Myanmar" },
    { "id": "121", "title": "🇳🇦 Namibia" },
    { "id": "122", "title": "🇳🇷 Nauru" },
    { "id": "123", "title": "🇳🇵 Nepal" },
    { "id": "124", "title": "🇳🇱 Netherlands" },
    { "id": "125", "title": "🇳🇿 New Zealand" },
    { "id": "126", "title": "🇳🇮 Nicaragua" },
    { "id": "127", "title": "🇳🇪 Niger" },
    { "id": "128", "title": "🇳🇬 Nigeria" },
    { "id": "129", "title": "🇳🇴 Norway" },
    { "id": "130", "title": "🇴🇲 Oman" },
    { "id": "131", "title": "🇵🇰 Pakistan" },
    { "id": "132", "title": "🇵🇼 Palau" },
    { "id": "133", "title": "🇵🇸 Palestine" },
    { "id": "134", "title": "🇵🇦 Panama" },
    { "id": "135", "title": "🇵🇬 Papua New Guinea" },
    { "id": "136", "title": "🇵🇾 Paraguay" },
    { "id": "137", "title": "🇵🇪 Peru" },
    { "id": "138", "title": "🇵🇭 Philippines" },
    { "id": "139", "title": "🇵🇱 Poland" },
    { "id": "140", "title": "🇵🇹 Portugal" },
    { "id": "141", "title": "🇶🇦 Qatar" },
    { "id": "142", "title": "🇷🇴 Romania" },
    { "id": "143", "title": "🇷🇺 Russia" },
    { "id": "144", "title": "🇷🇼 Rwanda" },
    { "id": "145", "title": "🇰🇳 Saint Kitts and Nevis" },
    { "id": "146", "title": "🇱🇨 Saint Lucia" },
    { "id": "147", "title": "🇻🇨 Saint Vincent and the Grenadines" },
    { "id": "148", "title": "🇼🇸 Samoa" },
    { "id": "149", "title": "🇸🇲 San Marino" },
    { "id": "150", "title": "🇸🇹 Sao Tome and Principe" },
    { "id": "151", "title": "🇸🇦 Saudi Arabia" },
    { "id": "152", "title": "🇸🇳 Senegal" },
    { "id": "153", "title": "🇷🇸 Serbia" },
    { "id": "154", "title": "🇸🇨 Seychelles" },
    { "id": "155", "title": "🇸🇱 Sierra Leone" },
    { "id": "156", "title": "🇸🇬 Singapore" },
    { "id": "157", "title": "🇸🇰 Slovakia" },
    { "id": "158", "title": "🇸🇮 Slovenia" },
    { "id": "159", "title": "🇸🇧 Solomon Islands" },
    { "id": "160", "title": "🇸🇴 Somalia" },
    { "id": "161", "title": "🇿🇦 South Africa" },
    { "id": "162", "title": "🇸🇸 South Sudan" },
    { "id": "163", "title": "🇪🇸 Spain" },
    { "id": "164", "title": "🇱🇰 Sri Lanka" },
    { "id": "165", "title": "🇸🇩 Sudan" },
    { "id": "166", "title": "🇸🇷 Suriname" },
    { "id": "167", "title": "🇸🇿 Eswatini" },
    { "id": "168", "title": "🇸🇪 Sweden" },
    { "id": "169", "title": "🇨🇭 Switzerland" },
    { "id": "170", "title": "🇸🇾 Syria" },
    { "id": "171", "title": "🇹🇼 Taiwan" },
    { "id": "172", "title": "🇹🇯 Tajikistan" },
    { "id": "173", "title": "🇹🇿 Tanzania" },
    { "id": "174", "title": "🇹🇭 Thailand" },
    { "id": "175", "title": "🇹🇱 Timor-Leste" },
    { "id": "176", "title": "🇹🇬 Togo" },
    { "id": "177", "title": "🇹🇴 Tonga" },
    { "id": "178", "title": "🇹🇹 Trinidad and Tobago" },
    { "id": "179", "title": "🇹🇳 Tunisia" },
    { "id": "180", "title": "🇹🇷 Turkey" },
    { "id": "181", "title": "🇹🇲 Turkmenistan" },
    { "id": "182", "title": "🇹🇻 Tuvalu" },
    { "id": "183", "title": "🇺🇬 Uganda" },
    { "id": "184", "title": "🇺🇦 Ukraine" },
    { "id": "185", "title": "🇦🇪 United Arab Emirates" },
    { "id": "186", "title": "🇬🇧 United Kingdom" },
    { "id": "187", "title": "🇺🇸 United States of America" },
    { "id": "188", "title": "🇺🇾 Uruguay" },
    { "id": "189", "title": "🇺🇿 Uzbekistan" },
    { "id": "190", "title": "🇻🇺 Vanuatu" },
    { "id": "191", "title": "🇻🇦 Vatican City" },
    { "id": "192", "title": "🇻🇪 Venezuela" },
    { "id": "193", "title": "🇻🇳 Vietnam" },
    { "id": "194", "title": "🇾🇪 Yemen" },
    { "id": "195", "title": "🇿🇲 Zambia" },
    { "id": "196", "title": "🇿🇼 Zimbabwe" }
]

const AddLocation = () => {
    const [input, setInput] = useState(null);
    const [data, setData] = useState(null);
    const [valid, setValid] = useState(false)
    const filterData = () => {
        
        if (input && input != " ") {
            return COUNTRIES.filter(country => country.title.includes(input)).slice(0, 7)
        }
        return null
    }

    useEffect(() => {
        setData(filterData())
    }, [input])

    const onChangeText = (text) => {
        setInput(text)
    }

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
                    style={TEXT_STYLES.textInput}
                    outlineStyle={TEXT_STYLES.textInputOutline}
                    value={input}
                    onChangeText={text => setInput(text)}
                />
                <TouchableOpacity style={{
                    height: 50,
                    width: 50,
                    backgroundColor: valid ? COLORS.mainTheme : COLORS.halfGrey,
                    borderRadius: 15,
                    marginHorizontal: 15,
                    ...FLEX_CENTERED
                }}>
                    <StyleText
                        style={{ color: 'white' }}
                        fontSize={27}
                        text="+"
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={(item, index) => (
                    <TouchableOpacity onPress={() => {
                        setInput(item.item.title)
                        setValid(true)
                        setData(null)
                    }}>
                        <Text>{item.item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default AddLocation

const styles = StyleSheet.create({})