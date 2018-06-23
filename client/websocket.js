// This file registers all websocket listeners to one instance of our socket
// bc we are only supporting one connection for now
import { wsListeners as lobbyWs } from './modules/lobby'
import { wsListeners as gameWs } from './modules/game'

export default socket => {
    lobbyWs(socket);
    gameWs(socket);
}