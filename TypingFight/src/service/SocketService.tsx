import { io } from 'socket.io-client';

const socket = io('ws://localhost:8080');

export const createMatch = (matchName: string) => {
  socket.emit('createMatch', matchName);
};

export const enterMatch = (roomId: string) => {
  socket.emit('enterMatch', roomId);
};

export const disconnect = () => {
  socket.disconnect();
};



// --------------- Ouvir eventos do servidor ---------------

export const onMatchCreated = (callback: any) => {
  socket.on('matchCreated', callback);
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

export const onDisconnect = (callback: any) => {
  socket.on('disconnect', callback);
};