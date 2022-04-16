import { StylistGrid } from '../components/StylistGrid/StylistGrid'
import { useSearchParams } from 'react-router-dom'

export const FindStylist = () => {
    const [query] = useSearchParams()
    const filter = query.get('filter')

    return (
        <div style={{marginTop: 120}}>
            <StylistGrid filter={filter} />
        </div>
    )
}
