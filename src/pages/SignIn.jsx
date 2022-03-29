import { useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export const SignIn = () => {
  const [userData, setUserData] = useState({ email: "", password: "" })
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const { data } = await axios.get(`http://localhost:3001/users?email=${userData.email}&password=${userData.password}`)
      if (data.length === 1) {
        localStorage.setItem("user", JSON.stringify(data[0]))
        setUser(userData)
        return navigate('/')
      }
      console.log('email o contraseña incorrecta')
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 22 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Ingreso
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Correo"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
                value={userData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleInputChange}
                value={userData.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-up" variant="body2">
                ¿No tienes una cuenta? Regístrate
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}