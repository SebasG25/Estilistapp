import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth'
import ProfilePlaceHolder from '../assets/ProfilePlaceHolder.png'

export const Profile = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const { setUser } = useAuth()

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user')))
    }, [userId])

    const handleCloseSesion = () => {
        setUser({})
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}
        >
            <h1 style={{ textAlign: 'center', marginTop: 150 }}>Este es el id del usuario: {userId}</h1>
            <div className="imageContainer" style={{ marginTop: 20 }}>
                <img src={ProfilePlaceHolder} alt="" width={150} height={150} style={{ borderRadius: '20px' }} />
            </div>
            <div className="detailsContainer">
                Detalles del perfil
            </div>
            {
                userData?.id === userId &&
                <div>
                    <button onClick={handleCloseSesion}>Cerrar sesión</button>
                </div>
            }
        </div>
    )
}
