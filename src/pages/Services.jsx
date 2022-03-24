import image_01 from '../assets/image_01.jpg'
import image_05 from '../assets/image_05.jpg'
import image_06 from '../assets/image_06.jpg'
import { Hero } from '../components/Hero/Hero'
import { Slider } from '../components/Slider/Slider'

export const Services = () => {
  return (
    <div>
      <Hero imageSrc={image_01} title={'Servicios'}/>
      <Slider imageSrc={image_05} title={'Basic text'} subtitle={'Basic subtitle'} />
      <Slider imageSrc={image_06} title={'Basic text'} subtitle={'Basic subtitle'} flipped={true} />
    </div>
  )
}