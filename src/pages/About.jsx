import image_01 from '../assets/image_01.jpg'
import image_04 from '../assets/image_04.png'
import image_05 from '../assets/image_05.jpg'
import { Hero } from '../components/Hero/Hero'
import { Slider } from '../components/Slider/Slider'

export const About = () => {
  return (
    <div>
      <Hero imageSrc={image_01} title={'Nosotros'}/>
      <Slider imageSrc={image_04} title={'Basic text'} subtitle={'Basic subtitle'} />
      <Slider imageSrc={image_05} title={'Basic text'} subtitle={'Basic subtitle'} flipped={true} />
    </div>
  )
}