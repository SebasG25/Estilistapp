import { useEffect, useState } from 'react'
import { StylistCard } from '../StylistCard/StylistCard'
import { Empty } from '../Empty/Empty'
import { Spinner } from '../Spinner/Spinner'
import axios from 'axios'
import './StylistGrid.css'

export function StylistGrid({ filteredService, querySearch }) {
    const [stylists, setStylists] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filteredStylists, setFilteredStylists] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            if (filteredService.length === 0) {

                try {
                    const { data } = await axios.get(`http://localhost:3001/users?role=stylist&q=${querySearch}`)
                    if (data.length !== 0) {
                        setStylists([...data])
                        setFilteredStylists([...data])
                    } else {
                        setStylists([])
                    }
                } catch (error) {
                    console.log(error)
                }

            } else {
                const filterStylists = stylists.filter(stylist => {
                    return stylist.services.includes(filteredService.value)
                })
                setFilteredStylists(filterStylists)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [querySearch, filteredService])

    if (!isLoading && stylists.length === 0) {
        return <Empty />;
    }

    if (isLoading) return <Spinner />

    return (
        <ul className='stylistGrid__container'>
            {filteredStylists.map(stylist => (
                <StylistCard key={stylist.id} stylist={stylist} />
            ))}
        </ul>
    )
}