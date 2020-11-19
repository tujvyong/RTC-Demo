import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Grid, Fade } from '@material-ui/core'
import { MediaConfig } from "../utils/types";
import { RootStore } from '../store';
import { toggleMuted } from '../store/media/actions'
import LocalStream from '../components/LocalStream'
import RemoteStream from '../components/RemoteStream'
import Settings from '../components/Settings'
import ToggleBtn from "../components/ToggleBtn";
import { useHistory } from 'react-router-dom';


interface Props {
  configs: MediaConfig
  setConfigs: React.Dispatch<React.SetStateAction<MediaConfig>>
}

function debounce(fn: () => void, ms: number) {
  let timer: NodeJS.Timeout | null
  return () => {
    if (timer) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn()
      }, ms)
    }
  };
}

const Room: React.FC<Props> = ({
  configs,
  setConfigs,
  // handleBeforeunload,
  // exitRoom,
}) => {
  const classes = useStyles()
  let history = useHistory()
  const [windowSize, setWindowSize] = useState({
    // width: window.innerWidth,
    height: window.innerHeight
  })
  const [touch, setTouch] = useState(true)
  const [isFull, setIsFull] = useState(false)
  const { room, media } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const videoHeight = isFull || !touch ? `${windowSize.height}px` : `${windowSize.height - 88}px`

  const toggleVideo = () => {
    setConfigs({ ...configs, video: !configs.video })
    dispatch(toggleMuted('video'))
  }

  const toggleMic = () => {
    setConfigs({ ...configs, mic: !configs.mic })
    dispatch(toggleMuted('audio'))
  }

  const toggleFullscreen = () => {
    setIsFull(!isFull)
  }

  const touchInOut = () => {
    setTouch(!touch)
  }

  const exitRoom = () => {
    if (room.room) {
      room.room.close()
    }
    window.location.href = "/"
  }

  useEffect(() => {
    const handleResize = debounce(function resizer() {
      setWindowSize({ height: window.innerHeight })
    }, 1000)
    window.addEventListener('resize', handleResize)
    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, [windowSize])

  return (
    <div className={classes.roomRoot}>
      <LocalStream displayCss="room" />

      <div className={classes.roomContent} style={{ height: videoHeight }} onTouchEnd={touchInOut} >
        <RemoteStream
          streams={room.streams}
          displayCss={classes.remoteVideoStyle}
        />
      </div>

      <Fade in={touch}>
        <Grid container spacing={1} justify='center' className={clsx(classes.roomConfigs, { [classes.roomConfigsFull]: isFull || !touch })} >
          <Grid item >
            <ToggleBtn
              title="カメラ オン/オフ"
              selected={configs.video}
              icon={configs.video ? "VideocamIcon" : "VideocamOffOutlinedIcon"}
              event="change"
              fn={toggleVideo}
            />
          </Grid>
          <Grid item>
            <ToggleBtn
              title="マイク オン/オフ"
              selected={configs.mic}
              icon={configs.mic ? "MicIcon" : "MicOffIcon"}
              event="change"
              fn={toggleMic}
            />
          </Grid>
          <Grid item>
            <ToggleBtn
              title="設定"
              selected={true}
              icon={"SettingsIcon"}
              event="click"
              fn={() => setConfigs({ ...configs, settings: true })}
            />
          </Grid>
          <Grid item>
            <ToggleBtn
              title="退出"
              selected={true}
              icon={"CallEndIcon"}
              event="click"
              fn={exitRoom}
            />
          </Grid>
        </Grid>
      </Fade>

      <Settings media={media} configs={configs} setConfigs={setConfigs} />
    </div>
  )
}

export default Room

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    roomRoot: {
      overflow: 'hidden',
      position: 'relative',
    },
    roomContent: {
      position: 'relative',
    },
    roomConfigs: {
      // for window resize
      padding: `${theme.spacing(2)}px 0`,
    },
    roomConfigsFull: {
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
    },
    remoteVideoStyle: {
      position: 'relative',
      background: 'inherit',
      width: '100%',
      height: '100%',
      // backgroundColor: '#212225',
    },
  })
)
