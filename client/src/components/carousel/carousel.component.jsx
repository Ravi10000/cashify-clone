import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ImagesCarousel({ images }) {
  return (
    <Carousel
      emulateTouch
      useKeyboardArrows
      showStatus={false}
      showArrows={false}
    >
      {images?.map((image, index) => (
        <img src={image?.url} alt="device" key={index} />
      ))}
    </Carousel>
  );
}
