import React, { useRef, useEffect, memo } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

interface Props {
  stream: MediaStream
  isReverse?: boolean
  isVideoOnly?: boolean
}

const Video: React.FC<Props> = ({ stream, isReverse = false, isVideoOnly = false }) => {
  const classes = useStyles()
  const isNoVideo = stream.getVideoTracks().length === 0
  const isNoAudio = stream.getAudioTracks().length === 0
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const $video = videoRef.current
    if (isNoVideo || $video === null) {
      return;
    }

    $video.srcObject !== stream && ($video.srcObject = stream)
    $video.paused && $video.play()
  }, [isNoVideo, videoRef, stream])

  useEffect(() => {
    const $audio = audioRef.current;
    if (isNoAudio || isVideoOnly || $audio === null) {
      return;
    }

    $audio.srcObject !== stream && ($audio.srcObject = stream);
    $audio.paused && $audio.play();
  }, [isNoAudio, isVideoOnly, audioRef, stream])

  return (
    <>
      {isNoVideo ? null : (
        <video
          className={classes.videoStyle}
          style={{ transform: 'scaleX(-1)' }}
          playsInline
          muted={true}
          ref={videoRef}
        />
      )}
      {isVideoOnly || isNoAudio ? null : (
        <audio style={{ display: 'none' }} ref={audioRef} />
      )}
    </>
  )
}

export default memo(Video)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    videoStyle: {
      borderRadius: 'inherit',
      width: '100%',
      height: '100%',
      verticalAlign: 'bottom',
    },
  })
)

