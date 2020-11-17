import {
  ERROR_UI,
  BACKDROP_UI,
} from './types'

export const handleError = (err: Error) => ({
  type: ERROR_UI,
  payload: err
})

export const handleBackdrop = (toggle: boolean) => ({
  type: BACKDROP_UI,
  payload: toggle
})
