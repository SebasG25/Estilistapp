import { useState, useEffect } from 'react'
import { Nav, Wrapper, LogoContainer, NavLink, Bars, Close, NavMenu, NavBtn, NavBtnLink } from './NavbarElements.js'
import { FaReact } from 'react-icons/fa'
import { useAuth } from '../../auth/useAuth'

export const Navbar = () => {
  const [show, setShow] = useState(true)
  const [navIsOpen, setNavIsOpen] = useState(false)
  const [userData, setUserData] = useState()
  const { user } = useAuth()

  const controlNavbar = () => window.scrollY > 200 ? setShow(false) : setShow(true)

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [])

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user')))
  }, [user])

  return (
    <>
      <Nav show={show} navIsOpen={navIsOpen}>
        <Wrapper>
          <LogoContainer>
            <NavLink to='/'>
              <FaReact size='1.5rem' />
            </NavLink>
          </LogoContainer>
          {
            navIsOpen ?
              <Close onClick={() => setNavIsOpen(!navIsOpen)} />
              : <Bars onClick={() => setNavIsOpen(!navIsOpen)} />
          }
          <NavMenu navIsOpen={navIsOpen}>
            <NavLink to='/about' onClick={() => setNavIsOpen(!navIsOpen)}>
              Nosotros
            </NavLink>
            <NavLink to='/services' onClick={() => setNavIsOpen(!navIsOpen)}>
              Servicios
            </NavLink>
          </NavMenu>
          <NavBtn navIsOpen={navIsOpen} onClick={() => setNavIsOpen(!navIsOpen)}>
            {
              !userData
                ? <NavBtnLink to='/sign-in'>Ingresa</NavBtnLink>
                : <NavLink to={`profile/${userData.id}`} onClick={() => setNavIsOpen(!navIsOpen)}>Cuenta</NavLink>
            }
          </NavBtn>
        </Wrapper>
      </Nav>
    </>
  )
}
