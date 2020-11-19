import {
  JOINED_ROOM,
  ADD_STREAM,
  LOAD,
  REMOVE_STREAM,
  CLEAN_UP_ROOM,
  RoomActionTypes,
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
}

export default function roomReducer(state = initialState, action: RoomActionTypes) {
  switch (action.type) {
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
