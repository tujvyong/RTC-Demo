import React from 'react'
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
  let style = displayCss === 'entrance' ? classes.entranceVideoStyle : classes.roomVideoStyle

  return (
    <div className={style}>
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
    entranceVideoStyle: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: theme.shape.borderRadius,
    },
    roomVideoStyle: {
      width: '25%',
      borderRadius: theme.shape.borderRadius,
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 2,
      [theme.breakpoints.up('md')]: {
        width: '20%',
      },
    },
  })
)
