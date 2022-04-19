import { StylistGrid } from '../components/StylistGrid/StylistGrid'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import styles from '../styles/FindStylist.module.css'

export const FindStylist = () => {
    const [query] = useSearchParams()
    const filter = query.get('filter') //TO DO

    const categoryOptions = [
        { value: 'chocolate', label: 'Categoria' },
        { value: 'strawberry', label: 'Categoria' },
        { value: 'vanilla', label: 'Categoria' }
    ]

    const serviceOptions = [
        { value: 'chocolate', label: 'Servicio' },
        { value: 'strawberry', label: 'Servicio' },
        { value: 'vanilla', label: 'Servicio' }
    ]

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
            <StylistGrid filter={filter} />
        </div>
    )
}
