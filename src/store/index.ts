import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas'
import mediaReducer from './media/reducer'
import roomReducer from './room/reducer'
import uiReducer from './ui/reducer'
import { MediaStore } from './media/types'
import { RoomStore } from './room/types'
import { UIStore } from './ui/types'


export type RootStore = {
  media: MediaStore
  room: RoomStore
  ui: UIStore
}

const sagaMiddleware = createSagaMiddleware()


const rootReducer = combineReducers({
  media: mediaReducer,
  room: roomReducer,
  ui: uiReducer,
})

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store
