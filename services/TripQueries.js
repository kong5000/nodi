import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { database } from '../firebase'

export const getTripMatches = async (trip) => {
    console.log("HEELO")
    const tripsRef = collection(database, 'trips')
        console.log(`Querying for your trip in ${trip.city}`)
        const q = query(tripsRef,
            where('dates', 'array-contains-any', trip.dates),
            where('city', '==', trip.city),
            where('userInfo.gender', 'in', trip.userInfo.travelsWith),
            limit(15)
        );
        const querySnapshot = await getDocs(q)
        let documents = querySnapshot.docs.map((doc) => doc.data());
        return documents   
}

export const getUserTrips = async (uid) => {
    console.log("AA")

        const tripsRef = collection(database, 'trips')
        const q = query(tripsRef,
            where('userInfo.id', '==', uid),
            limit(15)
        );
        const querySnapshot = await getDocs(q)
        let documents = querySnapshot.docs.map((doc) => doc.data());
        return documents
}