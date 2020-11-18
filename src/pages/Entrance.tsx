import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Grid, Button, Typography } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { RootStore } from '../store';
import { MediaConfig } from "../utils/types";
import { toggleMuted } from '../store/media/actions'
import LocalStream from '../components/LocalStream'
import ToggleBtn from '../components/ToggleBtn'
import Settings from '../components/Settings'


interface Props {
  configs: MediaConfig
  setConfigs: React.Dispatch<React.SetStateAction<MediaConfig>>
  onCallRoom: () => void
}

const Entrance: React.FC<Props> = ({
  configs,
  setConfigs,
  onCallRoom,
}) => {
  const { room, media } = useSelector((state: RootStore) => state)
  const classes = useStyles()
  const dispatch = useDispatch()

  const camText = configs.video ? 'On' : 'Off'
  const micText = configs.mic ? 'On' : 'Off'

  const toggleVideo = () => {
    setConfigs({ ...configs, video: !configs.video })
    dispatch(toggleMuted('video'))
  }

  const toggleMic = () => {
    setConfigs({ ...configs, mic: !configs.mic })
    dispatch(toggleMuted('audio'))
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.containerWrapper}>
      <Typography
        variant="caption"
        component="p"
        color="textSecondary"
      >
        Peer ID: {room.peer ? room.peer.id : ''}
      </Typography>

      <LocalStream displayCss="entrance" />

      <Grid container justify="space-around" className={classes.roomConfigs} >
        <ToggleBtn
          title="カメラ オン/オフ"
          selected={configs.video}
          icon={configs.video ? "VideocamIcon" : "VideocamOffOutlinedIcon"}
          event="change"
          fn={toggleVideo}
        />
        <ToggleBtn
          title="マイク オン/オフ"
          selected={configs.mic}
          icon={configs.mic ? "MicIcon" : "MicOffIcon"}
          event="change"
          fn={toggleMic}
        />
        <ToggleBtn
          title="設定"
          selected={true}
          icon={"SettingsIcon"}
          event="change"
          fn={() => setConfigs({ ...configs, settings: true })}
        />
      </Grid>

      <Typography className={classes.configText}>
        カメラ: {camText}&nbsp;&nbsp;&nbsp;マイク: {micText}
      </Typography>

      <div className={classes.buttonWrapper}>
        <Button color="secondary" variant="contained" fullWidth className={classes.button} onClick={onCallRoom} >入室する</Button>
        <Button color="secondary" variant="outlined" fullWidth className={classes.button} href="/" >ホームへ戻る</Button>
      </div>

      <Settings media={media} configs={configs} setConfigs={setConfigs} />
    </Container>
  )
}

export default Entrance

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerWrapper: {
      paddingTop: theme.spacing(3),
    },
    roomConfigs: {
      // for window resize
      padding: `${theme.spacing(2)}px 0`,
    },
    configText: {
      margin: theme.spacing(1),
      border: '1px solid #333',
      borderRadius: theme.shape.borderRadius,
      textAlign: 'center',
      padding: theme.spacing(1),
    },
    buttonWrapper: {
      margin: theme.spacing(3, 0, 2),
    },
    button: {
      margin: theme.spacing(1, 0),
    },
  })
)
