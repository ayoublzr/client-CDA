import Carousel from 'react-bootstrap/Carousel';
import SLIDER_IMAGES from "./sliderImages";

import "./style.css"
function Carrousel() {
  return (
    <div className='af-height-90 af-max-width mx-auto mt-2'>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100 carousel-image'
            
            alt='First slide'
          />
          <Carousel.Caption className='position-absolute'>
            <div className='af-position-lg af-bg-dark-transparent py-3'>
              <h3>{SLIDER_IMAGES[0].title}</h3>
              <p>{SLIDER_IMAGES[0].description}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 carousel-image'
            src={SLIDER_IMAGES[1].link}
            alt='Second slide'
          />
          <Carousel.Caption className='position-absolute'>
            <div className='af-position-lg af-bg-dark-transparent py-3'>
              <h3>{SLIDER_IMAGES[1].title}</h3>
              <p>{SLIDER_IMAGES[1].description}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 carousel-image'
            src={SLIDER_IMAGES[2].link}
            alt='Third slide'
          />
          <Carousel.Caption className='position-absolute'>
            <div className='af-position-lg af-bg-dark-transparent py-3'>
              <h3>{SLIDER_IMAGES[2].title}</h3>
              <p>{SLIDER_IMAGES[2].description}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carrousel;
