import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeInput = async (input) => {
    try {
        // Get the existing inputs from AsyncStorage
        const existingInputs = await AsyncStorage.getItem('inputs');
        let inputs = existingInputs ? JSON.parse(existingInputs) : [];
        console.log("existing inputs", inputs)
        // Add the new input to the beginning of the array
        inputs.unshift(input);

        // Keep only the last 50 inputs
        if (inputs.length > 50) {
            inputs = inputs.slice(0, 50);
        }
        // Store the updated inputs array in AsyncStorage
        await AsyncStorage.setItem('inputs', JSON.stringify(inputs));
    } catch (error) {
        console.log(error);
    }
};