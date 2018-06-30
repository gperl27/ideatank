import { createSelector } from 'reselect'

const idea = state => state.game.activeGame

export const totalThoughts = createSelector(
    idea,
    idea => idea && idea.phases.reduce((acc, phase) => {
        return acc + phase.thoughts.length;
    }, 0)
)

const gameThoughts = createSelector(
    idea,
    idea => idea && idea.phases.filter(phase => phase.length > 0 && phase.instructions)
)

export const participantsWithThoughtCounts = createSelector(
    idea,
    gameThoughts,
    (idea, gameThoughts) => idea && idea.roomUsers.map(user => {
        const userPhaseData = gameThoughts.map(phase => {
            const userThoughts = phase.thoughts.filter(thought => thought.user._id === user._id)

            return { phase, userThoughts: userThoughts.length > 0 ? userThoughts.length : 0 }
        })

        return { user, userPhaseData }
    })
)

