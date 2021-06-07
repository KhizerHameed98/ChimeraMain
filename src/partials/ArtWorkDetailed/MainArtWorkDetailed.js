import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import ReadMoreReact from "read-more-react";
import "../../css/check.css";
import * as Icons from "phosphor-react";

function MainArtWorkDetailed(props) {
  const [propsData, setPropsData] = useState([]);
  const [isVideo, setIsVideo] = useState(false);

  const [like, setLike] = useState(false);
  useEffect(() => {
    // console.log(id);
    console.log(props.id);
    document.title = "Chimera | ArtWork";
    // console.log(props.location.state);
    // setPropsData(props.location.state);
  }, []);

  const toggleLike = () => {
    setLike(!like);
  };

  return (
    <>
      <div className=" mx-5 mt-40 grid gap-6 mx-2 md:grid-cols-12 lg:grid-cols-12 md:max-w-2xl lg:max-w-6xl sm:mx-0">
        <div className=" sm:col-span-12 sm:px-0 lg:col-span-4 lg:px-10">
          {/*Loop Start */}
          <h1 className="font-Lobster pr-10">SALMAS VALLEY</h1>
          <div className="mt-4">
            <span className="text-sm font-extrabold">Edition 1 of 1</span>
          </div>
          <div className="mt-5 font-Inconsolata">
            <ReadMoreReact
              text=' Salinas Valley, California. "California" is a collection of
              illustrations reimagining life in The Golden State. The fields of
              overgrown golden grass, the rolling hills, the beaches, the
              mountains, just about every part of this state has something
              unique to showcase. Inspired by the vivid imagery of authors
              including my personal favorite, John Steinbeck, I have created
              this collection of art to pay homage to the beauty this state has
              to offer. A romanticism of California. A charming and simple
              interpretation of the place that helped raise me.'
              min={60}
              ideal={90}
              max={120}
              readMoreText={
                <a href="#" className="text-sm">
                  show more
                </a>
              }
            />
          </div>

          <div class="text-left text-sm font-Inconsolata p-2 mt-2 ">
            <span>
              <a href="#">#2D</a>
            </span>{" "}
            <span>
              <a href="#">#2Dart</a>
            </span>{" "}
            <span>
              <a href="#">#abstract</a>
            </span>{" "}
            <span>
              <a href="#">#Abstract</a>
            </span>
            <span>
              <a href="#">#landscape</a>
            </span>{" "}
            <span>
              <a href="#">#2D</a>
            </span>{" "}
            <span>
              <a href="#">#2Dart</a>
            </span>{" "}
            <span>
              <a href="#">#abstract</a>
            </span>{" "}
            <span>
              <a href="#">#Abstract</a>
            </span>
            <span>
              <a href="#">#landscape</a>
            </span>{" "}
            <span>
              <a href="#">#2D</a>
            </span>{" "}
            <span>
              <a href="#">#2Dart</a>
            </span>{" "}
            <span>
              <a href="#">#abstract</a>
            </span>{" "}
            <span>
              <a href="#">#Abstract</a>
            </span>
            <span>
              <a href="#">#landscape</a>
            </span>{" "}
            <span>
              <a href="#">#2D</a>
            </span>{" "}
            <span>
              <a href="#">#2Dart</a>
            </span>{" "}
            <span>
              <a href="#">#abstract</a>
            </span>{" "}
            <span>
              <a href="#">#Abstract</a>
            </span>
            <span>
              <a href="#">#landscape</a>
            </span>{" "}
          </div>
          <div className="text-center mb-20">
            <button className="btn text-center make-offer-btn btn-primary mt-5 hover: bg-gray-1000">
              MAKE AN OFFER
            </button>
          </div>
        </div>
        <div className="  sm:col-span-12 lg:col-span-5 ">
          {isVideo ? (
            <video autoPlay muted loop controls className="shadow-2xl">
              <source src={propsData} type="video/mp4" />
            </video>
          ) : (
            <img src={propsData} className="shadow-2xl" />
          )}
        </div>
        <div className="mt-10 sm:ml-0  sm:col-span-12  lg:col-span-3 lg:ml-20 lg:mt-3 ">
          <div className="flex flex-col divide-y  divide-gray-300">
            {/*First Divider */}
            <div className="flex flex-col">
              <div className="mb-3">
                <div class="space-x-20   sm:space-x-5 ">
                  <div class="inline-block ...">
                    {" "}
                    <img
                      class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      style={{ marginTop: "-30px" }}
                      src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                      alt=""
                    />
                  </div>
                  <div class="inline-block">
                    <span className="text-sm">@joseph</span>
                    <p className="text-xs text-gray-500 font-bold">Artist</p>
                  </div>
                </div>
              </div>
              {/*Second Line */}
              <div className="mb-4">
                <div class="space-x-20   sm:space-x-5 ">
                  <div class="inline-block ...">
                    {" "}
                    <img
                      class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      style={{ marginTop: "-30px" }}
                      src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                      alt=""
                    />
                  </div>
                  <div class="inline-block">
                    <span className="text-sm">@Joseph</span>
                    <p className="text-xs text-gray-500 font-bold">Owner</p>
                  </div>
                </div>
              </div>
              {/*Second Line */}
              <div className="mb-4">
                <div class="space-x-20   sm:space-x-5 ">
                  <div class="inline-block ...">
                    {" "}
                    <img
                      class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      style={{ marginTop: "-30px" }}
                      src="https://www.pinclipart.com/picdir/big/35-353647_spinnin-records-youtube-spinnin-records-logo-png-clipart.png"
                      alt=""
                    />
                  </div>
                  <div class="inline-block">
                    <span className="text-sm">@Spinnin_Records</span>
                    <p className="text-xs text-gray-500 font-bold">Brand</p>
                  </div>
                </div>
              </div>
            </div>
            {/*Second Divider */}
            <div className="flex flex-col">
              <div className="mb-3 mt-5">
                <div class="space-x-20  sm:space-x-8 ">
                  <div class="inline-block ...">
                    {" "}
                    <button>
                      {" "}
                      <Icons.Heart
                        size={30}
                        onClick={toggleLike}
                        weight={like ? "fill" : "regular"}
                      />
                    </button>
                  </div>
                  <div class="inline-block">
                    <span className="text-sm">3</span>
                    <p className="text-xs text-gray-500 font-bold">Favorites</p>
                  </div>
                </div>
              </div>
              {/*Second Line */}
              <div className="mb-4">
                <div class="space-x-20 sm:space-x-8 ">
                  <div class="inline-block ...">
                    <Icons.Eye size={30} />
                  </div>
                  <div class="inline-block">
                    <span className="text-sm">6</span>
                    <p className="text-xs text-gray-500 font-bold">Views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-40  sm:col-span-12 lg:col-span-5 ">
          <h1 className="text-xl font-bold">HISTORY</h1>
          <div className="flex flex-col divide-y  divide-gray-300">
            {/*first*/}
            <div className="flex flex-col mb-3  mt-5">
              <span className="text-sm">
                <a href="#">@aee</a> accepted an offer of 8.888=($14,330) from{" "}
                <a href="#">@_888_</a>
              </span>
              <span className="text-gray-500 text-xs font-bold">
                2 Hours ago
              </span>
            </div>
            <div className="flex pt-5 flex-col">
              <p className="text-sm">
                <a href="#">@aee</a> accepted an offer of 8.888=($14,330) from{" "}
                <a href="#">@_888_</a>
                <p className="text-gray-500 text-xs font-bold">2 Hours ago</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainArtWorkDetailed;
