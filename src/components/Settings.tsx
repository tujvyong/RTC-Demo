import React from 'react'
import { useDispatch } from 'react-redux'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, Button } from '@material-ui/core'
import { MediaConfig } from "../utils/types";
import { MediaStore } from '../store/media/types';
import { releaseVideoDevice, releaseAudioDevice, setVideoTrack, setAudioTrack } from '../store/media/actions'
import { getUserVideoTrack, getUserAudioTrack } from '../utils/webrtc';

interface Props {
  media: MediaStore
  configs: MediaConfig
  setConfigs: React.Dispatch<React.SetStateAction<MediaConfig>>
}

const Settings: React.FC<Props> = ({ media, configs, setConfigs }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleChangeVideo = async (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    dispatch(releaseVideoDevice())
    const deviceId = e.target.value as string
    const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
      console.error(err)
    })
    if (videoTrack) {
      dispatch(setVideoTrack(videoTrack, "camera", deviceId))
    }
  }

  const handleChangeAudio = async (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    dispatch(releaseAudioDevice())
    const deviceId = e.target.value as string
    const audioTrack = await getUserAudioTrack(deviceId).catch(err => {
      console.error(err)
    })
    if (audioTrack) {
      dispatch(setAudioTrack(audioTrack, deviceId))
    }
  }

  return (
    <Dialog disableEscapeKeyDown open={configs.settings} onClose={() => setConfigs({ ...configs, settings: false })}>
      <DialogTitle>デバイス設定</DialogTitle>
      <DialogContent>
        <FormControl
          variant="outlined"
          fullWidth
          margin="dense"
          color="secondary"
          className={classes.formControl}
        >
          <InputLabel htmlFor="video-device-select">ビデオ デバイス</InputLabel>
          <Select
            native
            value={media.videoDeviceId}
            onChange={handleChangeVideo}
            label="Video Device"
            displayEmpty
            inputProps={{
              name: 'video-device',
              id: 'video-device-select',
            }}
          >
            {media.videoInDevices.map((device: MediaDeviceInfo) => {
              return (
                <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
              )
            })}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          fullWidth margin="dense"
          color="secondary"
          className={classes.formControl}
        >
          <InputLabel htmlFor="audio-device-select">オーディオ デバイス</InputLabel>
          <Select
            native
            value={media.audioDeviceId}
            onChange={handleChangeAudio}
            label="Audio Device"
            displayEmpty
            inputProps={{
              name: 'audio-device',
              id: 'audio-device-select',
            }}
          >
            {media.audioInDevices.map((device: MediaDeviceInfo) => {
              return (
                <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
              )
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfigs({ ...configs, settings: false })} color="secondary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Settings

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0.5),
      minWidth: '80px',
    },
  })
)
