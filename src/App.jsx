import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { LandingPage } from './pages/LandingPage'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Profile } from './pages/Profile'
import { NotFoundPage } from './pages/NotFoundPage'
import { FindStylist } from './pages/FindStylist'
import { StylistSchedule } from './pages/StylistSchedule'
import { AuthProvider } from './auth/AuthProvider'
import { ToastContainer } from 'react-toastify'

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/find-stylist' element={<FindStylist />} />
          <Route path='/profile/:userId/schedule' element={<StylistSchedule />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit={2} />
    </AuthProvider>
  )
}

export default App
