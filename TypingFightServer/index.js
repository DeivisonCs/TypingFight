const door = 8080;
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {origin: '*'}
});

let matches = [];

io.on('connection', (socket) => {
    console.log("user " +socket.id.substr(0, 2)+ " connected");

    socket.on('message', (message) => {
        console.log(message);

        io.emit('message', `${socket.id.substr(0, 2)} said: ${message}`)
    })
    
    socket.on('createMatch', (match) => {
        const roomId = `match_${Date.now()}`; // ID único para a partida
        matches[roomId] = { id: roomId, name: match.name, password: match.password, players: [socket.id.substr(0, 2)] }; // Armazena a partida
    
        socket.join(roomId); // Entra na sala
        socket.emit('matchCreated', "match created by: " + roomId); // Informa o criador da partida
        console.log(`Match Created: ${roomId} by user ${socket.id.substr(0, 2)}`);
        
        console.log(matches)
    });
    
    socket.on('getMatches', () => {

        socket.emit('allMatches', Object.values(matches));
        console.log(matches);
    });

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
});


http.listen(door, () => console.log('listening on door ' + door));