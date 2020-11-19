import React, { useEffect, useState } from 'react'
import { RoomStream } from 'skyway-js'
import { useSelector } from 'react-redux'
import Video from './Video'
import { Avatar, Typography } from '@material-ui/core'
import { RootStore } from '../store'

interface Props {
  streams: Map<string, RoomStream>
  displayCss: string
}

const RemoteStream: React.FC<Props> = ({ streams, displayCss }) => {
  // const [isActive, setIsActive] = useState(false)
  // const { streams } = useSelector((state: RootStore) => state.room)

  // useEffect(() => {
  //   if (remoteStream.getVideoTracks().length !== 0) {
  //     setIsActive(remoteStream.getVideoTracks()[0].enabled)
  //   }
  // }, [remoteStream])

  let videos = null
  streams.forEach((stream, peerId) => {
    videos = <Video stream={stream} />
  })

  return (
    <div className={displayCss}>
      {videos}
      {/* <div className={classes.username}><Typography variant="h6" component="p">{nameOfPeer}</Typography></div> */}
    </div>
  )
}

export default RemoteStream
