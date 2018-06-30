const User = require('../models/user');
const Idea = require('../models/idea');
const Thought = require('../models/thought');

const oneSecond = 1000;
const intermissionSeconds = oneSecond * 5; // arbitrary 5 seconds

module.exports = io => {
    io.on('connection', function (socket) {

        socket.on('join room', data => {
            const { idea, participant, shouldUpdate } = data;

            socket.join(idea._id, async () => {
                // we use shouldUpdate to persist connections if users
                // reload the page or simliar reconnection actions
                if (shouldUpdate) {
                    await Idea.findById(idea._id)
                        .then(idea => {
                            idea.participants.push(participant)
                            return idea.save()
                        })


                    const ideas = await Idea.findIdeasInLobby();


                    // use 'of' to broadcast to everyone
                    io.of('/').emit('lobby refresh', ideas);
                }
            });
        })

        socket.on('leave room', data => {
            const { idea, participant } = data;

            socket.leave(idea._id, async () => {

                await Idea.findByIdAndUpdate(idea._id, {
                    $pull: { participants: participant }
                })

                const ideas = await Idea.findIdeasInLobby();

                io.of('/').emit('lobby refresh', ideas);
            });

        })


        socket.on('new idea', async ({ description, creator }) => {
            const idea = await Idea.create({
                description,
                creator,
            })

            socket.join(idea._id, async () => {
                const ideas = await Idea.findIdeasInLobby();

                io.of('/').emit('lobby refresh', ideas);
            })
        });

        socket.on('cancel game', async data => {
            // validate here that issuer is the creator

            const { idea, creator } = data;

            // close out socket channel
            // socket channels apparently get garbage collected when they are emptied out []
            // remove Idea from collection
            // remove idea from User that created it
            io.in(idea._id).clients((error, clients) => {
                if (error) throw error;
                clients.forEach(client => io.sockets.connected[client].leave(idea._id))

                const removeIdeaFromUser = User.findByIdAndUpdate(creator, {
                    $pull: { ideas: idea._id }
                })

                const removeIdea = Idea.findByIdAndRemove(idea._id);

                Promise.all([removeIdeaFromUser, removeIdea])
                    .then(async _ => {
                        const ideas = await Idea.findIdeasInLobby();
                        io.of('/').emit('lobby refresh', ideas);
                    })
            });
        });

        socket.on('start game', async data => {
            const firstPhase = Idea.schema.paths.phase.options.enum[1];
            const idea = await Idea.findByIdAndUpdate(data.idea._id, {
                phase: firstPhase
            }, { new: true })
                .populate('creator')
                .populate('participants')
                .populate('thoughts')

            io.in(idea._id).emit('game start', idea);

            const ideas = await Idea.findIdeasInLobby();

            io.of('/').emit('lobby refresh', ideas);
        });


        // we can have our client send us the appropriate countdown
        // since it contains our idea object
        socket.on('phase start', ({ idea }) => {
            let countdown = idea.phase.length
            const timer = setInterval(async function () {
                // think about which one should go first
                io.in(idea._id).emit('phase timer', { countdown });
                countdown -= oneSecond;

                if (countdown <= 0) {
                    // clear countodwn immediately
                    clearInterval(timer);

                    // go to next phase
                    const ideaPhaseSchema = Idea.schema.paths.phase.options.enum;
                    const phase = ideaPhaseSchema.filter(phase => phase.order === idea.phase.order + 1)

                    let updatedIdea;
                    if (phase.length > 0) {
                        updatedIdea = await Idea.updateIdeaAndReturnRelations(idea, { phase: phase[0] }, { new: true })

                        io.in(idea._id).emit('end phase');
                        io.in(idea._id).emit('update game', updatedIdea);
                    } else {
                        // game over
                        // send players to results page and close out channel
                        updatedIdea = await Idea.updateIdeaAndReturnRelations(idea, { isCompleted: true }, { new: true })

                        io.in(idea._id).emit('end game', updatedIdea);
                        
                        io.in(idea._id).clients((error, clients) => {
                            if (error) throw error;
                            clients.forEach(client => io.sockets.connected[client].leave(idea._id))
                        })
                    }
                }
            }, oneSecond);

        })

        socket.on('intermission', () => {
            let countdown = intermissionSeconds

            const timer = setInterval(function () {
                socket.emit('intermission timer', countdown);
                countdown -= oneSecond;

                console.log(countdown)

                if (countdown <= 0) {
                    clearInterval(timer);
                    socket.emit('end intermission');
                }
            }, oneSecond)
        })

        socket.on('add thought', async ({ idea, uid, text }) => {
            const newThought = await Thought.create({ text, type: idea.phase.thoughtType, user: uid })
            const updatedIdea = await Idea.updateIdeaAndReturnRelations(idea, { $push: { thoughts: newThought } }, { new: true })

            io.in(idea._id).emit('update game', updatedIdea);
        })

        socket.on('is typing', ({ ideaId, uid }) => {
            socket.to(ideaId).emit('is typing', { uid });
        })

        socket.on('done typing', ({ ideaId, uid }) => {
            socket.to(ideaId).emit('done typing', { uid });
        })

        console.log('connected');
    });
}