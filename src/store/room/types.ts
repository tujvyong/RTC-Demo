import Peer, { RoomStream, SfuRoom, MeshRoom } from "skyway-js";

export const SET_ROOMNAME = 'SET_ROOMNAME'
export const SET_RE_ENTER = 'SET_RE_ENTER'
export const SET_FINISHED = 'SET_FINISHED'
export const JOINED_ROOM = 'JOINED_ROOM'
export const JOINED_CHAT_ROOM = 'JOINED_CHAT_ROOM'
export const LOAD = 'LOAD'
export const ADD_STREAM = 'ADD_STREAM'
export const REMOVE_STREAM = 'REMOVE_STREAM'
export const SET_ROOM_STAT = 'SET_ROOM_STAT'
export const CLEAN_UP_ROOM = 'CLEAN_UP_ROOM'

// export interface ClientBrowser {
//   name: string;
//   version: string;
// }

export interface RoomInit {
  mode: "sfu" | "mesh";
  id: string;
  useH264: boolean;
}

// export interface RoomStat {
//   displayName: string;
//   browser: ClientBrowser;
//   isVideoDisabled: boolean;
//   isVideoMuted: boolean;
//   isAudioMuted: boolean;
// }

export interface RoomStore {
  peer: Peer | null;
  isReady: boolean;
  isJoined: boolean;
  room: SfuRoom | MeshRoom | null;
  mode: RoomInit["mode"] | null;
  id: RoomInit["id"] | null;
  useH264: RoomInit["useH264"];
  streams: Map<string, RoomStream>;
  castRequestCount: number;
  // stats: Map<string, RoomStat>
  // chats: IObservableArray<RoomChat>;
  // myLastChat: RoomChat | null;
  // myLastReaction: RoomReaction | null;
  // pinnedId: string | null;
  // rtcStats: RTCStatsReport | null;
}

interface Load {
  type: typeof LOAD
  payload: Peer
}

interface AddStream {
  type: typeof ADD_STREAM
  payload: RoomStream
}

interface RemoveStream {
  type: typeof REMOVE_STREAM
  payload: string
}

// interface SetRoomStat {
//   type: typeof SET_ROOM_STAT
//   payload: { src: string, stat: RoomStat }
// }

export type RoomActionTypes = Load | AddStream | RemoveStream
