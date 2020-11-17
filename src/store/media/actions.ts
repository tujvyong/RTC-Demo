import { UserDevices, VideoType } from "../../utils/types";
import {
  SET_AUDIO_TRACK,
  SET_AUDIO_DEVICES,
  SET_VIDEO_TRACK,
  SET_VIDEO_DEVICES,
  RELEASE_AUDIO,
  RELEASE_VIDEO,
  TOGGLE_MUTED,
} from "./types";

export const setAudioTrack = (track: MediaStreamTrack, deviceId: string) => ({
  type: SET_AUDIO_TRACK,
  payload: { track: track, id: deviceId }
})

export const setAudioDevices = ({ audioInDevices }: UserDevices) => ({
  type: SET_AUDIO_DEVICES,
  payload: audioInDevices
})

export const setVideoTrack = (track: MediaStreamTrack, type: VideoType, deviceId: string) => ({
  type: SET_VIDEO_TRACK,
  payload: { track: track, type: type, id: deviceId }
})

export const setVideoDevices = ({ videoInDevices }: UserDevices) => ({
  type: SET_VIDEO_DEVICES,
  payload: videoInDevices
})

export const releaseAudioDevice = () => ({
  type: RELEASE_AUDIO,
})

export const releaseVideoDevice = () => ({
  type: RELEASE_VIDEO
})

export const toggleMuted = (kind: MediaStreamTrack["kind"]) => ({
  type: TOGGLE_MUTED,
  payload: kind
})

