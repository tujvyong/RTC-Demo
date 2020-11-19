import Peer, { RoomStream, SfuRoom } from "skyway-js";
import {
  ADD_STREAM,
  CLEAN_UP_ROOM,
  JOINED_ROOM,
  LOAD,
  REMOVE_STREAM,
} from "./types";


export const load = (peer: Peer) => ({
  type: LOAD,
  payload: peer
})

export const joinedRoom = (room: SfuRoom) => ({
  type: JOINED_ROOM,
  payload: room
})

export const addStream = (stream: RoomStream) => ({
  type: ADD_STREAM,
  payload: stream
})

export const removeStream = (peerId: string) => ({
  type: REMOVE_STREAM,
  payload: peerId
})

export const cleanUpRoom = () => ({
  type: CLEAN_UP_ROOM
})
