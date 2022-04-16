import { Link } from 'react-router-dom'
import './StylistCard.css'

export const StylistCard = ({ stylist }) => {
    const { id, firstName, lastName } = stylist

    return (
        <li className='stylistCard__card'>
            <Link to={`/profile/${id}`}>
                <div>{`${firstName} ${lastName}`}</div>
            </Link>
        </li>
    )
}
