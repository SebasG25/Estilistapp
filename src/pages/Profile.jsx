import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth'
import { Spinner } from '../components/Spinner/Spinner'
import { categoryOptions, serviceOptions } from '../utils/SelectOptions'
import axios from 'axios'
import ProfilePlaceHolder from '../assets/ProfilePlaceHolder.png'
import styles from '../styles/Profile.module.css'
import Select from 'react-select'

export const Profile = () => {
    const { userId } = useParams()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
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

    const handleEditButton = () => {
        setIsEditing(true)
    }

    const handleEdit = e => {
        if (e.target.id === 'confirmButton') {
            console.log('Cambios confirmados')
        } else {
            console.log('Cambios cancelados')
        }
        setIsEditing(false)
    }

    if (isLoading) return <Spinner />;

    return (
        <div>
            {
                userData ?
                    !isEditing ?
                        <div className={styles.mainContainer}>
                            <div className="imageContainer" style={{ marginTop: 120 }}>
                                <img
                                    src={ProfilePlaceHolder}
                                    alt='user-profile'
                                    width={150}
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
                                {
                                    userData?.role === 'stylist' &&
                                    <div>
                                        <p>
                                            <strong>Categorias:</strong>
                                        </p>
                                        <p>
                                            <strong>Servicios:</strong>
                                        </p>
                                    </div>
                                }
                            </div>
                            {
                                user?.id === userId ?
                                    <div>
                                        <div
                                            className={styles.editButton}
                                            onClick={handleEditButton}
                                        >
                                            Editar perfil
                                        </div>
                                        <div
                                            className={styles.closeSesionBtn}
                                            onClick={handleCloseSesion}
                                        >
                                            Cerrar sesión
                                        </div>
                                    </div>
                                    : userData?.role === 'stylist' &&
                                    <div>
                                        <div
                                            className={styles.closeSesionBtn}
                                            onClick={() => navigate('schedule')}
                                        >
                                            Reservar con el estilista
                                        </div>
                                    </div>
                            }
                        </div>
                        : <div className={styles.mainContainer}> {/*Editing*/}
                            <div className="imageContainer" style={{ marginTop: 120 }}>
                                <img
                                    src={ProfilePlaceHolder}
                                    alt='user-profile'
                                    width={150}
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
                                {
                                    user?.role === 'stylist' &&
                                    <div>
                                        <div style={{ width: 250, marginBottom: 15 }}>
                                            <Select
                                                isMulti
                                                closeMenuOnSelect={false}
                                                options={categoryOptions}
                                                placeholder='Categorias'
                                                noOptionsMessage={() => 'No hay mas categorías'}
                                            />
                                        </div>

                                        <div style={{ width: 250 }}>
                                            <Select
                                                isMulti
                                                closeMenuOnSelect={false}
                                                options={serviceOptions}
                                                placeholder='Servicios'
                                                noOptionsMessage={() => 'No hay mas servicios'}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            {
                                <div>
                                    <div
                                        className={styles.confirmEdit}
                                        id='confirmButton'
                                        onClick={handleEdit}
                                    >
                                        Confirmar
                                    </div>
                                    <div
                                        className={styles.cancelEdit}
                                        id='cancelButton'
                                        onClick={handleEdit}
                                    >
                                        Cancelar
                                    </div>
                                </div>
                            }
                        </div>
                    : <h1 style={{ textAlign: 'center', marginTop: 150 }}>No se encontró un usuario</h1>
            }
        </div>
    )
}
