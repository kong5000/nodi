import { getTripMatches, getUserTrips } from './TripCollectionQueries'
import { getPasses, getLikedBy, getUserLikes } from './UserQueries'
import { getConversations } from './ConversationQueries'

const getPassedUsers = async (uid) => {
    const passedUsers = await getPasses(uid)
    const getPassedUserIds = (passedUsers) => {
        return passedUsers.map(x => x.id)
    }
    return (getPassedUserIds(passedUsers))
}

const filterDocuments = (potentialCards, passes, uid) => {
    // todo filter based on user prefrences
    // Filter out the users own card if it shows up
    // Filter out users passed on
    let userRemoved = potentialCards.filter(potentialCard => potentialCard.userInfo.id != uid)
    userRemoved = userRemoved.filter(potentialCard => !passes.includes(potentialCard.userInfo.id))
    return userRemoved
}

const addUserDetails = async (potentialCards, userTrips) => {
    let detailedCards = []
    await Promise.all(potentialCards.map(async (potentialCard) => {
        console.log(`Getting details for ${potentialCard.userInfo.name}`)
        let missedYouIn = []
        let seeYouIn = []
        let headedTo = []
        userTrips.forEach((doc) => {
            console.log(doc.city)
            userTrips.forEach(trip => {
                if (trip.city == doc.city) {
                    if (trip.dayFrom <= doc.dayTo && trip.dayTo >= doc.dayFrom) {
                        seeYouIn.push(doc.city)
                    } else {
                        missedYouIn.push(doc.city)
                    }
                } else {
                    if (!headedTo.includes(doc.city)) {
                        headedTo.push(doc.city)
                    }
                }
            })
        })
        headedTo = headedTo.filter(city =>
            !missedYouIn.includes(city) && !seeYouIn.includes(city)
        )
        detailedCards.push({ ...potentialCard, seeYouIn, missedYouIn, headedTo })
    }));
    return detailedCards
}
export const getCards = async (uid) => {
    let userTrips = await getUserTrips(uid)
    if (userTrips.length == 0) return
    let passes = await getPassedUsers(uid)
    let likes = await getUserLikes(uid)
    let likedUserIds = likes.map((likeObject) => likeObject.id)
    let skippedUsers = [...likedUserIds, ...passes]
    let tempMatches = []
    for (trip of userTrips) {
        let documents = await getTripMatches(trip)
        documents = filterDocuments(documents, skippedUsers, uid)
        potentialCards = await addUserDetails(documents, userTrips)
        tempMatches.push(potentialCards)
    }
    let potentialMatches = []
    for (let temp of tempMatches) {
        potentialMatches = [...potentialMatches, ...temp]
    }

    return potentialMatches
}