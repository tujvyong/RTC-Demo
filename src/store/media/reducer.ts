import {
  STREAM_SET,
  SET_VIDEO_TRACK,
  SET_AUDIO_TRACK,
  DELETE_VIDEO_TRACK,
  RELEASE_VIDEO,
  RELEASE_AUDIO,
  SET_VIDEO_DEVICES,
  SET_AUDIO_DEVICES,
  TOGGLE_MUTED,
  CLEAN_UP_MEDIA,
  MediaStore,
  MediaActionTypes
} from "./types";


const initialState: MediaStore = {
  stream: new MediaStream(),
  audioInDevices: [],
  videoInDevices: [],
  audioDeviceId: null,
  videoDeviceId: null,
  isVideoTrackMuted: false,
  isAudioTrackMuted: false,
  videoType: null,
  audioTrack: null,
  videoTrack: null,
}

export default function mediaReducer(state = initialState, action: MediaActionTypes) {
  switch (action.type) {
    case STREAM_SET: {
      const stream = new MediaStream()
      if (state.audioTrack instanceof MediaStreamTrack) {
        stream.addTrack(state.audioTrack)
        state.audioTrack.enabled = !state.isAudioTrackMuted
      }
      if (state.videoTrack instanceof MediaStreamTrack) {
        stream.addTrack(state.videoTrack)
        state.videoTrack.enabled = !state.isVideoTrackMuted
      }
      return { ...state, stream: stream }
    }
    case SET_VIDEO_TRACK: {
      const { track, type, deviceId } = action.payload
      return { ...state, videoTrack: track, videoType: type, videoDeviceId: deviceId }
    }
    case SET_AUDIO_TRACK: {
      const { track, deviceId } = action.payload
      return { ...state, audioTrack: track, audioDeviceId: deviceId }
    }
    // case DELETE_VIDEO_TRACK: {
    //   // ビデオの機能をなくしたいときに使う
    //   if (state.videoTrack instanceof MediaStreamTrack) {
    //     state.videoTrack.stop()
    //   }
    //   // stateの変更をwatchしていないといけない?
    //   return { ...state, videoTrack: null, videoType: null, videoDeviceId: null }
    // }
    case RELEASE_AUDIO: {
      // デバイスを変更するときに使う
      if (state.audioTrack instanceof MediaStreamTrack) {
        state.audioTrack.stop()
      }
      // stateの変更をwatchしていないといけない?
      return state
    }
    case RELEASE_VIDEO: {
      // デバイスを変更するときに使う
      if (state.videoTrack instanceof MediaStreamTrack) {
        state.videoTrack.stop()
      }
      // stateの変更をwatchしていないといけない?
      return state
    }
    case SET_VIDEO_DEVICES: {
      const gotDevices = action.payload
      if (gotDevices !== null) {
        return { ...state, videoInDevices: gotDevices }
      }
      return state
    }
    case SET_AUDIO_DEVICES: {
      const gotDevices = action.payload
      if (gotDevices !== null) {
        return { ...state, audioInDevices: gotDevices }
      }
      return state
    }
    case TOGGLE_MUTED: {
      const kind = action.payload
      if (kind === 'video') {
        return { ...state, isVideoTrackMuted: !state.isVideoTrackMuted }
      }
      if (kind === 'audio') {
        return { ...state, isAudioTrackMuted: !state.isAudioTrackMuted }
      }
      return state
    }
    // case CLEAN_UP_MEDIA: {
    //   state.stream.getTracks().forEach(track => track.stop())
    //   return {
    //     stream: new MediaStream(),
    //     audioInDevices: [],
    //     videoInDevices: [],
    //     audioDeviceId: null,
    //     videoDeviceId: null,
    //     isVideoTrackMuted: false,
    //     isAudioTrackMuted: false,
    //     videoType: null,
    //     audioTrack: null,
    //     videoTrack: null,
    //   }
    // }

    default:
      return state
  }
}
