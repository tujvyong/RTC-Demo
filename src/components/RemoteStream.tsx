import React from 'react'
import { useSelector } from 'react-redux'
import Video from './Video'
import { RootStore } from '../store'

interface Props {
  displayCss: string
}

const RemoteStream: React.FC<Props> = ({ displayCss }) => {
  const { streams } = useSelector((state: RootStore) => state.room)

  let videos = null
  streams.forEach((stream, peerId) => {
    videos = <Video stream={stream} />
  })

  return (
    <div className={displayCss}>
      {videos}
    </div>
  )
}

export default RemoteStream
