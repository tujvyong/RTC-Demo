import {
  ERROR_UI,
  BACKDROP_UI,
  UIActionTypes,
  UIStore
} from './types'

const initialState = {
  error: null,
  backdrop: false,
}

export default function uiReducer(state = initialState, action: UIActionTypes): UIStore {
  switch (action.type) {
    case ERROR_UI: {
      const err = action.payload
      return { ...state, error: err }
    }
    case BACKDROP_UI: {
      const toggle = action.payload
      return { ...state, backdrop: toggle }
    }
    default:
      return state
  }
}
