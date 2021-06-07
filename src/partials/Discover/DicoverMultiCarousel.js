import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import * as Icons from "phosphor-react";
import data from "../../Data/Discover/3D";
import { MDBInput, MDBCol } from "mdbreact";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 564, min: 0 },
    items: 1,
  },
};

function DiscoverMultiCarousel(props) {
  useEffect(() => {
    console.log(props.search);
  }, []);
  return (
    <>
      {/* 3D */}
      <div className="max-w-6xl  text-center  mt-24 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div>
          <MDBCol md="12">
            <MDBInput
              hint="Search..."
              type="text"
              style={{
                borderTop: "none",
                borderRight: "none",
                borderLeft: "none",
              }}
              containerClass="active-pink active-pink-2 mt-0 mb-3"
            />
          </MDBCol>
        </div>
      </div>
      <div className="text-center pt-4">
        <span className="font-extrabold">Trending Tags</span>
      </div>

      <div className="max-w-6xl    mt-24 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div>
          <div className="mb-3 ml-3">
            <span>#3d</span>
          </div>
          <div className="container ml-1">
            <Carousel responsive={responsive}>
              {data.map((d, key) => {
                return d.video ? (
                  <a href="#">
                    <video width="348" height="348" autoPlay muted loop>
                      <source src={d.src} type="video/mp4" />
                    </video>
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "20px",
                      }}
                    >
                      <Icons.VideoCamera
                        size={20}
                        color="white"
                        weight="fill"
                      />
                    </div>
                  </a>
                ) : (
                  <a href="#">
                    <img
                      src={d.src}
                      style={{ width: "348px", height: "348px" }}
                    />
                  </a>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>

      {/* surreal */}

      <div className="max-w-6xl mt-24 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div>
          <div className="mb-3 ml-3">
            <span>#surreal</span>
          </div>
          <div className="container ml-1">
            <Carousel responsive={responsive}>
              {data.map((d, key) => {
                return d.video ? (
                  <div>
                    <video width="348" height="348" autoPlay muted loop>
                      <source src={d.src} type="video/mp4" />
                    </video>

                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "20px",
                      }}
                    >
                      <Icons.VideoCamera
                        size={20}
                        color="white"
                        weight="fill"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      src={d.src}
                      style={{ width: "348px", height: "348px" }}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
      {/* animation */}

      <div className="max-w-6xl mt-24 mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div>
          <div className="mb-3 ml-3">
            <span>#animation</span>
          </div>
          <div className="container ml-1">
            <Carousel responsive={responsive}>
              {data.map((d, key) => {
                return d.video ? (
                  <div>
                    <video width="348" height="348" autoPlay muted loop>
                      <source src={d.src} type="video/mp4" />
                    </video>
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "20px",
                      }}
                    >
                      <Icons.VideoCamera
                        size={20}
                        color="white"
                        weight="fill"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      src={d.src}
                      style={{ width: "348px", height: "348px" }}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
export default DiscoverMultiCarousel;
