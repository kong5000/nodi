import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomToggleButton from './ListCustomToggleButton';

const SettingsButtonsGroup = ({ activeButtons, setActiveButtons, list }) => {
    const toggleInterest = (activity) => {
        if (activeButtons.includes(activity)) {
            const updatedArray = activeButtons.filter((item) => item !== activity);
            setActiveButtons(updatedArray)
        } else {
            setActiveButtons([...activeButtons, activity])
        }
    }
    return (
        <View style={styles.container}>
            {list && list.map((item) =>
                <CustomToggleButton
                    key={item.text}
                    text={item.text}
                    onToggle={() => toggleInterest(item.text)}
                    list={activeButtons}
                    icon={item.icon}
                />
            )}
        </View>
    )
}

export default SettingsButtonsGroup


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    }
});