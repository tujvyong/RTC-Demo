import { createStore } from 'redux'
import { combineReducers } from 'redux'
import mediaReducer from './media/reducer'
import roomReducer from './room/reducer'
import uiReducer from './room/reducer'
import { MediaStore } from './media/types'
import { RoomStore } from './room/types'
import { UIStore } from './ui/types'


export type RootStore = {
  media: MediaStore
  room: RoomStore
  ui: UIStore
}

const rootReducer = combineReducers({
  media: mediaReducer,
  room: roomReducer,
  ui: uiReducer,
})

const store = createStore(
  rootReducer,
)

export default store
