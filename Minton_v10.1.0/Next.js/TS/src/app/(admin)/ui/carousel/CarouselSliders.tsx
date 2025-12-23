"use client"
import  React, { useState } from "react";
import Image from "next/image";
import { Carousel } from "react-bootstrap";

import small1 from "@/assets/images/small/img-1.jpg"
import small2 from "@/assets/images/small/img-2.jpg"
import small3 from "@/assets/images/small/img-3.jpg"

const DefaultSlides = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Slides only</h4>
        <p className="sub-header">
          Here’s a carousel with slides only. Note the presence of the{" "}
          <code>.d-block</code> and <code>.img-fluid</code> on carousel images
          to prevent browser default image alignment.
        </p>

        <Carousel indicators={false} controls={false}>
          <Carousel.Item>
            <Image
              className="d-block img-fluid"
              src={small1.src}
              alt="First slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block img-fluid"
              src={small2.src}
              alt="Second slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block img-fluid"
              src={small3.src}
              alt="Third slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

const SlidesWithControls = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">With controls</h4>
        <p className="text-muted font-14">
          Adding in the previous and next controls:
        </p>
        <Carousel indicators={false}>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small1.src}
              alt="First slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small2.src}
              alt="Second slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small3.src}
              alt="Third slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

const SlidesWithIndicators = () => {
  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">With indicators</h4>
        <p className="text-muted font-14">
          You can also add the indicators to the carousel, alongside the
          controls, too.
        </p>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small1.src}
              alt="First slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small2.src}
              alt="Second slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small3.src}
              alt="Third slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

const SlidesWithCaptions = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">With captions</h4>
        <p className="text-muted font-14">
          Add captions to your slides easily with the{" "}
          <code>.carousel-caption</code> element within any{" "}
          <code>.carousel-item</code>.
        </p>
        <Carousel indicators={false}>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small1.src}
              alt="First slide"
              width={900}
              height={600}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small2.src}
              alt="Second slide"
              width={900}
              height={600}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small3.src}
              alt="Third slide"
              width={900}
              height={600}
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

const CrossFade = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Crossfade</h4>
        <p className="text-muted font-14">
          Add <code>.carousel-fade</code> to your carousel to animate slides
          with a fade transition instead of a slide.
        </p>
        <Carousel fade indicators={false}>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small1.src}
              alt="First slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small2.src}
              alt="Second slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small3.src}
              alt="Third slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

const IndividualInterval = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title">Individual interval</h4>
        <p className="text-muted font-14">
          Add <code>data-bs-interval=&quot;&quot;</code> to a <code>.carousel-item</code>{" "}
          to change the amount of time to delay between automatically cycling to
          the next item.
        </p>
        <Carousel fade indicators={false}>
          <Carousel.Item interval={1000}>
            <Image
              className="d-block w-100"
              src={small1.src}
              alt="First slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <Image
              className="d-block w-100"
              src={small2.src}
              alt="Second slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src={small3.src}
              alt="Third slide"
              width={900}
              height={600}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};
const CarouselSliders = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <DefaultSlides />
        </div>

        <div className="col-lg-6">
          <SlidesWithControls />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <SlidesWithIndicators />
        </div>
        <div className="col-lg-6">
          <SlidesWithCaptions />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <CrossFade />
        </div>
        <div className="col-lg-6">
          <IndividualInterval />
        </div>
      </div>
    </>
  )
}

export default CarouselSliders