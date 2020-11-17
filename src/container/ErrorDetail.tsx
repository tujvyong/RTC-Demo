import React, { useState, useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import { RootStore } from '../store';
import { useSelector } from 'react-redux';

interface Props {

}

const ErrorDetail: React.FC<Props> = ({ children }) => {
  const classes = useStyles()
  const ui = useSelector((state: RootStore) => state.ui)

  let content;
  if (ui.error !== null) {
    content = (
      <>
        <Typography gutterBottom variant="body1" color="error">おっと、何か問題があるようです</Typography>
        <Typography paragraph>{ui.error.message || ui.error.name}</Typography>
        <Typography gutterBottom variant="h6">ホームに戻って、再度お試しください</Typography>
        <Button href="/" color="secondary" variant="outlined" style={{ margin: '1em' }}>ホームに戻る</Button>
        <pre className={classes.detailStyle}>
          {ui.error.stack || "Stack trace is not available."}
        </pre>
      </>
    )
  } else {
    content = children
  }

  return (
    <>
      {content}
    </>
  )
}

export default ErrorDetail

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailStyle: {
      whiteSpace: 'pre-wrap',
      color: theme.palette.grey[500],
      fontSize: '10px',
      textAlign: 'right',
    },
  })
)
