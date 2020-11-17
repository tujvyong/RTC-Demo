import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootStore } from '../store'
import Video from './Video'

interface Props {
  displayCss: string
}

const LocalStream: React.FC<Props> = ({ displayCss }) => {
  const classes = useStyles()
  const { stream, videoType } = useSelector((state: RootStore) => state.media)
  // const [isActive, setIsActive] = useState(false)
  // useEffect(() => {
  //   if (stream.getVideoTracks().length !== 0) {
  //     setIsActive(stream.getVideoTracks()[0].enabled)
  //   }
  // }, [stream])

  return (
    <div className={classes.entranceVideo}>
      <Video
        stream={stream}
        isReverse={videoType === 'camera'}
        isVideoOnly={true}
      />
    </div>
  )
}

export default LocalStream

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    entranceVideo: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: theme.shape.borderRadius,
    },
  })
)
