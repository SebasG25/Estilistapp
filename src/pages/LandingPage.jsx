import image_01 from '../assets/image_01.jpg'
import image_02 from '../assets/image_02.jpg'
import image_03 from '../assets/image_03.jpg'
import { Hero } from '../components/Hero/Hero'
import { Slider } from '../components/Slider/Slider'

export const LandingPage = () => {
  return (
    <div>
      <Hero imageSrc={image_01} title={'Landing Page'}/>
      <Slider imageSrc={image_02} title={'Basic text'} subtitle={'Basic subtitle'} />
      <Slider imageSrc={image_03} title={'Basic text'} subtitle={'Basic subtitle'} flipped={true} />
    </div>
  )
}
