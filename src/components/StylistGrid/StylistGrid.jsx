import { useEffect, useState } from 'react'
import { StylistCard } from '../StylistCard/StylistCard'
import { Empty } from '../Empty/Empty'
import { Spinner } from '../Spinner/Spinner'
import axios from 'axios'
import './StylistGrid.css'

export function StylistGrid({ filter }) {
    const [stylists, setStylists] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const { data } = await axios.get(`http://localhost:3001/users?role=stylist`)
                data.length !== 0 && setStylists([ ...data])
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [filter])

    if (!isLoading && stylists.length === 0) {
        return <Empty />;
    }

    if (isLoading) return <Spinner />

    return (
        <ul className='stylistGrid__container'>
            {stylists.map(stylist => (
                <StylistCard key={stylist.id} stylist={stylist} />
            ))}
        </ul>
    )
}