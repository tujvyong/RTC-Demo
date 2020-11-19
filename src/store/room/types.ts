import Peer, { RoomStream, SfuRoom, MeshRoom } from "skyway-js";

export const LOAD = 'LOAD'
export const JOINED_ROOM = 'JOINED_ROOM'
export const ADD_STREAM = 'ADD_STREAM'
export const REMOVE_STREAM = 'REMOVE_STREAM'
export const CLEAN_UP_ROOM = 'CLEAN_UP_ROOM'

export interface RoomInit {
  mode: "sfu" | "mesh";
  id: string;
  useH264: boolean;
}

export interface RoomStore {
  peer: Peer | null;
  isReady: boolean;
  isJoined: boolean;
  room: SfuRoom | MeshRoom | null;
  mode: RoomInit["mode"] | null;
  id: RoomInit["id"] | null;
  useH264: RoomInit["useH264"];
  streams: Map<string, RoomStream>;
}

interface Load {
  type: typeof LOAD
  payload: Peer
}

interface JoinedRoom {
  type: typeof JOINED_ROOM
  payload: SfuRoom
}

interface AddStream {
  type: typeof ADD_STREAM
  payload: RoomStream
}

interface RemoveStream {
  type: typeof REMOVE_STREAM
  payload: string
}

interface CleanUpRoom {
  type: typeof CLEAN_UP_ROOM
}

export type RoomActionTypes = Load | JoinedRoom | AddStream | RemoveStream | CleanUpRoom
