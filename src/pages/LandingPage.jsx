import image_01 from '../assets/image_01.jpg'
import image_02 from '../assets/image_02.jpg'
import image_03 from '../assets/image_03.jpg'
import { Hero } from '../components/Hero/Hero'
import { Slider } from '../components/Slider/Slider'
import { useAuth } from '../auth/useAuth'

export const LandingPage = () => {
  const { user } = useAuth()

  return (
    <div>
      <Hero imageSrc={image_01} title={user ? `¡Hola ${user.firstName}!` : 'Estilistapp'} />
      <Slider imageSrc={image_02} title={'Basic text'} subtitle={'Basic subtitle'} />
      <Slider imageSrc={image_03} title={'Basic text'} subtitle={'Basic subtitle'} flipped={true} />
    </div>
  )
}
