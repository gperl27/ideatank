import { createSelector } from 'reselect'

const authUser = state => state.auth.authUser
const ideas = state => state.lobby.ideas

// auth user can only have one idea at a time
// cannot join/leave other ideas if one is present
export const authUserIdea = createSelector(
    authUser,
    ideas,
    (authUser, ideas) => (authUser && ideas) && ideas.find(idea => idea.creator._id === authUser._id)
)

export const authUserParticipantIdea = createSelector(
    authUser,
    ideas,
    (authUser, ideas) => (authUser && ideas) &&
        ideas.find(idea => idea.participants.find(user => user._id === authUser._id))
)