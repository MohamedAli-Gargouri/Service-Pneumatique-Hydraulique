import { Carousel } from '@material-tailwind/react';
import slider1 from '../../assets/images/carousel/slider1.png';
import slider2 from '../../assets/images/carousel/slider2.png';
import slider3 from '../../assets/images/carousel/slider3.png';
import slider4 from '../../assets/images/carousel/slider4.png';
import slider5 from '../../assets/images/carousel/slider5.png';
import slider6 from '../../assets/images/carousel/slider6.png';
export default function CarouselCustomNavigation() {
  return (
    <Carousel
      transition={{ duration: 2 }}
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
      className=" w-full h-full rounded-md "
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className=" relative bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill('').map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src={slider1}
        alt="image 1"
        className="h-full w-full aspect-video rounded-md mx-2"
      />
      <img
        src={slider2}
        alt="image 2"
        className="h-full w-full aspect-video rounded-md"
      />
      <img
        src={slider3}
        alt="image 3"
        className="h-full w-full aspect-video rounded-md"
      />
      <img
        src={slider4}
        alt="image 3"
        className="h-full w-full aspect-video rounded-md"
      />
      <img
        src={slider5}
        alt="image 3"
        className="h-full w-full aspect-video rounded-md"
      />
      <img
        src={slider6}
        alt="image 3"
        className="h-full w-full aspect-video rounded-md"
      />
    </Carousel>
  );
}
