import React, { useState, useEffect, useCallback } from 'react'
import { SfuRoom, RoomStream } from "skyway-js";
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { initPeer } from "../utils/skyway";
import { getUserDevices, getUserAudioTrack, getUserVideoTrack } from "../utils/webrtc";
import { isiOS, isChrome } from "../utils/config";
import { handleError } from "../store/ui/actions";
import { RootStore } from "../store";
import {
  setAudioTrack,
  setAudioDevices,
  setVideoTrack,
  setVideoDevices,
  releaseVideoDevice,
} from "../store/media/actions";
import {
  load,
  addStream,
  removeStream,
  setRoomStat,
} from "../store/room/actions";
import { RoomStat } from "../store/room/types"
import { useParams } from 'react-router-dom';

interface Props {

}

const RTCsettings: React.FC<Props> = () => {
  const classes = useStyles()
  const { roomName } = useParams<{ roomName: string }>()
  const dispatch = useDispatch()
  const { room, media, ui } = useSelector((state: RootStore) => state)

  const enableUserAudio = async () => {
    if (isiOS() && isChrome()) {
      throw dispatch(handleError(new Error("このブラウザをサポートしていません。Safariを使用してみてください。")))
    }

    const { audioInDevices } = await getUserDevices({
      audio: true,
    }).catch((err) => {
      throw dispatch(handleError(err));
    })

    if (audioInDevices === null) {
      throw dispatch(handleError(new Error("お使いの端末はマイクをご利用できません。別の端末でお試しください")))
    }
    if (audioInDevices.length === 0) {
      throw dispatch(handleError(new Error("少なくとも１つのオーディオデバイスが必要です")))
    }

    const [{ deviceId }] = audioInDevices
    const audioTrack = await getUserAudioTrack(deviceId).catch((err) => {
      throw dispatch(handleError(err))
    })
    dispatch(setAudioTrack(audioTrack, deviceId))

    const devices = await getUserDevices({ video: true, audio: true }).catch((err) => {
      throw dispatch(handleError(err))
    })
    dispatch(setAudioDevices(devices))
  }

  const enableUserVideo = async () => {
    if (isiOS() && isChrome()) {
      throw dispatch(handleError(new Error("このブラウザをサポートしていません。Safariを使用してみてください。")))
    }

    const { videoInDevices } = await getUserDevices({ video: true }).catch(err => {
      throw dispatch(handleError(err))
    })

    // must not be happend
    if (videoInDevices === null) {
      throw dispatch(handleError(new Error("お使いの端末はカメラをご利用できません。別の端末でお試しください")))
    }
    if (videoInDevices.length === 0) {
      throw dispatch(handleError(new Error("少なくとも１つのカメラデバイスが必要です")))
    }

    const [{ deviceId }] = videoInDevices
    const videoTrack = await getUserVideoTrack(deviceId).catch(err => {
      throw dispatch(handleError(err))
    })
    dispatch(releaseVideoDevice())
    dispatch(setVideoTrack(videoTrack, "camera", deviceId))

    const devices = await getUserDevices({ video: true }).catch(err => {
      throw dispatch(handleError(err))
    })
    dispatch(setVideoDevices(devices))
  }

  const onCallRoom = useCallback(() => {
    if (room.peer === null) {
      dispatch(handleError(new Error("Peer is not created")))
      return false
    }
    const currentRoom = room.peer.joinRoom<SfuRoom>(roomName, {
      mode: 'sfu',
      stream: media.stream
    })
    // setMediaConnection(mediaConnection)

    // receive behavior
    currentRoom.on('stream', (stream: RoomStream) => {
      dispatch(addStream(stream))
      // currentRoom.send({
      //   type: 'stat',
      //   payload: { ...media.stat }
      // })
    })
    currentRoom.on('peerLeave', (peerId: string) => {
      const stat = room.stats.get(peerId)
      if (stat) {
        console.log(stat.displayName)
      }
      dispatch(removeStream(peerId))
    })
    currentRoom.on('data', ({ src, data }) => {
      const { type, payload } = data
      switch (type) {
        case 'stat':
          const stat = payload as RoomStat
          if (!room.stats.get(src)) {

          }
          dispatch(setRoomStat(src, stat))
          break;
        default:
          console.log("through default ...")
          break;
      }
    })
  }, [dispatch])

  const getPeer = useCallback(async () => {
    const peer = await initPeer().catch(err => {
      if (err.type === 'unavailable-id') {
        throw dispatch(handleError(new Error("もしかしたら、他のデバイスまたはブラウザでビデオチャットを開いているかもしれません。閉じてから再度お試しください。")))
      } else {
        throw dispatch(handleError(err))
      }
    })
    dispatch(load(peer))
  }, [dispatch])

  return (
    <>
    </>
  )
}

export default RTCsettings

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  })
)
