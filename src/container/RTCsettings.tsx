import React, { useState, useEffect, useCallback } from 'react'
import { SfuRoom, RoomStream } from "skyway-js"
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { initPeer } from "../utils/skyway";
import { handleError } from "../store/ui/actions"
import { RootStore } from "../store";
import { MediaConfig } from "../utils/types";
import {
  load,
  joinedRoom,
  addStream,
  removeStream,
  cleanUpRoom,
} from "../store/room/actions";
import { useParams } from 'react-router-dom';
import Entrance from '../pages/Entrance';
import Room from "../pages/Room";
import Bootstrap from './Bootstrap';
import Loading from "../components/Loading";

interface Props {

}

const RTCsettings: React.FC<Props> = () => {
  const { roomName } = useParams<{ roomName: string }>()

  const dispatch = useDispatch()
  const [configs, setConfigs] = useState<MediaConfig>({
    video: true,
    mic: true,
    settings: false
  })
  const { room, media } = useSelector((state: RootStore) => state)

  const onCallRoom = useCallback(() => {
    if (room.peer === null) {
      dispatch(handleError(new Error("Peer is not created")))
      return
    }
    const currentRoom = room.peer.joinRoom<SfuRoom>(roomName, {
      mode: 'sfu',
      stream: media.stream
    })

    // receive behavior
    currentRoom.on('open', () => {
      dispatch(joinedRoom(currentRoom))
    })
    currentRoom.on('stream', (stream: RoomStream) => {
      dispatch(addStream(stream))
    })
    currentRoom.on('peerLeave', (peerId: string) => {
      dispatch(removeStream(peerId))
    })
    currentRoom.once('close', () => {
      try {
        currentRoom.removeAllListeners();
        dispatch(cleanUpRoom())
      } catch (err) {
        dispatch(handleError(err))
      }
    })
  }, [dispatch, room, media, roomName])

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

  useEffect(() => {
    getPeer()
  }, [])

  let content
  if (!room.isReady || media.audioInDevices.length === 0 || media.videoInDevices.length === 0) {
    content = (<Loading />)
  } else {
    if (room.isJoined) {
      content = (<Room configs={configs} setConfigs={setConfigs} />)
    } else {
      content = (
        <Entrance
          configs={configs}
          setConfigs={setConfigs}
          onCallRoom={onCallRoom}
        />
      )
    }
  }

  return (
    <Bootstrap>
      {content}
    </Bootstrap>
  )
}

export default RTCsettings
