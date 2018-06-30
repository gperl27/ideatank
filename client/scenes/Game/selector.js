import { createSelector } from 'reselect'

const authUser = state => state.auth.authUser
const idea = state => state.game.activeGame
const timer = state => state.game.timer

export const isCreator = createSelector(
    authUser,
    idea,
    (authUser, idea) => (authUser && idea) && authUser._id === idea.creator._id
)

export const isBrainstorming = createSelector(
    timer,
    timer => !isNaN(timer)
)

export const activePhase = createSelector(
    idea,
    idea => idea && idea.phases.find(phase => phase.active)
)
