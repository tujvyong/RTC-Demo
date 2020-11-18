import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserDevices, getUserAudioTrack, getUserVideoTrack } from "../utils/webrtc"
import { isiOS, isChrome } from "../utils/config"
import { handleError } from "../store/ui/actions"
import {
  setAudioTrack,
  setAudioDevices,
  setVideoTrack,
  setVideoDevices,
  releaseVideoDevice,
} from "../store/media/actions";

interface Props {

}

const Bootstrap: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch()

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

  useEffect(() => {
    enableUserAudio()
    enableUserVideo()
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Bootstrap
