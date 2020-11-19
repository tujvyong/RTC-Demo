import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffOutlinedIcon from '@material-ui/icons/VideocamOffOutlined';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import CallEndIcon from '@material-ui/icons/CallEnd';
import SettingsIcon from '@material-ui/icons/Settings';

interface Props {
  title: string
  icon: string
  selected: boolean
  event?: string
  fn?: () => void
}

const ToggleBtn: React.FC<Props> = ({ title, icon, selected, event, fn }) => {
  const classes = useStyles()

  let iconNode = null
  switch (icon) {
    case "VideocamIcon":
      iconNode = <VideocamIcon />
      break;
    case "VideocamOffOutlinedIcon":
      iconNode = <VideocamOffOutlinedIcon />
      break;
    case "MicOffIcon":
      iconNode = <MicOffIcon />
      break;
    case "MicIcon":
      iconNode = <MicIcon />
      break;
    case "FullscreenIcon":
      iconNode = <FullscreenIcon />
      break;
    case "FullscreenExitIcon":
      iconNode = <FullscreenExitIcon />
      break;
    case "CallEndIcon":
      iconNode = <CallEndIcon />
      break;
    case "SettingsIcon":
      iconNode = <SettingsIcon />
      break;
    default:
      break;
  }

  return (
    <Tooltip title={title}>
      <ToggleButton
        classes={{ root: classes.rootToggle, selected: classes.selectedToggle }}
        value="check"
        selected={selected}
        color="secondary"
        onChange={fn && event === 'change' ? fn : () => { return }}
        onClick={fn && event === 'click' ? fn : () => { return }}
      >
        {iconNode}
      </ToggleButton>
    </Tooltip>
  )
}

export default ToggleBtn

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
)
