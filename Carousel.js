import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

/** Carousel: displays images and arrows to navigate through them
 * 
 * 
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * 
 * 
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * 
 * 
 * 
 * App --> Carousel --> Card
 */
function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);
  const total = photos.length;

  const goForward = () => {
    setCurrCardIdx((currIdx) => (currIdx + 1) % total);
  };

  const goBackward = () => {
    setCurrCardIdx((currIdx) => (currIdx - 1 + total) % total);
  };

  const currCard = photos[currCardIdx];

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {currCardIdx > 0 && (
          <i
            className="bi bi-arrow-left-circle"
            onClick={goBackward}
            data-testid="left-arrow" // Added for testing visibility
          />
        )}
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {currCardIdx < total - 1 && (
          <i
            className="bi bi-arrow-right-circle"
            onClick={goForward}
            data-testid="right-arrow" // Added for testing visibility
          />
        )}
      </div>
    </div>
  );
}

export default Carousel;
