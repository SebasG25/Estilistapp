import { useEffect } from 'react';
import { useParams } from 'react-router';

export const Profile = () => {

    const { userId } = useParams()

    return (
        <h1 style={{textAlign: 'center', marginTop: 150}}>Este es el id del usuario: {userId}</h1>
    )
}
