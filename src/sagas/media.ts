import { put, take } from 'redux-saga/effects';
import { setStream } from '../store/media/actions'

export function* watchMuted() {
  while (true) {
    yield take('TOGGLE_MUTED')
    yield put(setStream())
  }
}

export function* watchSetVideo() {
  while (true) {
    yield take('SET_VIDEO_TRACK')
    yield put(setStream())
  }
}

export function* watchSetAudio() {
  while (true) {
    yield take('SET_AUDIO_TRACK')
    yield put(setStream())
  }
}
