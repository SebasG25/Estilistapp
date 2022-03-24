import { useState, useEffect } from 'react'
import { Nav, Wrapper, LogoContainer, NavLink, Bars, Close, NavMenu, NavBtn, NavBtnLink } from './NavbarElements.js'
import { FaReact } from 'react-icons/fa'

export const Navbar = () => {
  const [show, setShow] = useState(true)
  const [navIsOpen, setNavIsOpen] = useState(false)

  const controlNavbar = () => window.scrollY > 200 ? setShow(false) : setShow(true)

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [])

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
            <NavBtnLink to='/sign-in'>Ingresa</NavBtnLink>
          </NavBtn>
        </Wrapper>
      </Nav>
    </>
  )
}
