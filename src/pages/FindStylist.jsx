import { useState } from 'react'
import { StylistGrid } from '../components/StylistGrid/StylistGrid'
import { categoryOptions, serviceOptions } from '../utils/SelectOptions'
import Select from 'react-select'
import styles from '../styles/FindStylist.module.css'

export const FindStylist = () => {
    const [categories, setCategories] = useState([])
    const [services, setServices] = useState([])
    const [querySearch] = useState('')

    return (
        <div style={{ marginTop: 120 }}>
            <div className={styles.selectsContainer}>
                <div style={{ width: 250 }}>
                    <Select
                        isMulti
                        closeMenuOnSelect={false}
                        options={categoryOptions}
                        placeholder='Categorias'
                        noOptionsMessage={() => 'No hay mas categorías'}
                        onChange={setCategories}
                    />
                </div>

                <div style={{ width: 250 }}>
                    <Select
                        isMulti
                        closeMenuOnSelect={false}
                        options={serviceOptions}
                        placeholder='Servicios'
                        noOptionsMessage={() => 'No hay mas servicios'}
                        onChange={setServices}
                    />
                </div>
            </div>
            <StylistGrid categories={categories} services={services} querySearch={querySearch} />
        </div>
    )
}
