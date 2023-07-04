const COLORS = {
    chatBackground: {
        backgroundColor: 'white',
        text: 'black',
        background: 'white',
        primary: 'rebeccapurple'
    },
    mainTheme: "#5CC981",
    darkContrast: "#1A5465",
    brightContrast: "#B8EDC2"
};

const THEMES = {
    disabled: {
        color: COLORS.brightContrast
    }
}
const TEXT_STYLES = {
    standard: {
        // fontFamily: "montserrat",
        // color: "red"
    },
    header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 20,
    },
    radioLabel: {
        fontWeight: 'bold',
        margin: 10,
        fontSize: 20,
    },
    displayName: {
        fontWeight: "bold",
        fontSize: 17
    },
}
const SIZES = {
    profilePicture: 50,
    iconButton: 35
}


export { COLORS, SIZES, TEXT_STYLES }