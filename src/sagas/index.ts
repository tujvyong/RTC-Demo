import { fork } from 'redux-saga/effects';

import { watchMuted, watchSetVideo, watchSetAudio } from './media'

export function* rootSaga() {
  yield fork(watchMuted)
  yield fork(watchSetVideo)
  yield fork(watchSetAudio)
}
