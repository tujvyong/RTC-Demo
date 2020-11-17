import Peer, { RoomStream } from "skyway-js";
import {
  ADD_STREAM,
  LOAD,
  REMOVE_STREAM,
  // RoomStat,
  SET_ROOM_STAT
} from "./types";


export const load = (peer: Peer) => ({
  type: LOAD,
  payload: peer
})

export const addStream = (stream: RoomStream) => ({
  type: ADD_STREAM,
  payload: stream
})

export const removeStream = (peerId: string) => ({
  type: REMOVE_STREAM,
  payload: peerId
})

// export const setRoomStat = (src: string, stat: RoomStat) => ({
//   type: SET_ROOM_STAT,
//   payload: { src, stat }
// })
