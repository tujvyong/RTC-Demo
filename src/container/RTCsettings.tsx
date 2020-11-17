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
  addStream,
  removeStream,
  // setRoomStat,
} from "../store/room/actions";
// import { RoomStat } from "../store/room/types"
import { useParams } from 'react-router-dom';
import Entrance from '../components/Entrance';
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
  const { room, media, ui } = useSelector((state: RootStore) => state)

  const onCallRoom = useCallback(() => {
    if (room.peer === null) {
      dispatch(handleError(new Error("Peer is not created")))
      return
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
      // const stat = room.stats.get(peerId)
      // if (stat) {
      //   console.log(stat.displayName)
      // }
      dispatch(removeStream(peerId))
    })
    // currentRoom.on('data', ({ src, data }) => {
    //   const { type, payload } = data
    //   switch (type) {
    //     case 'stat':
    //       const stat = payload as RoomStat
    //       if (!room.stats.get(src)) {

    //       }
    //       dispatch(setRoomStat(src, stat))
    //       break;
    //     default:
    //       console.log("through default ...")
    //       break;
    //   }
    // })
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

  useEffect(() => {
    getPeer()
  }, [])

  let content
  if (!room.isReady || media.audioInDevices.length === 0 || media.videoInDevices.length === 0) {
    content = (<Loading />)
  } else {
    if (room.isJoined) {
      // content = (<Room />)
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
