export const ERROR_UI = 'ERROR_UI'
export const BACKDROP_UI = 'BACKDROP_UI'

export interface UIStore {
  error: Error | null
  backdrop: boolean
}

interface SetError {
  type: typeof ERROR_UI
  payload: Error
}

interface SetBackdrop {
  type: typeof BACKDROP_UI
  payload: boolean
}

export type UIActionTypes = SetError | SetBackdrop
