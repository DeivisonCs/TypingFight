
const door = 8080;
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {origin: '*'}
});

let matches = [];

io.on('connection', (socket) => {
    console.log("user " +socket.id.substr(0, 2)+ " connected");

    socket.on('createMatch', (match) => {
        const roomId = `match_${Date.now()}_${socket.id.substr(0, 2)}`; // ID único para a partida
        matches[roomId] = { id: roomId, name: match.name, password: match.password, players: [socket.id.substr(0, 2)], status: 'open' };
    
        socket.join(roomId); // Entra na sala
        io.emit('matchCreated', roomId);
        io.emit('matchesUpdate', filterOpenMatches());

        console.log(`Match Created: ${roomId} by user ${socket.id.substr(0, 2)}`);
    });
    
    socket.on('getMatches', () => {
        const openMatches = filterOpenMatches();

        socket.emit('allMatches', Object.values(openMatches));
        console.log(openMatches);
    });

    socket.on('closeMatch', (matchId) => {
        delete matches[matchId];
        console.log(matches);

        io.emit('matchesUpdate', filterOpenMatches());

        socket.leave(matchId);
    })

    socket.on('enterMatch', (matchInfo) => {
        matches[matchInfo.id].players.push(socket.id.substr(0, 2));
        matches[matchInfo.id].status = 'on-match';
        console.log(matches[matchInfo.id]);
        
        socket.join(matches[matchInfo.id].id);
        io.to(matchInfo.id).emit('matchAccepted', matches[matchInfo.id]);

        io.emit('matchesUpdate', filterOpenMatches());

        console.log('Second Player found: ' + socket.id.substr(0, 2));
    })

    socket.on('registerPoints', (matchId, points) => {
        console.log("Match: " + matchId + " player: " + socket.id.substr(0, 2) + " Points: " + points);

        io.to(matchId).emit('pointsUpdate', {points: points, player: socket.id.substr(0, 2)});
    })

    socket.on('disconnect', () => {
        console.log('User Desconnected: ', socket.id.substr(0, 2));

        for (const roomId in matches) {
            matches[roomId].players = matches[roomId].players.filter(player => player !== socket.id);
            
            if (matches[roomId].players.length === 0) {
                delete matches[roomId];
                console.log(`Match ${roomId} deleted because all players left.`);
            }
        }
    });

    socket.on('endGame', (matchId) => {
        socket.leave(matchId);
        console.log(`User ${socket.id.substr(0, 2)} left match ${matchId}`);

        const room = io.of('/').adapter.rooms.get(matchId);

        if(!room){
            delete matches[matchId];
        }
    });
});

function filterOpenMatches(){
    return Object.values(matches).filter(match => match.status == 'open');
}


http.listen(door, () => console.log('listening on door ' + door));