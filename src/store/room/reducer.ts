import { STREAM_SET } from "../media/types"
import {
  SET_ROOMNAME,
  SET_RE_ENTER,
  SET_FINISHED,
  JOINED_ROOM,
  JOINED_CHAT_ROOM,
  ADD_STREAM,
  LOAD,
  REMOVE_STREAM,
  CLEAN_UP_ROOM,
  RoomActionTypes,
  SET_ROOM_STAT,
  RoomStore,
} from "./types"

const initialState: RoomStore = {
  peer: null,
  isReady: false,
  isJoined: false,
  room: null,
  mode: null,
  id: null,
  useH264: false,
  streams: new Map(),
  // castRequestCount: new Map(),
  // stats: new Map(),
}

export default function roomReducer(state = initialState, action: RoomActionTypes) {
  switch (action.type) {
    // case SET_RE_ENTER: {
    //   const toggle = action.payload
    //   return { ...state, isReEnter: toggle }
    // }
    // case SET_FINISHED: {
    //   const toggle = action.payload
    //   return { ...state, isFinished: toggle, isJoined: false }
    // }
    case JOINED_ROOM: {
      const currentRoom = action.payload
      return { ...state, currentRoom: currentRoom, isJoined: true }
    }
    case ADD_STREAM: {
      const stream = action.payload
      return { ...state, streams: state.streams.set(stream.peerId, stream) }
    }
    case LOAD: {
      const peer = action.payload
      return {
        ...state,
        peer: peer,
        isReady: true,
      }
    }
    case REMOVE_STREAM: {
      const peerId = action.payload
      state.streams.delete(peerId)
      // state.stats.delete(peerId)
      return state
    }
    // case SET_ROOM_STAT: {
    //   const { src, stat } = action.payload
    //   state.stats.set(src, stat)
    //   return state
    // }
    case CLEAN_UP_ROOM: {
      state.streams.forEach((stream) =>
        stream.getTracks().forEach((track) => track.stop())
      )
      state.streams.clear()
      return {
        ...state,
        peer: null,
        isReady: false,
        isJoined: false,
        room: null,
        mode: null,
        id: null,
        useH264: false,
      }
    }
    default:
      return state
  }
}
