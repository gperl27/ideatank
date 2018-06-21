const User = require('../models/user');
const Idea = require('../models/idea');
const Thought = require('../models/thought');

const oneSecond = 1000;
const intermissionSeconds = oneSecond * 5; // arbitrary 5 seconds

module.exports = io => {
    io.on('connection', function (socket) {

        socket.on('join room', data => {
            const { idea, participant } = data;

            socket.join(idea._id, async () => {
                await Idea.findById(idea._id)
                    .then(idea => {
                        idea.participants.push(participant)
                        return idea.save()
                    })


                const ideas = await Idea
                    .find({ isCompleted: false, 'phase.key': 'groupFinding' })
                    .populate('creator')
                    .populate('participants')


                // use 'of' to broadcast to everyone
                io.of('/').emit('joined room', ideas);
            });
        })

        socket.on('leave room', data => {
            const { idea, participant } = data;

            socket.join(idea, async () => {

                await Idea.findByIdAndUpdate(idea, {
                    $pull: { participants: participant }
                })

                const ideas = await Idea
                    .find({ isCompleted: false, phase: 'groupFinding' })
                    .populate('creator')
                    .populate('participants')


                socket.emit('left room', ideas);
            });

        })


        socket.on('new idea', async function (data) {
            const { description, creator } = data;

            await Idea.create({
                description,
                creator,
            })

            const ideas = await Idea
                .find({ isCompleted: false, phase: 'groupFinding' })
                .populate('creator')
                .populate('participants')

            // socket.join('room237', () => {
            //     let rooms = Object.keys(socket.rooms);
            //     console.log(rooms); // [ <socket.id>, 'room 237' ]
            // });

            socket.emit('new idea was made', ideas);
        });


        // we can have our client send us the appropriate countdown
        // since it contains our idea object
        socket.on('phase start', ({ ideaId, countdown }) => {
            const timer = setInterval(async function () {
                socket.emit('phase timer', countdown);
                countdown -= oneSecond;

                if (countdown <= 0) {
                    // clear countodwn immediately
                    clearInterval(timer);

                    // go to next phase
                    const ideaPhaseSchema = Idea.schema.paths.phase.options.enum;
                    const phase = ideaPhaseSchema.filter(phase => phase.order === 3) // CHANGE THIS TO IDEA OBJ

                    if (phase.length > 0) {
                        const idea = await Idea.findByIdAndUpdate(ideaId, { phase: phase[0] }, { new: true })
                        socket.emit('end phase', idea); // dont forget to send this to the room only
                    } else {
                        socket.emit('end game', 'end game'); // probably still want to return idea here
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

        socket.on('add thought', async ({ idea, uid, newThought }) => {
            // broadcast thought to group
            socket.emit('added thought', thought); // send to group only

            // save to db
            thought = new Thought({ text: newThought, type: idea.phase.thoughtType, user: uid })
            await thought.save()
            Idea.findByIdAndUpdate(idea._id, { $push: { $thoughts: $thought } })
        })

        // todo: is typing

        console.log('connected');
    });
}