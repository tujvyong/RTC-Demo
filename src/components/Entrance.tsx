import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Grid, Paper, Button, Tooltip, Typography } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffOutlinedIcon from '@material-ui/icons/VideocamOffOutlined';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import { MediaConfig } from "../utils/types";
import SettingsIcon from '@material-ui/icons/Settings';
import { toggleMuted } from '../store/media/actions'
import LocalStream from './LocalStream'
// import SettingsDialog from './settings-dialog'
import { RootStore } from '../store';


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
  const { room } = useSelector((state: RootStore) => state)
  const classes = useStyles()
  const dispatch = useDispatch()

  const cam = configs.video ? <VideocamIcon /> : <VideocamOffOutlinedIcon />
  const mic = configs.mic ? <MicIcon /> : <MicOffIcon />
  const camText = configs.video ? 'On' : 'Off'
  const micText = configs.mic ? 'On' : 'Off'

  const toggleVideo = () => {
    setConfigs({ ...configs, video: !configs.video })
    // setConfText({ ...confText, video: !confText.video })
    dispatch(toggleMuted('video'))
  }

  const toggleMic = () => {
    setConfigs({ ...configs, mic: !configs.mic })
    // setConfText({ ...confText, mic: !confText.mic })
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
        <Tooltip title="カメラ オン/オフ">
          <ToggleButton
            classes={{ root: classes.rootToggle, selected: classes.selectedToggle }}
            value="check"
            selected={configs.video}
            onChange={toggleVideo}>
            {cam}
          </ToggleButton>
        </Tooltip>
        <Tooltip title="マイク オン/オフ">
          <ToggleButton
            classes={{ root: classes.rootToggle, selected: classes.selectedToggle }}
            value="check"
            selected={configs.mic}
            onChange={toggleMic}>
            {mic}
          </ToggleButton>
        </Tooltip>
        <Tooltip title="設定">
          <ToggleButton
            classes={{ root: classes.rootToggle, selected: classes.selectedToggle }}
            value="check"
            selected={true}
            onChange={() => setConfigs({ ...configs, settings: true })}>
            <SettingsIcon />
          </ToggleButton>
        </Tooltip>
      </Grid>

      <Typography className={classes.configText}>
        カメラ: {camText}&nbsp;&nbsp;&nbsp;マイク: {micText}
      </Typography>

      <div className={classes.buttonWrapper}>
        <Button color="secondary" variant="contained" fullWidth className={classes.button} onClick={onCallRoom} >入室する</Button>
        <Button color="secondary" variant="outlined" fullWidth className={classes.button} href="/" >ホームへ戻る</Button>
      </div>

      {/* <SettingsDialog classes={classes} configs={configs} setConfigs={setConfigs} /> */}
    </Container>
  )
}

export default Entrance

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerWrapper: {
      paddingTop: theme.spacing(3),
    },
    rootToggle: {
      backgroundColor: '#f26b4d !important',
      '&:hover': {
        backgroundColor: '#c35037 !important',
      },
      '& svg': {
        color: '#fff',
      },
    },
    selectedToggle: {
      backgroundColor: `rgba(76, 76, 18, 0.6) !important`,
      '&:hover': {
        backgroundColor: `rgba(76, 76, 18, 0.8) !important`,
      },
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
