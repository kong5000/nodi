import { radiusQuery } from './GeoQueries'

// @Todo 
const filterRequested = (requested) => {
// Filter by already requested?
// Filter by blocked (and blocked by?)
// Filter the current users id
}

export const getCards = async (userData) => {
    const { lastLocation } = userData
    const distanceMatches = await radiusQuery(lastLocation)
    // @todo also filter out blocked users
    const filteredMatches = distanceMatches.filter(match => match.id != userData.id)
    return filteredMatches
}
export const calculateAge = (dateOfBirth) => {
    var today = new Date();
    var birthDate = new Date(dateOfBirth);

    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}