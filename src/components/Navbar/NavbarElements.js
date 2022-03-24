import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

export const Nav = styled.nav`
    background: #000;
    height: 80px;
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
    transition: 0.7s all ease-in-out;
    transform: ${({show}) => !show && 'translateY(-100%)'};

    @media screen and (max-width: 768px) {
        position: absolute;
        width: 100%;
        height: ${({navIsOpen}) => !navIsOpen ? '80px' : '100vh'};
        justify-content: center;
        flex-direction: column;
        align-items: center;
        opacity: ${({navIsOpen}) => navIsOpen && '0.85'};;
        transition: 0.5s all ease;
    }
`

export const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;

    @media screen and (max-width: 768px) {
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
    }
`

export const LogoContainer = styled.div`
    display: block;
    left: 0;
    top: 2px;

    @media screen and (max-width: 768px) {
        position: absolute;
    }
`

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
        color: #15cdfc;
    }

    &:hover {
        color: #15cdfc;
        transform: scale(1.2); 
        transition: all 0.2s ease-in-out;
    }

    @media screen and (max-width: 768px){
        height: 10vh;
    }
`

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;
    transition: all .5s ease-in-out;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 23px;
        right: 15px;
        transform: translate()(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
        transition: all .5s ease-in-out;
    }

    &:hover {
        transform: scale(1.17);
        transition: all 0.2s ease-in-out;
    }
`

export const Close = styled(FaTimes)`
    display: none;
    color: #fff;
    transition: all .5s ease-in-out;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 23px;
        right: 15px;
        font-size: 1.8rem;
        cursor: pointer;
        transition: all .5s ease-in-out;
    }

    &:hover {
        transform: scale(1.17);
        transition: all 0.2s ease-in-out;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    transition: all .2s ease-in-out;

    @media screen and (max-width: 768px){
        visibility: ${({navIsOpen}) => !navIsOpen ? 'hidden' : 'visible'};
        flex-direction: column;
        justify-content: center;
        transition: all .1s ease-in-out;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    transition: all .2s ease-in-out;

    @media screen and (max-width: 768px){
        visibility: ${({navIsOpen}) => !navIsOpen ? 'hidden' : 'visible'};
        margin: 0;
        transition: all .1s ease-in-out;
    }
`

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`