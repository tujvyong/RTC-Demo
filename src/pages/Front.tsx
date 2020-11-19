import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Typography, Grid, TextField } from '@material-ui/core'

interface Props {

}

const Front: React.FC<Props> = () => {
  const [name, setName] = useState("")
  let history = useHistory()

  const moveToChannel = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      history.push(`/${name}`)
    }
  }

  return (
    <Container maxWidth="md">
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: 'calc(100vh - 32px)' }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            color="textPrimary"
            gutterBottom
          >
            Welcome to Web RTC!
          </Typography>
          <TextField
            autoFocus
            fullWidth
            placeholder="Please input Channel Name"
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            onKeyDown={moveToChannel}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Front
