import { VideoType, UserDevices } from "../../utils/types";

export const STREAM_SET = 'STREAM_SET'
export const SET_STAT = 'SET_STAT'
export const SET_VIDEO_TRACK = 'SET_VIDEO_TRACK'
export const SET_AUDIO_TRACK = 'SET_AUDIO_TRACK'
export const DELETE_VIDEO_TRACK = 'DELETE_VIDEO_TRACK'
export const RELEASE_VIDEO = 'RELEASE_VIDEO'
export const RELEASE_AUDIO = 'RELEASE_AUDIO'
export const SET_VIDEO_DEVICES = 'SET_VIDEO_DEVICES'
export const SET_AUDIO_DEVICES = 'SET_AUDIO_DEVICES'
export const TOGGLE_MUTED = 'TOGGLE_MUTED'
export const CLEAN_UP_MEDIA = 'CLEAN_UP_MEDIA'

export interface MediaStore {
  stream: MediaStream,
  audioInDevices: MediaDeviceInfo[],
  videoInDevices: MediaDeviceInfo[],
  audioDeviceId: string | null,
  videoDeviceId: string | null,
  isVideoTrackMuted: boolean,
  isAudioTrackMuted: boolean,
  videoType: VideoType,
  audioTrack: MediaStreamTrack | null,
  videoTrack: MediaStreamTrack | null,
}

interface SetStream {
  type: typeof STREAM_SET
}

interface SetAudioTrack {
  type: typeof SET_AUDIO_TRACK
  payload: { track: MediaStreamTrack, deviceId: string }
}

interface SetAudioDevices {
  type: typeof SET_AUDIO_DEVICES
  payload: UserDevices
}

interface SetVideoTrack {
  type: typeof SET_VIDEO_TRACK
  payload: { track: MediaStreamTrack, type: VideoType, deviceId: string }
}

interface SetVideoDevices {
  type: typeof SET_VIDEO_DEVICES
  payload: UserDevices
}

interface ReleaseAudio {
  type: typeof RELEASE_AUDIO
}

interface ReleaseVideo {
  type: typeof RELEASE_VIDEO
}

interface ToggleMuted {
  type: typeof TOGGLE_MUTED
  payload: MediaStreamTrack["kind"]
}

export type MediaActionTypes = SetStream | SetAudioTrack | SetAudioDevices | SetVideoTrack | SetVideoDevices | ReleaseAudio | ReleaseVideo | ToggleMuted
