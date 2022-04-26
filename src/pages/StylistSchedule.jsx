import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner/Spinner'
import { getWindowDimensions } from '../utils/getWindowDimensions'
import { serviceOptions } from '../utils/SelectOptions'
import Select from 'react-select'
import styles from '../styles/StylistSchedule.module.css'
import axios from 'axios'

export const StylistSchedule = () => {
  const { userId } = useParams()
  const [userScheduleData, setUserScheduleData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
  const [isLoading, setIsLoading] = useState(true)
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const fetchSchedulesData = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`http://localhost:3001/schedules?id=${userId}`)
        data.length === 0 ? setUserScheduleData(null) : setUserScheduleData(data[0])
        const { data: userResponse } = await axios.get(`http://localhost:3001/users?id=${userId}`)
        if (userResponse.length === 0) {
          setUserData(null)
        } else {
          setUserData(userResponse[0])
        }
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchSchedulesData()
  }, [userId])

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowDimensions]);

  const onDropDownChange = ({ label }) => {
    setBooking({ ...booking, service: label })
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.schedulesContainer}>
        <h1 style={{ margin: 120 }}>Horarios del estilista: {userData?.firstName} {userData?.lastName}</h1>
        {
          isLoading ? <Spinner />
            :
            userScheduleData?.schedule ?
              <div className={styles.insideContainer}>
                <ul className={styles.schedulesGrid}>
                  {userScheduleData.schedule.map(sch => (
                    <li
                      className={styles.scheduleTime}
                      key={sch}
                      onClick={() => setBooking({ schedule: sch })}>
                      {sch}
                    </li>
                  ))}
                </ul>
                <div className={styles.selectsContainer}>
                  <div style={{ width: 250 }}>
                    <Select
                      closeMenuOnSelect={true}
                      options={serviceOptions}
                      placeholder={
                        !booking?.hasOwnProperty('schedule') ? 'Escoge un horario primero'
                          : 'Servicios'
                      }
                      noOptionsMessage={() => 'No hay mas servicios'}
                      onChange={onDropDownChange}
                      isDisabled={!booking?.hasOwnProperty('schedule')}
                    />
                  </div>
                </div>
              </div>
              :
              <div>
                <h1>No hay horarios encontrados</h1>
              </div>
        }
      </div>
      {windowDimensions.width > 700 ? <hr style={{ height: '100vh' }} /> : <hr style={{ width: '100vw', marginTop: 35 }} />}
      <div className={styles.invoidContainer}>
        <h1 style={{ margin: (windowDimensions.width > 700) ? 120 : 40 }}>Facturación</h1>
        {
          booking?.hasOwnProperty('schedule') &&
          <div>
            <p><b>Estilista:</b> {userData?.firstName} {userData?.lastName}</p>
            <p><b>Horario:</b> {booking.schedule}</p>
            {
              booking?.hasOwnProperty('service') &&
              <div>
                <p><b>Servicio: </b>{booking.service}</p>
                <p><b>Total a pagar: </b>$$</p>
                <div
                  className={styles.payButton}
                  style={{ marginTop: 20 }}
                  onClick={() => console.log('Pago')}
                >
                  Proceder al pago
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}
