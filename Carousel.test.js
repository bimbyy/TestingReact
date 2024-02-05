import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js"; // Make sure this import points to your test images

describe("Carousel component", () => {
  // Smoke test to check if the component renders without crashing
  it("renders without crashing", () => {
    render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
  });

  // Snapshot test to check if the rendering matches the snapshot
  it("matches snapshot", () => {
    const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Existing functionality test for clicking the right arrow
  it("works when you click on the right arrow", function() {
    const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
    
    // Expect the first image to show, but not the second
    expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
    expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();

    // Move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // Expect the second image to show, but not the first
    expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
    expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
  });

  it("moves to the previous image when the left arrow is clicked", function() {
    const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
    
    // Move forward first to get to the second image
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);
    
    // Now, click the left arrow to attempt to go back to the first image
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);
    
    // Expect the first image to show again
    expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
    expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
  });

  
  describe("Arrow visibility tests", () => {
    it("hides the left arrow when on the first image", function() {
      const { queryByTestId } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
      
      // The left arrow should not be present on the first image
      expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
    });
  
    it("hides the right arrow when on the last image", function() {
      const { queryByTestId, getByTestId } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
      
      // Move to the last image
      TEST_IMAGES.forEach(() => {
        fireEvent.click(getByTestId("right-arrow"));
      });
  
      // The right arrow should not be present on the last image
      expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
    });
  });
});
