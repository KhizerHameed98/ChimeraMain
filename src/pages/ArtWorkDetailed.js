import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import { useHistory, useParams, withRouter } from "react-router-dom";

import Footer from "../partials/Footer";
import "react-dropdown/style.css";
import MainArtWorkDetailed from "../partials/ArtWorkDetailed/MainArtWorkDetailed";

function ArtWorkDetailed(props) {
  const { id } = useParams();
  console.log("params", props.match);
  useEffect(() => {
    console.log("params", id);
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />

        {/* Top area: Blocks */}
        <MainArtWorkDetailed id={id} />

        {/* Start*/}

        <Footer />
      </div>
    </>
  );
}

export default withRouter(ArtWorkDetailed);
