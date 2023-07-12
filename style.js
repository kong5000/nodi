const COLORS = {
    chatBackground: {
        backgroundColor: 'white',
        text: 'black',
        background: 'white',
        primary: 'rebeccapurple'
    },
    mainTheme: "#5CC981",
    darkContrast: "#1A5465",
    // brightContrast: "#B8EDC2"
    brightContrast: "#ccf5d4",
};

export const THEMES = {
    shadow: {
        shadowOffset: {
            // width: 10,
            // height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        // padding: 20
    },
    disabled: {
        color: COLORS.brightContrast
    },
    displayTheme: {
        borderColor: COLORS.brightContrast,
        borderWidth: 3,
        borderRadius: 30,
        padding: 8,
        margin: 8
    },
    radioRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 5,
        borderRadius: 30,
        borderColor: COLORS.brightContrast,
        borderWidth: 3,
    },
}

const TEXT_STYLES = {
    standard: {
        fontFamily: 'Montserrat_600SemiBold',
        color: COLORS.brightContrast,
        fontSize: 20,
    },
    header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 20,
        fontFamily: 'Montserrat_700Bold'
    },
    input: {
        ...THEMES.displayTheme,
        backgroundColor: COLORS.mainTheme,
        color: "white",
        padding: 12,
        paddingLeft: 25,
        fontSize: 23,
        fontFamily: 'Montserrat_400Regular',
        margin: 10,
    },
    searchBarInput:{
      ...THEMES.displayTheme,
        backgroundColor: COLORS.mainTheme,
        color: "white",
        padding: 12,
        paddingLeft: 25,
        fontSize: 19,
        fontFamily: 'Montserrat_400Regular',
        margin: 10,
    },
    searchBarText:{
        color: "white",
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'Montserrat_400Regular',
    },
    radioLabel: {
        fontWeight: 'bold',
        margin: 10,
        fontSize: 20,
        fontFamily: 'Montserrat_600SemiBold',
        color: COLORS.brightContrast,
        paddingRight: 50
    },
    displayName: {
        fontWeight: "bold",
        fontSize: 17
    },
}
const SIZES = {
    profilePicture: 50,
    iconButton: 35,
    footerHeight: 60,
    headerHeight: 105
}


export { COLORS, SIZES, TEXT_STYLES }