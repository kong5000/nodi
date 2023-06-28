import { collection, query, where, limit, getDocs, addDoc } from 'firebase/firestore'
import { database } from '../firebase'

export const getTripMatches = async (trip) => {
    const tripsRef = collection(database, 'trips')
    console.log(`Querying for your trip in ${trip.city}`)
    const q = query(tripsRef,
        where('city', '==', trip.city),
        where('dates', 'array-contains-any', trip.dates),
        where('userInfo.gender', 'in', trip.userInfo.travelsWith),
        limit(15)
    );
    const querySnapshot = await getDocs(q)
    let documents = querySnapshot.docs.map((doc) => doc.data());
    return documents
}

export const getUserTrips = async (uid) => {
    const tripsRef = collection(database, 'trips')
    const q = query(tripsRef,
        where('userInfo.id', '==', uid),
        limit(15)
    );
    const querySnapshot = await getDocs(q)
    let documents = querySnapshot.docs.map((doc) => doc.data());
    return documents
}

export const addTripDoc = async (tripData) => {
    const tripsCollectionRef = collection(database, "trips");
    await addDoc(tripsCollectionRef, tripData);
}
