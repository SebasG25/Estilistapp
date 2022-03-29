import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth'
import { Spinner } from '../components/Spinner/Spinner'
import axios from 'axios'
import ProfilePlaceHolder from '../assets/ProfilePlaceHolder.png'

export const Profile = () => {
    const { userId } = useParams()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setUserData(user)
            if (!user || user.id !== userId) {
                try {
                    const { data } = await axios.get(`http://localhost:3001/users?id=${userId}`)
                    data.length === 0 ? setUserData(null) : setUserData(data[0])
                } catch (error) {
                    console.log(error)
                }
            }
            setIsLoading(false)
        }

        fetchData()
    }, [userId, user])

    const handleCloseSesion = () => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('/')
    }

    if (isLoading) return <Spinner />;

    return (
        <div>
            {
                userData ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <div className="imageContainer" style={{ marginTop: 120 }}>
                            <img src={ProfilePlaceHolder} alt="" width={150} height={150} style={{ borderRadius: '20px' }} />
                        </div>
                        <div className="profileName">
                            <h3>{userData.firstName} {userData.lastName}</h3>
                        </div>
                        <div className="detailsContainer">
                            Detalles del perfil
                        </div>
                        {
                            user?.id === userId &&
                            <div>
                                <button onClick={handleCloseSesion}>Cerrar sesión</button>
                            </div>
                        }
                    </div>
                    : <h1 style={{ textAlign: 'center', marginTop: 150 }}>No existe un usuario con id: {userId}</h1>
            }
        </div>
    )
}
