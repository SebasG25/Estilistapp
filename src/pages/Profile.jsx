import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth'
import { Spinner } from '../components/Spinner/Spinner'
import axios from 'axios'
import ProfilePlaceHolder from '../assets/ProfilePlaceHolder.png'
import styles from '../styles/Profile.module.css'

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
                    <div className={styles.mainContainer}>
                        <div className="imageContainer" style={{ marginTop: 120 }}>
                            <img
                                src={ProfilePlaceHolder}
                                alt='user-profile' width={150}
                                height={150}
                                style={{
                                    borderRadius: '20px',
                                    backgroundColor: 'azure'
                                }}
                            />
                        </div>
                        <div className={styles.detailsContainer}>
                            <h3 className={styles.profileName}>{userData?.firstName} {userData?.lastName}</h3>
                            <p>
                                <strong>Contacto:</strong> {userData?.email}
                            </p>
                            <p>
                                <strong>Tipo:</strong> {userData?.role === 'client' ? 'Cliente' : 'Estilista'}
                            </p>
                        </div>
                        {
                            user?.id === userId &&
                            <div>
                                <div
                                    className={styles.closeSesionBtn}
                                    onClick={handleCloseSesion}
                                >
                                    Cerrar sesión
                                </div>
                            </div>
                        }
                    </div>
                    : <h1 style={{ textAlign: 'center', marginTop: 150 }}>No se encontró un usuario</h1>
            }
        </div>
    )
}
