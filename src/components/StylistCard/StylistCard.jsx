import { Link } from 'react-router-dom'
import ProfilePlaceHolder from '../../assets/ProfilePlaceHolder.png'
import './StylistCard.css'

export const StylistCard = ({ stylist }) => {
    const { id, firstName, lastName } = stylist

    return (
        <li className='stylistCard__card'>
            <Link to={`/profile/${id}`}>
                <div className="stylistCard__picture">
                    <img
                        className='stylistCard__image'
                        src={ProfilePlaceHolder}
                        alt='user-profile'
                        width={230}
                        height={300}
                    />
                </div>
                <div className='stylistCard__name'>{`${firstName} ${lastName}`}</div>
            </Link>
        </li>
    )
}
