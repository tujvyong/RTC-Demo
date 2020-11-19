import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Button } from '@material-ui/core'
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
      <Container>
        <div style={{ textAlign: 'center' }}>
          <Typography color="textPrimary" gutterBottom variant="body1">おっと、何か問題があるようです</Typography>
          <Typography color="textPrimary" paragraph>{ui.error.message || ui.error.name}</Typography>
          <Typography color="textPrimary" gutterBottom variant="h6">ホームに戻って、再度お試しください</Typography>
          <Button href="/" color="secondary" variant="outlined" style={{ margin: '1em' }}>ホームに戻る</Button>
        </div>
        <pre className={classes.detailStyle}>
          {ui.error.stack || "Stack trace is not available."}
        </pre>
      </Container>
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
