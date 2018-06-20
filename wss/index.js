const User = require('../models/user');
const Idea = require('../models/idea');

const oneSecond = 1000;
const intermissionSeconds = oneSecond * 5; // arbitrary 5 seconds

module.exports = io => {
    io.on('connection', function (socket) {

        socket.on('join room', data => {
            const { idea, participant } = data;

            socket.join(idea, async () => {
                await Idea.findById(idea)
                    .then(idea => {
                        idea.participants.push(participant)
                        return idea.save()
                    })


                const ideas = await Idea
                    .find({ isCompleted: false, phase: 'groupFinding' })
                    .populate('creator')
                    .populate('participants')


                socket.emit('joined room', ideas);
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
                socket.emit('timer', countdown);
                countdown -= oneSecond;

                if (countdown <= 0) {
                    // clear countodwn immediately
                    clearInterval(timer);

                    // go to next phase
                    const ideaPhaseSchema = Idea.schema.paths.phase.options.enum;
                    const phase = ideaPhaseSchema.filter(phase => phase.order === 4)

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

        console.log('connected');
    });
}

// wss.getUniqueID = function () {
//     function s4() {
//         return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//     }
//     return s4() + s4() + '-' + s4();
// };

// const lobby = {};
// const rooms = {};

// wss.on('connection', async function (ws, req) {

//     // remove client from lobby
//     ws.on('close', function () {
//         console.log('close');

//         delete lobby[ws.uid];

//         wss.clients.forEach(function (client) {
//             client.send(JSON.stringify(lobby))
//         });
//     })

//     ws.on('message', function incoming(message) {
//         console.log('received: %s', message);
//     });

//     const parameters = url.parse(req.url, true);
//     const { uid } = parameters.query;
//     const user = await User.findById(uid);

//     // add uid to this specific socket
//     ws.uid = user._id;

//     // add user to the lobby
//     lobby[user._id] = {
//         _id: user.id,
//         name: user.name,
//         image: '',
//     };

//     // ws.uid = wss.getUniqueID();


//     wss.clients.forEach(function (client) {
//         client.send(JSON.stringify(lobby))
//     });

//     // ws.send(`new user connected: uid: ${ws.uid}`);
// });