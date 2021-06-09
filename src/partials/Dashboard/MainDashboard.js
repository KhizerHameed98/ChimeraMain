import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../components/TabPanel";
import "../../css/Tabpanel.css";
import Web3 from "web3";
import Dropdown from "react-dropdown";
import config from "../../config";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../../partials/Loader";
import DialoguePopUp from "../../components/setSalePricePopUp";
const chimeraContract = require("../../contracts/Chimera.json");
const SMAV2Contract = require("../../contracts/ChimeraMarketAuctionV2.json");
let SMAV2, web3, accounts, chimera;

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MainDashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [NFTData, setNFTData] = useState([]);
  const [OwnerData, setOwnerData] = useState([]);
  const [TokenId, setTokenId] = useState([]);
  const [TokenPrice, setTokenPrice] = useState([]);
  const [ArtistData, setArtistData] = useState([]);
  const [BiddingOwner, setBiddingOwner] = useState([]);
  const [BiddingPrice, setBiddingPrice] = useState([]);
  const [USDValue, setUSDValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  async function callData() {
    setLoading(true);
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    accounts = await web3.eth.getAccounts();
    chimera = await new web3.eth.Contract(chimeraContract.abi, config.Chimera);
    SMAV2 = await new web3.eth.Contract(SMAV2Contract.abi, config.SMAV2);

    let nftData = [];
    let ownerData = [];
    let tokenId = [];
    let nftPrice = [];
    let artist = [];
    let setSalePrice = [];
    let isApprovedByAdmin = [];
    let bidding = [];
    let biddingBool = [];
    let USDTValue = [];
    try {
      let totalSupply = await chimera.methods.totalSupply().call();
      for (let i = 0; i < totalSupply; i++) {
        let nfts = await chimera.methods.tokenByIndex(i).call();

        let owner = await chimera.methods.ownerOf(nfts).call();
        let bid = await SMAV2.methods
          .currentBidDetailsOfToken(config.Chimera, nfts)
          .call();

        if (owner === accounts[0] && bid[0] !== "0") {
          tokenId.push(nfts);
          let res = await axios.get(`${config.host}/file/${nfts}`);
          nftData.push(res.data[0]);

          let artistVar = await axios.get(
            `${config.host}/api/users/${res.data[0].Artist}`
          );
          artist.push(artistVar.data);

          let ownerVar = await axios.get(
            `${config.host}/api/users/${res.data[0].Owner}`
          );
          ownerData.push(ownerVar.data);

          let price = await SMAV2.methods
            .tokenPrice(config.Chimera, nfts)
            .call();
          const etherValue = Web3.utils.fromWei(price, "ether");
          await axios
            .get(
              "https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD"
            )
            .then((res) => {
              let d = res.data;
              let USD = d.USD * etherValue;
              USDTValue.push(financial(USD));
            });
          nftPrice.push(etherValue);

          bidding.push(bid);
          let biddingOwner = await axios.post(`${config.host}/api/auth`, {
            address: bid[1],
          });
          console.log(biddingOwner);
        }
      }
      Promise.all([
        nftData,
        ownerData,
        tokenId,
        nftPrice,
        artist,
        setSalePrice,
        bidding,
        biddingBool,
        USDTValue,
      ]).then((res) => {
        console.log(res);
        if (res[0].length === 0) {
          setNoData(true);
        }

        setNFTData(res[0]);
        setOwnerData(res[1]);
        setTokenId(res[2]);
        setTokenPrice(res[3]);
        setArtistData(res[4]);
        setBiddingPrice(res[7]);

        setUSDValue(res[8]);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  function financial(x) {
    return Number.parseFloat(x).toFixed(0);
  }

  useEffect(() => {
    callData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} className="mt-40">
      <h3>Offers</h3>
      <AppBar position="static" className="mt-5">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Incoming" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Outgoing" href="/spam" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/*Incoming*/}
        <div>
          <div className="max-w-6xl mt-10 mx-auto px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className=" gridsm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-black">
              {loading ? (
                <div className="mt-5">
                  <Loader />
                </div>
              ) : (
                <>
                  <section className="relative">
                    {/* Section background (needs .relative class on parent and next sibling elements) */}

                    <div className="relative max-w-10xl mx-auto  sm:px-6">
                      <div className="py-8 md:py-10">
                        {/* Items */}
                        <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">
                          {/* 1st item */}
                          {noData ? (
                            <>
                              <h1>NO DATA</h1>
                            </>
                          ) : (
                            <>
                              {/*Loop Start*/}
                              {NFTData.map((d, key) => {
                                return (
                                  <>
                                    {/* 1st item */}
                                    <div className=" border-2 border-black-100 relative flex flex-col bg-white ">
                                      <img
                                        src={d.image}
                                        style={{
                                          height: "350px",
                                          objectFit: "cover",
                                        }}
                                        alt="Random Creativity Outburst"
                                      />
                                      <div className="  mx-3 mt-2 grid gap-2  sm:grid-cols-12  lg:grid-cols-12">
                                        <div className=" sm:col-span-12 lg:col-span-12  ">
                                          <h1 className="font-bold text-base nftName text-black">
                                            {d.name}
                                          </h1>
                                        </div>

                                        <div className=" sm:col-span-12 lg:col-span-12 gap-8 border-b border-black-100">
                                          <>
                                            <>
                                              <div className="grid gap-6 sm:grid-cols-12 lg:grid-cols-12">
                                                <div className=" col-start-1 col-span-5 sm:mb-0 lg:mb-2">
                                                  <h1 className="text-base text-green-100">
                                                    <span>
                                                      {TokenPrice[key]}
                                                    </span>
                                                    Ξ(
                                                    <span>
                                                      ${USDValue[key]}
                                                    </span>
                                                    )
                                                    <p className="text-xxs mt-2 text-green-200">
                                                      List price
                                                    </p>
                                                  </h1>
                                                </div>

                                                <>
                                                  <div className="col-start-6 col-span-7 mb-2">
                                                    <h1 className="text-base text-green-100">
                                                      <span>
                                                        {/* {BiddingPrice[key][0]} */}
                                                      </span>
                                                      Ξ(
                                                      <span>$6,720</span>)
                                                      <p className="text-xxs mt-2 text-green-200">
                                                        Current offer by{" "}
                                                        <a
                                                          href="#"
                                                          className="text-green-200"
                                                          style={{
                                                            textDecoration:
                                                              "none",
                                                          }}
                                                        >
                                                          @l1ttl3b1gk1d
                                                        </a>
                                                      </p>
                                                    </h1>
                                                  </div>
                                                </>
                                              </div>
                                            </>
                                          </>
                                        </div>

                                        <div className="grid gap-6 mb-4 sm:grid-cols-12 lg:grid-cols-12">
                                          <div className="col-start-3 col-span-4 mt-1">
                                            <h5
                                              className="text-xs text-gray-600"
                                              style={{ marginLeft: "-18px" }}
                                            >
                                              ARTIST
                                            </h5>
                                          </div>
                                          <div
                                            className="col-start-9 col-span-4 mt-1"
                                            style={{ marginLeft: "-18px" }}
                                          >
                                            <h5 className="text-xs text-gray-600">
                                              OWNER
                                            </h5>
                                          </div>
                                          <div className="col-start-1 col-span-2 ">
                                            <img
                                              src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                                              alt="Avatar"
                                              class="avatar"
                                              style={{
                                                verticalAlign: "middle",
                                                width: "28px",
                                                borderRadius: "50px",
                                                marginTop: "-28px",
                                              }}
                                            />
                                          </div>
                                          <div
                                            className="col-start-3 col-span-4"
                                            style={{
                                              marginLeft: "-18px",
                                              marginTop: "-28px",
                                            }}
                                          >
                                            <h5 className="text-sm mt-1 uppercase">
                                              {ArtistData[key].name}
                                            </h5>
                                          </div>
                                          <div className="col-start-7 col-span-2">
                                            <img
                                              src="https://ipfs.pixura.io/ipfs/Qmcs6Ruf6d5yuU5XKxMvKAQozpL886jXn9gWxh5qmCxLcj/SR-PROFILE._2K21_ASTROpsd.gif"
                                              alt="Avatar"
                                              class="avatar"
                                              style={{
                                                verticalAlign: "middle",
                                                width: "28px",
                                                borderRadius: "50px",
                                                marginTop: "-28px",
                                              }}
                                            />
                                          </div>
                                          <div
                                            className="col-start-9 col-span-4"
                                            style={{
                                              marginLeft: "-18px",
                                              marginTop: "-28px",
                                            }}
                                          >
                                            <h5 className="text-sm mt-1">
                                              {OwnerData[key].name}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Outgoing
      </TabPanel>
    </div>
  );
}
