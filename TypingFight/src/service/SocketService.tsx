import { io, Socket } from 'socket.io-client';

const socket: Socket = io('ws://localhost:8080', {
  autoConnect: false
});

export interface Match {
  id: string,
  name: string,
  password: string,
  players: string[],
}

export const createMatch = (matchName: string, password: string) => {
  socket.emit('createMatch', {name: matchName, password: password});
};

export const enterMatch = (roomId: Match) => {
  socket.emit('enterMatch', roomId);
};

export const disconnect = () => {
  socket.disconnect();
};

export const getMatches = () => {
  socket.emit('getMatches');
};

export const closeMatch = (matchId: string) => {
  socket.emit('closeMatch', matchId);
};

export const registerPoints = (matchId: string, points: number) => {
  socket.emit('registerPoints', matchId, points);
};

// --------------- Ouvir eventos do servidor ---------------

export const onGetMatches = (callback: any) => {
  socket.on('allMatches', callback);
};

export const onMatchCreated = (callback: any) => {
  socket.on('matchCreated', callback);
};

export const onMatchAccepted = (callback: any) => {
  socket.on('matchAccepted', callback);
};

export const onMatchEnteredSuccesfuly = (callback: any) => {
  socket.on('matchEnteredSuccesfuly', callback);
};

export const onMatchNotFound = (callback: any) => {
  socket.on('matchNotFound', callback);
};

export const onPlayerConnected = (callback: any) => {
  socket.on('playerConnected', callback);
};

export const onPointsUpdate = (callback: any) => {
  socket.on('pointsUpdate', callback);
};

export const onDisconnect = (callback: any) => {
  socket.on('disconnect', callback);
};

// --------------- Off Sockets ---------------

export const offGetMatches = (callback: (matches: any) => void) => {
  socket.off('allMatches', callback);
};

export const offMatchCreated = (callback: (matches: any) => void) => {
  socket.off('matchCreated', callback);
};

export const offMatchAccepted = (callback: (matches: any) => void) => {
  socket.off('matchAccepted', callback);
};

export const offPointsUpdate = (callback: (points: number, player: string) => void) => {
  socket.on('pointsUpdate', callback);
};

export default socket;