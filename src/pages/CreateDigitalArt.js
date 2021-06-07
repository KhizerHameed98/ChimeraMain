import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axios from "axios";
import Web3 from "web3";
import "../partials/Loader";
import Swal from "sweetalert2";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

import ImageUploader from "react-images-upload";
import "../css/upload.css";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import config from "../config";
import Loader from "../partials/Loader";

const chimeraContract = require("../contracts/Chimera.json");
const SMAV2Contract = require("../contracts/ChimeraMarketAuctionV2.json");
let web3;
let accounts;
let chimera;
let SMAV2;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function CreateDigitalArt() {
  const history = useHistory();

  const classes = useStyles();
  const size = 7242880;

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState({
    sizeError: false,
    formatError: false,
  });
  const [description, setDescription] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [loading, setLoading] = useState(false);

  function OnChangeTokenName(e) {
    setTokenName(e.target.value);
  }
  function OnChangeDescription(e) {
    setDescription(e.target.value);
  }

  function onChangeImageFile(e) {
    // setImageFile(e[0]);
    setError({ sizeError: false });
    setError({ formatError: false });
    console.log(e[0]);

    if (e[0]) {
      if (e[0].size < size) {
        let imageName = e[0].name;
        let splitName = imageName.split(".");

        if (
          splitName[1] === "png" ||
          splitName[1] === "jpg" ||
          splitName[1] === "jpeg" ||
          splitName[1] === "JPEG"
        ) {
          setImageFile(e[0]);
        } else {
          setError({ formatError: true });
          setImageFile(null);
        }
      } else {
        setError({ sizeError: true });
      }
    }
  }
  function validateForm() {
    return description.length > 0 && tokenName.length > 0 && imageFile;
  }
  async function SubmitForm() {
    if (!window.ethereum) {
      alert("Please Install metamask!!");
    } else {
      let tokenId;
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setLoading(true);
      accounts = await web3.eth.getAccounts();
      chimera = await new web3.eth.Contract(
        chimeraContract.abi,
        config.Chimera
      );
      try {
        tokenId = await chimera.methods.idCounter().call();
      } catch (error) {
        setLoading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }

      let formData = new FormData();
      formData.append("file", imageFile);
      formData.append("tokenId", tokenId);
      formData.append("name", tokenName);
      formData.append("owner", localStorage.getItem("id"));
      formData.append("artist", localStorage.getItem("id"));

      axios
        .post(`${config.host}/upload-file`, formData)
        .then(async (res) => {
          console.log(res.data.message);
          try {
            await chimera.methods
              .addNewToken(description, 0)
              .send({ from: accounts[0] });
            await Swal.fire({
              icon: "success",
              title: "Uploaded",
              text: "Successfully Uploaded",
            });
            setLoading(false);
            history.push("/collection");
          } catch (error) {
            setLoading(false);
            console.log(error);
            axios.post(`${config.host}/delete/${tokenId}`).then((res) => {
              console.log(res);
            });
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div>
          <div className="max-w-8xl  text-center mt-32 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-20 md:py-12">
              <h1 className="font-extrabold text-black">Create Digital Art</h1>
            </div>
          </div>
          <div className="max-w-8xl  text-center mt-5 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            {/*Form Start*/}
            <div class="min-w-screen min-h-screen font-Inter font-extrabold   flex flex-col items-center justify-center">
              <div class="w-5/6  lg:w-3/6 rounded-xl shadow-2xl bg-gradient-to-b from-blue-600 to-blue-400 mr-3">
                <div class="flex flex-col shadow-2xl">
                  <div
                    id="header"
                    class="flex flex-col items-center justify-center text-white py-4 bg-blue-800"
                  >
                    <div class="text-center ">
                      <span className="text-3xl font-black ">Digital Art</span>
                    </div>
                  </div>

                  <div id="converters-area" class="px-4 py-5">
                    <div class="flex flex-col text-left mt-5 text-white px-2">
                      <label class="mb-1" for="weight-kilograms">
                        Name
                      </label>
                      <input
                        type="text"
                        id="description"
                        placeholder="Enter your Token Name here!"
                        class="py-2  px-12 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                        onChange={OnChangeTokenName}
                      />
                    </div>
                    <div class="flex flex-col text-white">
                      <div class="flex flex-col rounded-6xl mt-5 text-left px-1">
                        <label class="mb-1" for="weight-kilograms">
                          About your Token
                        </label>
                        <input
                          onChange={OnChangeDescription}
                          type="text"
                          id="description"
                          placeholder="Description"
                          className="pb-40 pt-3 px-2 rounded focus:outline-none text-gray-600 focus:text-gray-600"
                        />
                      </div>

                      <ImageUploader
                        className="mt-5"
                        withIcon={true}
                        withLabel={true}
                        buttonText="Choose image"
                        maxFileSize={7242880}
                        imgExtension={[
                          ".jpg",
                          ".gif",
                          ".png",
                          ".gif",
                          ".jpeg",
                          ".JPEG",
                        ]}
                        withPreview={true}
                        singleImage={true}
                        onChange={onChangeImageFile}
                      />
                      <div className={classes.root}>
                        {error.sizeError ? (
                          <>
                            <Alert severity="error">
                              Size should be less than 5mb
                            </Alert>
                          </>
                        ) : null}
                        {error.formatError ? (
                          <>
                            <Alert severity="error">
                              Format should be .jpg,png,jpeg,JPEG
                            </Alert>
                          </>
                        ) : null}
                      </div>

                      <div class="flex mt-5 flex-col text-center px-5">
                        <button
                          className="btn btn-danger font-bold  py-2"
                          disabled={!validateForm()}
                          onClick={SubmitForm}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Form End*/}
            {loading ? (
              <>
                <Loader />{" "}
              </>
            ) : null}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default CreateDigitalArt;
