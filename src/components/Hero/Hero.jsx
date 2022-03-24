import './Hero.css'

export const Hero = ({ imageSrc, title }) => {
  return (
    <div className="hero">
      <img src={imageSrc} alt="hair-stylist" className="hero__image" />
      <h1 className="hero__title">{title}</h1>
    </div>
  )
}
