import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth'
import { Spinner } from '../components/Spinner/Spinner'
import { notifyCancelEdit, notifySuccessEdit, notifyError } from '../utils/ToastOptions'
import axios from 'axios'
import ProfilePlaceHolder from '../assets/ProfilePlaceHolder.png'
import styles from '../styles/Profile.module.css'

export const Profile = () => {
    const { userId } = useParams()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [userEdited, setUserEdited] = useState()
    const { user, setUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setUserData(user)
            if (!user || user.id !== userId) {
                try {
                    const { data } = await axios.get(`http://localhost:3001/users?id=${userId}`)
                    if (data.length === 0) setUserData(null)
                    else {
                        setUserData(data[0])
                        setUserEdited(data[0])
                    }
                } catch (error) {
                    notifyError()
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

    const handleEdit = async e => {
        if (e.target.id === 'confirmButton') {
            try {
                await axios.put(`http://localhost:3001/users/${userId}`, userEdited)
                notifySuccessEdit()
            } catch (error) {
                notifyError()
                console.log(error)
            }
        } else {
            notifyCancelEdit()
        }
        setIsEditing(false)
    }

    const handleChanges = e => {
        setUserEdited({ ...userEdited, [e.target.name]: e.target.value })
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
                                            <strong>Servicios:</strong> {new Intl.ListFormat('es').format(userData?.services)}
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
                                <input
                                    className={styles.form__input}
                                    type="text" name='firstName'
                                    placeholder={`${userData?.firstName}`}
                                    value={userEdited?.firstName}
                                    onChange={handleChanges}
                                />
                                <input
                                    className={styles.form__input}
                                    type="text" name='lastName'
                                    placeholder={`${userData?.lastName}`}
                                    value={userEdited?.lastName}
                                    onChange={handleChanges}
                                />
                                <p>
                                    <strong>Contacto:</strong> <input className={styles.form__input} type="text" name='email' placeholder={userData?.email} value={userEdited?.email} onChange={handleChanges} />
                                </p>
                                <p>
                                    <strong>Tipo:</strong> {userData?.role === 'client' ? 'Cliente' : 'Estilista'}
                                </p>
                                {
                                    userData?.role === 'stylist' &&
                                    <div>
                                        <p>
                                            <strong>Servicios:</strong> {new Intl.ListFormat('es').format(userData?.services)}
                                        </p>
                                    </div>
                                }
                                {/* <div>
                                        <div style={{ width: 250 }}>
                                            <Select
                                                isMulti
                                                closeMenuOnSelect={false}
                                                options={serviceOptions}
                                                placeholder='Servicios'
                                                noOptionsMessage={() => 'No hay mas servicios'}
                                            />
                                        </div>
                                    </div> */}
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
