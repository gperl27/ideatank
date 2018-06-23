import { createSelector } from 'reselect'

const authUser = state => state.auth.authUser
const idea = state => state.game.activeGame

export const isCreator = createSelector(
    authUser,
    idea,
    (authUser, idea) => (authUser && idea) && authUser._id === idea.creator._id
)
