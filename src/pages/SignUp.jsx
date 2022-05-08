import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { notifySuccess, notifyError, notifyWarning } from '../utils/ToastOptions'
import axios from 'axios'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

export const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  })
  const [checkboxValue, setCheckboxValue] = useState(false)
  const navigate = useNavigate()

  const postData = async () => {
    if (checkboxValue) {
      try {
        const { data } = await axios.get(`http://localhost:3001/users?email=${userInfo.email}`)
        if (data.length === 0) {
          try {
            await axios.post('http://localhost:3001/users', userInfo)
            await notifySuccess()
            navigate('/')
          } catch (error) {
            notifyError()
            console.log(error)
          }
        } else {
          notifyWarning('El correo no está disponible')
        }
      } catch (error) {
        notifyError()
        console.log(error)
      }
    } else {
      notifyWarning('Debes aceptar los términos y condiciones para registrarte')
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    postData()
  }

  const handleInputChange = event => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }

  const handleCheckboxChange = event => {
    setCheckboxValue(event.target.checked)
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
          Registro
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                value={userInfo.firstName}
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="select-label">Tipo *</InputLabel>
                <Select
                  sx={{ minWidth: 410 }}
                  labelId="select-label"
                  id="select-required"
                  value={userInfo.role}
                  label="Tipo de usuario *"
                  name="role"
                  onChange={handleInputChange}
                >
                  <MenuItem value={'client'}>Cliente</MenuItem>
                  <MenuItem value={'stylist'}>Estilista</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={userInfo.password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={checkboxValue}
                    color="primary"
                    onChange={handleCheckboxChange}
                  />}
                label="Estoy de acuerdo con los términos y condiciones"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2">
                ¿Ya tienes una cuenta? Ingresa
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}