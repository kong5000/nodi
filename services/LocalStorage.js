import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeInput = async (input) => {
    try {
        // Get the existing inputs from AsyncStorage
        const existingInputs = await AsyncStorage.getItem('inputs');
        let inputs = existingInputs ? JSON.parse(existingInputs) : [];
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

export const storeTrip = async (trip) => {
    try {
        // Get the existing inputs from AsyncStorage
        const existingTrips = await AsyncStorage.getItem('trips');
        let trips = existingTrips ? JSON.parse(existingTrips) : [];

        // Add the new input to the beginning of the array
        trips.unshift(trip);

        // Store the updated trips array in AsyncStorage
        await AsyncStorage.setItem('trips', JSON.stringify(trips));
    } catch (error) {
        console.log(error);
    }
};
