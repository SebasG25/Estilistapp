import { useState } from 'react'
import { StylistGrid } from '../components/StylistGrid/StylistGrid'
import { serviceOptions } from '../utils/SelectOptions'
import Select from 'react-select'
import styles from '../styles/FindStylist.module.css'

export const FindStylist = () => {
    const [filteredService, setFilteredService] = useState([])
    const [querySearch] = useState('')

    return (
        <div style={{ marginTop: 120 }}>
            <div className={styles.selectsContainer}>
                <div style={{ width: 250 }}>
                    <Select
                        closeMenuOnSelect={false}
                        options={serviceOptions}
                        placeholder='Filtrar por servicio'
                        noOptionsMessage={() => 'No hay mas servicios'}
                        onChange={setFilteredService}
                    />
                </div>
            </div>
            <StylistGrid filteredService={filteredService} querySearch={querySearch} />
        </div>
    )
}
